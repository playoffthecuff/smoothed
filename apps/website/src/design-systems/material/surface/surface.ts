import type { CSSObject, DynamicRule, Rule, Shortcut } from "unocss";
import {
	assertCssProp,
	getCssPropByUtilProp,
	getCssSide,
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
	/^toggle-state-(?<state>active|unpressed|pressed)$/,
	({ groups }) => {
		if (!groups) return;
		const states = {
			active: {
				"--bg-opacity": `calc(var(--intent-bound-lightness) * pow(var(--bg-lightness), var(--mode-sign)) / 2)`,
			},
			unpressed: {
				"--bg-opacity": `calc(var(--intent-bound-lightness) * pow(var(--bg-lightness), var(--mode-sign)) / 2)`,
			},
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
	/^sfc-(?<kind>solid|outlined|text|subtle)$/,
	({ groups }) => {
		// TODO отвязать тип поверхности от типа элемента (слайдер, чекбокс), добавив тип описывающий саму поверхность
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
			subtle: `oklch(from color-mix(in oklch, ${bgIdleColor}, ${bgAdmixColor} ${bgAdmixValue}) l c h / var(--bg-opacity))`,
		};
		const bgColors = {
			solid: "var(--bg-color)",
			outlined: "var(--bg-color)",
			subtle: "var(--bg-color)",
		};
		const colorVars = {
			solid: ` color-mix(in oklch, var(--bg-color), ${fgAdmixColor} calc(var(--fg-opacity) * 100%))`,
			subtle: ` color-mix(in oklch, var(--bg-color), ${fgAdmixColor} calc(var(--fg-opacity) * 100%))`,
			outlined: `oklch(calc(var(--fg-default-lightness) + var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue))`,
			text: `oklch(calc(var(--fg-default-lightness) + var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue))`,
		};
		// TODO настроить colorVars.text чтобы ховер зависел от яркости
		const colors = {
			solid: "var(--color)",
			outlined: "var(--color)",
			text: "var(--color)",
			subtle: "var(--color)",
		};
		const borderColors = {
			solid: `oklch(var(--border-admix-lightness) 0 var(--bg-mid-hue) / calc((var(--border-d-lightness)) / (var(--border-admix-lightness) - var(--bg-lightness)) / var(--border-divider, 1)))`,
			outlined: `oklch(calc(var(--fg-default-lightness) + 2 * var(--imaginary-elevation)) var(--fg-default-chroma) var(--fg-default-hue) / calc((var(--fg-default-lightness) - var(--bg-default-lightness)) / var(--border-d-lightness) / var(--border-divider)))`,
			text: "transparent",
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
			"--shadow-divider":
				groups.kind === "solid" ? "var(--shadow-admix, 1)" : 1,
		};
	},
];

export const getElevationRule: (opts: Options) => DynamicRule = () => [
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
		const shadowAdmix = groups.minus === "—" ? 2 : 1;
		const shadowSign = groups.minus === "—" ? -1 : 1;
		const rules = {
			zero: {
				"--zero-elevation": nHeight,
			},
			rel: {
				"--rel-elevation": nHeight,
				"--inset": inset,
				"--shadow-sign": shadowSign,
				"--shadow-admix": shadowAdmix,
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

export const getSurfaceShadowRule: GetDynamicRule = () => [
	/^sfc-shadow-(?<mode>light|dark)$/,
	({ groups }) => {
		if (!groups) return;
		return {
			"box-shadow": `var(--inset) calc(-10 * var(--shadow-sign) * var(--sun-x) * var(--rel-elevation) * var(--spacing-size) * 1em) calc(10 * var(--shadow-sign) * var(--sun-y) * var(--rel-elevation) * var(--spacing-size) * 1em) calc(pow(var(--sun-z) * var(--rel-elevation) * var(--shadow-sign) * var(--spacing-size) * 1em / 5rem, .5) * 1rem) calc(var(--sun-z) * var(--rel-elevation) * var(--shadow-sign) * var(--spacing-size) * 1em / 3) oklch(0 0 0 / calc((1 - max(var(--rel-elevation), -1 * var(--rel-elevation)) * 0.9) / ${groups.mode === "dark" ? "var(--shadow-divider, 1)" : 2.5}))`,
		};
	},
];

export const getSurfaceShadowShortcut: GetStaticShortcut = () => [
	"sfc-shadow",
	"sfc-shadow-light dark:sfc-shadow-dark",
];

export const getSurfaceFocusShadowShortcut: GetStaticShortcut = () => [
	"sfc-focus-shadow",
	"focus-visible:shadow-focus focus-visible:after:border-transparent",
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
				none: "h-[2em]",
				fit: "gap-[0.375em] h-[1.41em]",
				narrow: "gap-[0.375em] h-[2em] px-[.375em] [--rounding:.5em]",
				normal: "gap-[0.63em] h-[2em] px-[.63em] [--rounding:.5em]",
				wide: "gap-[1.06em] h-[2em] px-[1.06em] [--rounding:.5em]",
				fill: "w-full h-[2em] gap-[1.06em] [--rounding:.5em]",
			},
			checkbox: {
				none: null,
				fit: null,
				narrow: null,
				normal: null,
				wide: null,
				fill: null,
			},
			input: {
				none: "h-[2em]",
				fit: "h-[1.41em]",
				narrow: "w-[10em] h-[2em]",
				normal: "w-[14.14em] h-[2em]",
				wide: "w-[20em] h-[2em]",
				fill: "w-full h-[2em]",
			},
			"text-input": {
				none: null,
				fit: null,
				narrow: null,
				normal: null,
				wide: null,
				fill: null,
			},
			text: {
				none: null,
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
				"relative after:absolute after:inset-0 after:content-[''] after:pointer-events-none flex items-center has-invalid:ring-6d",
			"text-input":
				"grow outline-none leading-none first:ps-[.525em] last:pe-[.525em] min-w-0 h-full",
			checkbox:
				"inline-flex items-center justify-center h-[2.5em] min-w-[2.5em] select-none outline-none",
			text: "inline-flex items-center leading-[1.5em] h-fit",
		};
		const kindMatch = groups.kind as keyof typeof kind;
		const widthMatch = (groups.width as keyof typeof width.trigger) ?? "none";
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
					"data-[pressed]:—rel-elevation-6 not-[[data-pressed]]:rel-elevation-0 not-[[data-pressed]]:—base-elevation-5 data-[pressed]:base-elevation-3 data-[pressed]:active:—rel-elevation-2 not-[[data-pressed]]:active:—rel-elevation-12 not-[[data-pressed]]:active:—base-elevation-3 data-[pressed]:hover:—rel-elevation-10 data-[pressed]:hover:base-elevation-9 not-[[data-pressed]]:hover:rel-elevation-6 not-[[data-pressed]]:hover:—base-elevation-4",
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
	/^sfc-(?<kind>rounded|circular)(?:-(?<side>s|e|t|r|b|l|bl|br|tl|tr|es|ee|se|ss))?$/,
	({ groups }) => {
		if (!groups) return;
		const side = groups.side ? `-${groups.side}` : "";
		return groups.kind === "circular"
			? `rounded${side}-full after:rounded${side}-full before:rounded${side}-full`
			: `rounded${side}-[calc(var(--rounding,0)*var(--radius)/2)] after:rounded${side}-[calc(var(--rounding,0)*var(--radius)/2)] before:rounded${side}-[calc(calc(var(--rounding,0)*var(--radius)/2)+var(--spacing-size)*1rem*${calcSize(12)})]`;
	},
];

export const getRippleSurfaceShortcut: GetStaticShortcut = () => {
	const props: ShortcutCategory = {
		position: "relative before:content-[''] before:absolute before:z-1",
		size: "before:-inset-12d",
		border: "outline-none",
		animation: `transition-all before:scale-0 [--ripple-time:calc(var(--spacing-size)*1rem*var(--text-size)*${Math.round(2 * 2 ** (0.25 * 32)) / 1000}*1s/1px)]`,
	};
	return ["sfc-ripple", Object.values(props)];
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

export const getSurfacePaddingRule: GetDynamicRule = () => [
	/^sfc-p(?<side>x|y|r|l|t|b|s|e)?-(?<value>\d*(\.)?\d*)$/,
	({ groups }) => {
		if (!groups) return;
		if (!+groups.value) return;
		const isHorizontal =
			/^[xrlse]$/.test(groups.side) || groups.side === undefined;
		const padding = `${+(groups.value ?? 0)}em`;
		return {
			"--rounding": isHorizontal ? padding : undefined,
			[`padding${getCssSide(groups.side)}`]: padding,
		};
	},
];

export const getSurfaceRules = (opts: Options): Rule[] => [
	getElevationRule(opts),
	getSurfaceKindRules(opts),
	getEmphasisRules(opts),
	getSurfaceColorRules(opts),
	getSurfaceShadowRule(opts),
	getSurfaceBorderRule(),
	getToggleStateRule(opts),
	getSurfaceColorRule(opts),
	getSurfaceFontWeightRule(opts),
	getSurfacePaddingRule(opts),
];

export const getSurfaceShortcuts = (opts: Options): Shortcut[] => [
	getDefaultSurfaceShortcut(),
	getRippleSurfaceShortcut(),
	getSurfaceRoundingsShortcut(opts),
	getDisabledSurfaceShortcut(),
	getSurfaceColorShortcut(opts),
	getBoxShortcut(opts),
	getToggleStateShortcut(),
	getSelectionShortcut(opts),
	getComponentElevationShortcut(opts),
	getSurfaceFontSizeShortcut(opts),
	getBackgroundSurfaceShortcut(),
	getSurfaceFocusShadowShortcut(),
	getSurfaceShadowShortcut(),
];
