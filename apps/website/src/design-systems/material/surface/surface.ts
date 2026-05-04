import type { CSSObject, Rule, Shortcut } from "unocss";
import {
	assertCssProp,
	getCssPropByUtilProp,
	lerp,
	round3,
} from "../../ds-utils";
import {
	assertEmphasis,
	assertMaybeColor,
	assertMode,
	type Options,
} from "../options";
import type {
	GetCssFromParams,
	GetDynamicRule,
	GetDynamicShortcut,
	GetStaticRule,
	GetStaticShortcut,
	SurfaceParams,
} from "../types";
import { calcSize } from "../utils";
import {
	getBorderDeltaLightness,
	getChroma,
	getChromaByLightness,
	getEmphasisNumber,
	getIntentFgLightness,
	getSurfaceBgLightness,
	getSurfaceFgLightness,
	getSurfaceFgOpacity,
	getThemeColor,
	getThemeColorChroma,
	getThemeColorHue,
	getThemeColorMaxChromaByLightness,
} from "./computation";

interface ShortcutCategory {
	layout?: string;
	position?: string;
	size?: string;
	text?: string;
	border?: string;
	cursor?: string;
	animation?: string;
	color?: string;
	elevation?: string;
	focus?: string;
}

export const getSurfaceBgCssVars: GetCssFromParams = (p) => ({
	[`--bg-lightness-${p.emphasisStr}`]: getSurfaceBgLightness(p),
	[`--bg-chroma-${p.emphasisStr}`]: getChroma(p),
	[`--bg-min-hue-${p.emphasisStr}`]: getThemeColorHue(p).min,
	[`--bg-mid-hue-${p.emphasisStr}`]: getThemeColorHue(p).mid,
	[`--bg-max-hue-${p.emphasisStr}`]: getThemeColorHue(p).max,
	"--ripple-start-color": `oklch(${p.mode === "dark" ? 0.9 : 0.1} .06 var(--fg-hue) / ${p.mode === "dark" ? 0.1 : 0.15})`,
	"--ripple-end-color": `oklch(${p.mode === "dark" ? 0.9 : 0.1} .01 var(--fg-hue) / 0)`,
});
export const getDefaultSurfaceFgCssVars =
	(bgParams: SurfaceParams) =>
	(fgParams: SurfaceParams): CSSObject => ({
		[`--fg-lightness-${fgParams.emphasisStr}-on-${bgParams.emphasisStr}`]:
			getIntentFgLightness(fgParams),
		[`--fg-chroma-${fgParams.emphasisStr}`]: Math.min(
			getChromaByLightness(getSurfaceFgLightness(bgParams)(fgParams))(fgParams),
			0.15 +
				getEmphasisNumber(fgParams) *
					(getThemeColorMaxChromaByLightness(
						getSurfaceFgLightness(bgParams)(fgParams),
					)(fgParams) -
						0.15),
		),
		"--fg-hue": getThemeColorHue(fgParams).mid,
		"--border-d-lightness": getBorderDeltaLightness(bgParams),
		"--border-divider": bgParams.mode === "dark" ? 3 : 1.2,
		"--border-admix-lightness": "var(--fg-lightness)",
	});
export const getSurfaceFgCssVars =
	(bgParams: SurfaceParams) =>
	(fgParams: SurfaceParams): CSSObject =>
		bgParams.color === "background"
			? getDefaultSurfaceFgCssVars(bgParams)(fgParams)
			: {
					[`--fg-lightness-${fgParams.emphasisStr}-on-${bgParams.emphasisStr}`]:
						getSurfaceFgLightness(bgParams)(fgParams),
					[`--fg-default-lightness-${fgParams.emphasisStr}`]:
						getIntentFgLightness(fgParams),
					[`--fg-opacity-${fgParams.emphasisStr}-on-${bgParams.emphasisStr}`]:
						getSurfaceFgOpacity(bgParams)(fgParams),
					"--fg-hue": getThemeColorHue(fgParams).mid,
					"--fg-default-hue": getThemeColorHue(fgParams).mid,
					[`--fg-chroma-${fgParams.emphasisStr}`]: 0,
					[`--fg-default-chroma-${fgParams.emphasisStr}`]: Math.min(
						getChromaByLightness(getIntentFgLightness(fgParams))(fgParams),
						0.15 +
							getEmphasisNumber(fgParams) *
								(getThemeColorMaxChromaByLightness(
									getIntentFgLightness(fgParams),
								)(fgParams) -
									0.15),
					),
					"--border-d-lightness": getBorderDeltaLightness(bgParams),
					"--border-divider": bgParams.mode === "dark" ? 3 : 1.2,
					"--border-admix-lightness": bgParams.mode === "dark" ? 1 : 0,
				};

export const getSurfaceBgVars: GetCssFromParams = (p) =>
	Object.assign(
		{},
		...p.opts.emphasis.map((emphasisStr) =>
			getSurfaceBgCssVars({ ...p, emphasisStr }),
		),
		{
			"--bg-default-lightness":
				p.mode === "dark"
					? p.opts.lightness.scale.min
					: p.opts.color.background.l,
			"--bg-default-chroma": round3(
				getThemeColorChroma({
					...p,
					color: p.mode === "dark" ? "foreground" : "background",
				}),
			),
			"--bg-default-hue": getThemeColorHue({
				...p,
				color: p.mode === "dark" ? "foreground" : "background",
			}).mid,
			"--mode-sign": p.mode === "dark" ? -1 : 1,
			"--intent-bound-lightness":
				p.mode === "dark"
					? p.opts.lightness.semanticColor.min
					: p.opts.lightness.semanticColor.max,
		},
	);
export const getSurfaceFgVars =
	(bgParams: SurfaceParams) =>
	(fgParams: SurfaceParams): CSSObject =>
		Object.assign(
			{},
			...fgParams.opts.emphasis.flatMap((fgEmphasis) =>
				bgParams.opts.emphasis.map((bgEmphasis) =>
					getSurfaceFgCssVars({ ...bgParams, emphasisStr: bgEmphasis })({
						...fgParams,
						emphasisStr: fgEmphasis,
					}),
				),
			),
		);

export const getShadowVars: GetCssFromParams = (
	p: SurfaceParams,
): CSSObject => ({
	"--focus-shadow-color": p.mode === "dark" ? "#fff" : "#000",
	"--ring-color": `oklch(var(--bg-lightness) var(--bg-chroma) var(--bg-mid-hue) / ${p.mode === "dark" ? "calc(1 - var(--bg-lightness)" : "calc(.75 * var(--bg-lightness)"}))`,
});

export const getToggleStateRule: GetDynamicRule = () => [
	/^toggle-state-(?<state>hover|active|unpressed|pressed)$/,
	({ groups }) => {
		if (!groups) return;
		const states = {
			hover: { "--bg-opacity": 0 },
			active: {
				"--bg-opacity": `calc(var(--intent-bound-lightness) * pow(var(--bg-lightness), var(--mode-sign)) / 2)`,
			},
			unpressed: { "--bg-opacity": 0 },
			pressed: {
				"--bg-opacity": `calc(var(--intent-bound-lightness) * pow(var(--bg-lightness), var(--mode-sign)))`,
			},
		};
		return states[groups.state as keyof typeof states];
	},
];

export const getToggleStateShortcut: GetStaticShortcut = () => [
	"toggle-state",
	"active:toggle-state-active not-[[data-pressed]]:toggle-state-unpressed data-[pressed]:toggle-state-pressed data-[pressed]:[--lightness-mod:.1]",
];

export const getSurfaceKindRules: GetDynamicRule = () => [
	/^sfc-(?<kind>solid|outlined|text|toggle|outlined-checkbox|solid-checkbox|slider-thumb)$/,
	({ groups }) => {
		if (!groups) return;
		const bgIdleColor = `oklch(var(--bg-lightness) var(--bg-chroma) var(--bg-mid-hue))`;
		const bgAdmixColor = `oklch(var(--bg-admix-lightness, 1) 0 var(--admix-hue, 0))`;
		const bgAdmixValue = `calc(var(--imaginary-elevation) * 100% / (var(--bg-admix-lightness,  1) - var(--bg-lightness)))`;
		const fgAdmixColor = `oklch(calc(var(--fg-lightness) + var(--imaginary-elevation)) var(--fg-chroma) var(--fg-hue))`;
		const bgColorVars = {
			solid: ` color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue})`,
			outlined: `oklch(calc(var(--bg-default-lightness) + var(--imaginary-elevation)) var(--bg-default-chroma) var(--bg-default-hue))`,
			text: `oklch(calc(var(--bg-default-lightness) + var(--imaginary-elevation)) var(--bg-default-chroma) var(--bg-default-hue))`,
			toggle: ` color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue})`,
			"solid-checkbox": `oklch(from color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue}) l c h / var(--bg-opacity))`,
			"outlined-checkbox": `oklch(from color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue}) l c h / var(--bg-opacity))`,
			"slider-thumb": `oklch(from color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue}) l c h / var(--bg-opacity))`,
		};
		const bgColors = {
			solid: "var(--bg-color)",
			outlined: "var(--bg-color)",
			toggle: "oklch(from var(--bg-color) l c h / var(--bg-opacity))",
			"solid-checkbox": "var(--bg-color)",
			"outlined-checkbox": "var(--bg-color)",
			"slider-thumb": "var(--bg-color)",
		};
		const colorVars = {
			solid: ` color-mix(in oklch, var(--bg-color), ${fgAdmixColor} calc(var(--fg-opacity) * 100%))`,
			"solid-checkbox": ` color-mix(in oklch, var(--bg-color), ${fgAdmixColor} calc(var(--fg-opacity) * 100%))`,
			"outlined-checkbox": `oklch(calc(var(--fg-default-lightness) + var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue))`,
			outlined: `oklch(calc(var(--fg-default-lightness) + var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue))`,
			text: `oklch(calc(var(--fg-default-lightness) + var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue))`,
			toggle: `oklch(calc(var(--fg-default-lightness) + var(--imaginary-elevation) + -1 * var(--mode-sign) * var(--lightness-mod, 0)) var(--fg-default-chroma) var(--fg-default-hue))`,
		};
		// TODO настроить colorVars.text чтобы ховер зависел от яркости
		const colors = {
			solid: "var(--color)",
			outlined: "var(--color)",
			text: "var(--color)",
			toggle: "var(--color)",
			"solid-checkbox": "var(--color)",
			"outlined-checkbox": "var(--color)",
		};
		const borderColors = {
			solid: `oklch(var(--border-admix-lightness) 0 var(--bg-mid-hue) / calc((var(--border-d-lightness)) / (var(--border-admix-lightness) - var(--bg-lightness))))`,
			outlined: `oklch(calc(var(--fg-default-lightness) + 2 * var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue) / calc((var(--fg-default-lightness) - var(--bg-default-lightness)) / var(--border-d-lightness) / var(--border-divider)))`,
			text: "transparent",
			toggle: `oklch(var(--border-admix-lightness) 0 var(--bg-mid-hue) / calc((var(--border-d-lightness)) / (var(--border-admix-lightness) - var(--bg-lightness))))`,
			"solid-checkbox": `oklch(var(--border-admix-lightness) 0 var(--bg-mid-hue) / calc((var(--border-d-lightness)) / (var(--border-admix-lightness) - var(--bg-lightness))))`,
		};
		return {
			"--bg-color": bgColorVars[groups.kind as keyof typeof bgColorVars],
			"background-color": bgColors[groups.kind as keyof typeof bgColors],
			"--color": colorVars[groups.kind as keyof typeof colorVars],
			color: colors[groups.kind as keyof typeof colors],
			"--border-color": borderColors[groups.kind as keyof typeof borderColors],
			"--imaginary-elevation":
				"calc(var(--zero-elevation, 0) + var(--rel-elevation, 0) - var(--base-elevation, 0))",
			"--bg-admix-lightness":
				"clamp(0, calc(var(--imaginary-elevation) * 1000), 1)",
		};
	},
];

export const getElevationRule: GetDynamicRule = () => [
	/^(?<minus>—)?(?<kind>zero|rel|base)-elevation-(?<height>\d+)$/,
	({ groups }) => {
		if (!groups) return;
		if (groups.minus === "—" && groups.kind === "zero")
			throw `zero level must be positive`;
		const height = +groups.height;
		if (Number.isNaN(height)) throw `elevation ${height} must be a number`;
		if (height > 100) throw `elevation ${height} should not be more than 100`;
		const nHeight = round3((height * (groups.minus === "—" ? -1 : 1)) / 100);
		const inset = groups.minus === "—" ? "inset" : "";
		const admixHue =
			groups.minus === "—" ? "var(--bg-min-hue)" : "var(--bg-max-hue)";
		const shadowSign = groups.minus === "—" ? -1 : 1;
		const rules = {
			zero: {
				"--zero-elevation": nHeight,
			},
			rel: {
				"--rel-elevation": nHeight,
				"--inset": inset,
				"--shadow-sign": shadowSign,
				"--admix-hue": admixHue,
			},
			base: {
				"--base-elevation": nHeight,
			},
		};
		return rules[groups.kind as keyof typeof rules];
	},
	{ layer: "theme" },
];

export const getEmphasisRules: GetDynamicRule = () => [
	/^sfc-emphasis-(?<fgEmphasis>[a-z]+)-on-(?<bgEmphasis>[a-z]+)$/,
	({ groups }) => {
		if (!groups) return;
		assertEmphasis(groups.bgEmphasis);
		assertEmphasis(groups.fgEmphasis);
		return {
			"--bg-lightness": `var(--bg-lightness-${groups.bgEmphasis})`,
			"--bg-chroma": `var(--bg-chroma-${groups.bgEmphasis})`,
			"--bg-min-hue": `var(--bg-min-hue-${groups.bgEmphasis})`,
			"--bg-mid-hue": `var(--bg-mid-hue-${groups.bgEmphasis})`,
			"--bg-max-hue": `var(--bg-max-hue-${groups.bgEmphasis})`,
			"--bg-opacity": `var(--bg-opacity-${groups.bgEmphasis}, 1)`,
			"--fg-lightness": `var(--fg-lightness-${groups.fgEmphasis}-on-${groups.bgEmphasis})`,
			"--fg-default-lightness": `var(--fg-default-lightness-${groups.fgEmphasis})`,
			"--fg-chroma": `var(--fg-chroma-${groups.fgEmphasis})`,
			"--fg-default-chroma": `var(--fg-default-chroma-${groups.fgEmphasis})`,
			"--fg-opacity": `var(--fg-opacity-${groups.fgEmphasis}-on-${groups.bgEmphasis})`,
		};
	},
];

export const getSurfaceColorRules: GetDynamicRule = (opts) => [
	/^sfc-color-(?<fgColor>[a-z]+)-on-(?<bgColor>[a-z]+)-(?<mode>light|dark)(?:-(?<interactive>ia))?$/,
	({ groups }) => {
		if (!groups) return;
		assertMode(groups.mode);
		if (groups.bgColor !== "default") assertMaybeColor(groups.bgColor);
		if (groups.fgColor !== "default") assertMaybeColor(groups.fgColor);

		const p = {
			opts,
			color: groups.bgColor,
			isInteractive: groups.interactive === "ia",
			mode: groups.mode,
		};

		return {
			...getSurfaceBgVars(p),
			...getSurfaceFgVars(p)({ ...p, color: groups.fgColor }),
			...getShadowVars(p),
		};
	},
];

export const getSurfaceShadowRule: GetStaticRule = () => [
	"sfc-shadow",
	{
		"box-shadow": `var(--inset) calc(-10 * var(--shadow-sign) * var(--sun-x) * var(--rel-elevation) * var(--spacing-size) * 1em) calc(10 * var(--shadow-sign) * var(--sun-y) * var(--rel-elevation) * var(--spacing-size) * 1em) calc(pow(var(--sun-z) * var(--rel-elevation) * var(--shadow-sign) * var(--spacing-size) * 1em / 5rem, .5) * 1rem) calc(var(--sun-z) * var(--rel-elevation) * var(--shadow-sign) * var(--spacing-size) * 1em / 3) oklch(0 0 0 / calc(.5 - var(--rel-elevation) * .45))`,
	},
];

export const getSurfaceBorderRule: GetStaticRule = () => [
	"sfc-border",
	{
		"border-width": `calc(var(--border-width) * 1em)`,
		"border-color": "var(--border-color)",
	},
];

export const getBoxShortcut: GetDynamicShortcut = () => [
	/^(?<kind>trigger|checkbox|input|text-input|text)-box(?:-(?<width>fit|narrow|normal|wide|fill))?$/,
	({ groups }) => {
		if (!groups) return;
		const width = {
			trigger: {
				fit: "gap-[0.375em] h-[1.41em]",
				narrow: "px-[0.375em] gap-[0.375em] h-[2em]",
				normal: "px-[0.63em] gap-[0.63em] h-[2em]",
				wide: "px-[1.06em] gap-[1.06em] h-[2em]",
				fill: "w-full gap-[1.06em] h-[2em]",
			},
			checkbox: {
				fit: null,
				narrow: null,
				normal: null,
				wide: null,
				fill: null,
			},
			input: {
				fit: "h-[1.41em]",
				narrow: "w-[10em] h-[2em]",
				normal: "w-[14.14em] h-[2em]",
				wide: "w-[20em] h-[2em]",
				fill: "w-full h-[2em]",
			},
			"text-input": {
				fit: null,
				narrow: null,
				normal: null,
				wide: null,
				fill: null,
			},
			text: {
				fit: null,
				narrow: null,
				normal: null,
				wide: null,
				fill: null,
			},
		};
		const kind = {
			trigger:
				"inline-flex items-center justify-center min-w-[2em] select-none outline-none after:content-[''] after:absolute after:inset-0 after:pointer-events-none",
			input:
				"relative after:absolute after:inset-0 after:content-[''] after:pointer-events-none flex items-center has-invalid:ring-danger-6d",
			"text-input":
				"grow outline-none leading-none first:ps-[.525em] last:pe-[.525em] min-w-0 h-full focus-within:ring-accent-6d",
			checkbox:
				"inline-flex items-center justify-center h-[2.5em] min-w-[2.5em] select-none outline-none",
			text: "inline-flex items-center leading-[1.5em] h-fit",
		};
		const kindMatch = groups.kind as keyof typeof kind;
		const widthMatch = (groups.width as keyof typeof width.trigger) ?? "normal";
		return `${kind[kindMatch]} ${width[kindMatch]?.[widthMatch] ?? ""}`;
	},
];

export const getSelectionShortcut: GetDynamicShortcut = () => [
	/^sfc(?:-(?<kind>intent|default))?-selection$/,
	({ groups }) => {
		if (!groups) return;
		const kind = {
			intent:
				"selection:bg-[var(--color)] selection:text-[var(--bg-color)] dark:selection:bg-[var(--color)] dark:selection:text-[var(--bg-color)]",
			default: "selection:bg-accent-800d dark:selection:bg-accent-200d",
		};
		return kind[(groups.kind as keyof typeof kind) ?? "default"];
	},
];

export const getComponentElevationShortcut: GetDynamicShortcut = () => [
	/^(?<effect>lifted|lowered|flat)-(?<kind>trigger|toggle|text-input|number-input|select|text)$/,
	({ groups }) => {
		if (!groups) return;
		const components = {
			trigger: {
				lifted:
					"rel-elevation-10 hover:rel-elevation-19 active:rel-elevation-1 base-elevation-10",
				lowered:
					"—rel-elevation-10 —base-elevation-10 hover:—rel-elevation-1 active:—rel-elevation-19",
			},
			toggle: {
				lifted:
					"rel-elevation-10 base-elevation-10 hover:rel-elevation-19 active:rel-elevation-1",
				lowered:
					"data-[pressed]:—rel-elevation-6 not-[[data-pressed]]:rel-elevation-0 data-[pressed]:—base-elevation-6 data-[pressed]:hover:—rel-elevation-2 not-[[data-pressed]]:hover:rel-elevation-6 data-[pressed]:active:—rel-elevation-10 not-[[data-pressed]]:active:—rel-elevation-10",
			},
			"text-input": {
				lowered:
					"—rel-elevation-11 —base-elevation-11 hover:has-[>input:not(:focus)]:—rel-elevation-20 focus-within:—rel-elevation-1",
				lifted: undefined,
				flat: "hover:has-[>input:not(:focus)]:—rel-elevation-9 ",
			},
			"number-input": {
				lowered:
					"—rel-elevation-10 —base-elevation-10 hover:not-focus:—rel-elevation-19 focus-within:—rel-elevation-1",
				lifted: undefined,
			},
			select: {
				lowered:
					"—rel-elevation-10 —base-elevation-10 hover:not-focus:—rel-elevation-19 focus-within:—rel-elevation-1",
				lifted: undefined,
			},
			text: {
				lifted:
					"rel-elevation-10 hover:rel-elevation-19 active:rel-elevation-1 base-elevation-10",
				lowered:
					"—rel-elevation-10 —base-elevation-1 hover:—rel-elevation-19 active:—rel-elevation-1",
			},
		};
		return components[groups.kind as keyof typeof components][
			groups.effect as "lifted" | "lowered"
		];
	},
];

export const getSurfaceColorShortcut: GetDynamicShortcut = () => [
	/^sfc-color-(?<fgColor>[a-z]+)-on-(?<bgColor>[a-z]+)(?:-(?<interactive>ia))?$/,
	({ groups }) => {
		if (!groups) return;
		if (groups.bgColor !== "default") assertMaybeColor(groups.bgColor);
		if (groups.fgColor !== "default") assertMaybeColor(groups.fgColor);
		return `sfc-color-${groups.fgColor}-on-${groups.bgColor}-light${groups.interactive ? "-ia" : ""} dark:sfc-color-${groups.fgColor}-on-${groups.bgColor}-dark${groups.interactive ? "-ia" : ""} `;
	},
];

export const getDisabledSurfaceShortcut: GetStaticShortcut = () => [
	"sfc-disabled",
	"saturate-50 opacity-50 contrast-66",
];

export const getSurfaceRoundingsShortcut: GetDynamicShortcut = () => [
	/^sfc-rounded(?:-(?<side>s|e|t|r|b|l|bl|br|tl|tr|es|ee|se|ss))?(?:-(?<value>\d+))?$/,
	({ groups }) =>
		`rounded${groups?.side ? `-${groups.side}` : ""}-[calc(${calcSize(+(groups?.value ?? 4), 0.125)}em*var(--radius))] after:rounded${groups?.side ? `-${groups.side}` : ""}-[calc(${calcSize(+(groups?.value ?? 4), 0.125)}em*var(--radius))] before:rounded${groups?.side ? `-${groups.side}` : ""}-[calc(${calcSize(+(groups?.value ?? 4), 0.125)}em*var(--radius)+var(--spacing-size)*1rem*${calcSize(12)})]`,
];

export const getSurfaceCircularShortcut: GetDynamicShortcut = () => [
	/^sfc-circular(?:-(?<side>s|e|t|r|b|l|bl|br|tl|tr|es|ee|se|ss))?$/,
	({ groups }) =>
		`rounded${groups?.side ? `-${groups.side}` : ""}-full after:rounded${groups?.side ? `-${groups.side}` : ""}-full before:rounded${groups?.side ? `-${groups.side}` : ""}-full`,
];

export const getInteractiveSurfaceShortcut: GetStaticShortcut = () => {
	const props: ShortcutCategory = {
		position: "relative before:content-[''] before:absolute before:z-1",
		size: "before:-inset-12d",
		border: "outline-none",
		cursor: "cursor-pointer",
		animation: `transition-all before:scale-0 [--ripple-time:calc(var(--spacing-size)*1rem*var(--text-size)*${Math.round(2 * 2 ** (0.25 * 32)) / 1000}*1s/1px)]`,
		focus: "focus-visible:shadow-focus-accent focus-visible:border-transparent",
	};
	return ["sfc-ia", Object.values(props)];
};

export const getBackgroundSurfaceShortcut: GetStaticShortcut = () => [
	"sfc-background",
	"sfc-color-foreground-on-background-light dark:sfc-color-background-on-foreground-dark sfc-solid",
];

export const getDefaultSurfaceShortcut: GetStaticShortcut = () => [
	"sfc-default",
	"sfc-color-foreground-on-background-light dark:sfc-color-background-on-foreground-dark sfc-solid sfc-emphasis-high-on-high sfc-selection",
];

export const getSurfaceColorRule: GetDynamicRule = (opts) => [
	/^sfc-(?<prop>bg|text|border|outline|fill)(?:-(?<side>x|y|t|r|l|b|s|e))?-(?<color>[a-z]+)-(?<lightness>\d{1,4})?d$/,
	({ groups }) => {
		if (!groups) return;
		assertCssProp(groups.prop);
		const cssProp = getCssPropByUtilProp(groups.prop ?? "bg");
		if (groups?.color === "transparent") return { [cssProp]: "transparent" };
		assertMaybeColor(groups.color);
		const lightness =
			Math.round(
				lerp(
					opts.lightness.scale.min,
					opts.lightness.scale.max,
					+(
						groups.lightness ??
						opts.color[getThemeColor({ opts, color: groups.color })].l * 1000
					) / 1000,
				) * 1000,
			) / 1000;

		const bgIdleColor = `oklch(${lightness} ${getChromaByLightness(lightness)({ opts, color: groups.color })} ${getThemeColorHue({ opts, color: groups.color }).mid})`;

		const bgAdmixValue = `calc(var(--imaginary-elevation) * 100% / (var(--bg-admix-lightness,  1) - var(--bg-lightness)))`;

		const bgAdmixColor = `oklch(var(--bg-admix-lightness, 1) 0 var(--admix-hue, 0))`;
		return {
			[cssProp]: `color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue})`,
		};
	},
];

export const getSurfaceFontSizeShortcut: GetDynamicShortcut = () => [
	/^sfc-size-(?<value>xs|s|m|l|xl)$/,
	({ groups }) => {
		const sizes = {
			xs: { size: 14, weight: calcSize(1, 400) },
			s: { size: 15, weight: calcSize(0.5, 400) },
			m: { size: 16, weight: calcSize(0, 400) },
			l: { size: 17, weight: calcSize(-0.5, 400) },
			xl: { size: 18, weight: calcSize(-1, 400) },
		};
		return `fs-${sizes[groups?.value as keyof typeof sizes].size}d [--fw:${sizes[groups?.value as keyof typeof sizes].weight}]`;
	},
];

export const getSurfaceFontWeightRule: GetDynamicRule = () => [
	/^sfc-font-(?<value>thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
	({ groups }) => {
		const weights = {
			thin: calcSize(-1.5),
			extraLight: calcSize(-1),
			light: calcSize(-0.5),
			normal: calcSize(0),
			medium: calcSize(0.5),
			semiBold: calcSize(1),
			bold: calcSize(1.5),
			extraBold: calcSize(2),
			black: calcSize(2.5),
		};
		return {
			"font-weight": `calc(var(--fw) * ${weights[groups?.value as keyof typeof weights]})`,
		};
	},
];

export const getSurfaceRules = (opts: Options): Rule[] => [
	getElevationRule(opts),
	getSurfaceKindRules(opts),
	getEmphasisRules(opts),
	getSurfaceColorRules(opts),
	getSurfaceShadowRule(),
	getSurfaceBorderRule(),
	getToggleStateRule(opts),
	getSurfaceColorRule(opts),
	getSurfaceFontWeightRule(opts),
];

export const getSurfaceShortcuts = (opts: Options): Shortcut[] => [
	getDefaultSurfaceShortcut(),
	getInteractiveSurfaceShortcut(),
	getSurfaceRoundingsShortcut(opts),
	getDisabledSurfaceShortcut(),
	getSurfaceColorShortcut(opts),
	getBoxShortcut(opts),
	getToggleStateShortcut(),
	getSelectionShortcut(opts),
	getComponentElevationShortcut(opts),
	getSurfaceCircularShortcut(opts),
	getSurfaceFontSizeShortcut(opts),
	getBackgroundSurfaceShortcut(),
];
