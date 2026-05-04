/** biome-ignore-all lint/suspicious/noExplicitAny: 'lib' */
import { apcaContrast, formatCSS, getOkLCHMaxChroma, type LCH } from "colorizr";
import type { CSSEntries } from "unocss";
import {
	assert,
	type CssIndentSides,
	catmullSplineThrough3Points,
	clamp,
	computeCompressedLightness,
	computeFgLightnessForApcaContrast,
	computeRelativeChromaOklch,
	cssBorderRadiusSides,
	getCssPropByUtilProp,
	hasOwn,
	lerp,
	rotationCompensation,
	round3,
	skewDarken,
	skewLighten,
	type UtilProp,
} from "../ds-utils";
import { assertMaybeColor } from "./options";

const MAX_POSSIBLE_CHROMA = 0.4632;

export const uc = {
	lightness: {
		range: {
			max: 1000,
			min: 0,
			spread: 1000, // maxRangeLim - minRangeLim = (1000 - 0)
		},
		scale: {
			max: 1000,
			min: 200,
			spread: 800, // maxRangeLim - minRangeLim = (1000 - 200)
		},
		intentColor: {
			max: 750, // range.max - surface.spread - 2 * hoverDelta = 750,
			min: 250, // range.min + surface.spread + 2 * hoverDelta = 250,
		},
		text: {
			max: 920,
			min: 0,
		},
		surface: {
			step: 50,
			quantity: 3,
			spread: 100, // step * (quantity - 1)
			interactiveDelta: 75,
		},
	},
	transparency: {
		subtle: { min: 2, max: 90, spread: 88 },
	},
	color: {
		background: {
			// без возможности удаления пользователем
			l: 1000,
			h: 90,
			c: 50,
			s: -1,
		},
		foreground: {
			// без возможности удаления пользователем
			l: 200,
			h: 270,
			c: 100,
			s: 1,
		},
		neutral: {
			l: 550,
			h: 240,
			c: 50,
			s: 1,
		},
		accent: {
			l: 450,
			h: 264,
			c: 1000,
			s: 1,
		},
		success: {
			l: 750,
			h: 142,
			c: 1000,
			s: 1,
		},
		warning: {
			l: 800,
			h: 110,
			c: 1000,
			s: -1,
		},
		danger: {
			l: 600,
			h: 29,
			c: 1000,
			s: 1,
		},
		info: {
			l: 750,
			h: 195,
			c: 1000,
			s: -1,
		},
		visited: {
			l: 700,
			h: 328,
			c: 1000,
			s: 1,
		},
	},
	intentColors: ["neutral", "accent", "info", "success", "warning", "danger"],
	baseColors: ["foreground", "background"],
	allColors: [
		"neutral",
		"accent",
		"info",
		"success",
		"warning",
		"danger",
		"foreground",
		"background",
		"visited",
	],
	emphasis: ["low", "medium", "high"],
} as const;

export const intentColors = [...uc.intentColors] as const;
export const baseColors = [...uc.baseColors] as const;
export const allColors = [...uc.allColors] as const;
export const emphases = [...uc.emphasis] as const;
export const widths = ["narrow", "normal", "wide", "fill"] as const;
export const shapes = ["square", "squircle", "rounded", "circular"] as const;

export type IntentColor = (typeof intentColors)[number];
export type BaseColor = (typeof baseColors)[number];
export type Color = (typeof allColors)[number];
export type Emphasis = (typeof emphases)[number];
export type Width = (typeof widths)[number];
export type Shape = (typeof shapes)[number];

export const boundIntentLightness = (l: number, ia = true) =>
	clamp(
		l,
		uc.lightness.intentColor.min - +!ia * uc.lightness.surface.interactiveDelta,
		uc.lightness.intentColor.max + +!ia * uc.lightness.surface.interactiveDelta,
	);
export const boundSurfaceLightness = (l: number, ia = true) =>
	clamp(
		l,
		uc.lightness.range.min +
			uc.lightness.surface.spread +
			+!!ia * uc.lightness.surface.interactiveDelta,
		uc.lightness.range.max -
			uc.lightness.surface.spread -
			+!!ia * uc.lightness.surface.interactiveDelta,
	);

export const calcSize = (value: string | number) =>
	+(2 ** (0.25 * +value)).toFixed(2);

/**
 *
 * @param l - input lightness in ppm
 * @returns recalculated lightness in ppm
 */
export const getCompressedPpmLightness = (l: number) =>
	computeCompressedLightness(
		l,
		uc.lightness.scale.min,
		uc.lightness.range.spread,
		uc.lightness.scale.spread,
	);

/**
 *
 * @param lch - LCH params in ppm with relative chroma in ppm
 * @returns normalized LCH with compressed lightness and relative chroma
 */
export const ppmLchToCompressedLch = (lch: LCH): LCH =>
	lch.alpha
		? {
				alpha: lch.alpha,
				l: +(getCompressedPpmLightness(lch.l) / 1000).toFixed(3),
				c: +(lch.c / 1000).toFixed(3),
				h: lch.h,
			}
		: {
				l: +(getCompressedPpmLightness(lch.l) / 1000).toFixed(3),
				c: +(lch.c / 1000).toFixed(3),
				h: lch.h,
			};

/**
 *
 * @param bgColor - background color in oklch() format
 * @param checkingTextColor - checking text color in oklch() format
 * @param textColorCandidateToSwap - candidate to swap checking text
 * @returns should the checkingText be replaced with textToSwapCandidate to improve APCA contrast
 */
export const isTextNeedSwap = (
	bgColor: string,
	checkingTextColor: string,
	textColorCandidateToSwap: string,
) =>
	Math.abs(apcaContrast(bgColor, textColorCandidateToSwap)) >
	Math.abs(apcaContrast(bgColor, checkingTextColor));

export interface ColorGroups {
	prop: "bg" | "text" | "border" | "outline" | "fill";
	side?: CssIndentSides;
	color: string;
	lightness?: string;
	mods?: string;
	opacity?: string;
	mode?: string;
}

export interface ColorGroup {
	modifier: "l" | "c" | "h";
	sign: "+" | "-" | "=" | ">" | "<";
	amount: string;
}

/**
 *
 * @description
 *
 * @param colorName - one of the names of intent colors in user configuration
 * @param ppmLightness - lightness of the intent color in ppm
 * @returns computed ready to use (compressed with normalized chroma) intent color
 */
export const resolveThemeColor = (
	colorName: string,
	ppmLightness?: number | string,
) =>
	hasOwn(uc.color, colorName)
		? computeRelativeChromaOklch(
				ppmLchToCompressedLch({
					...uc.color[colorName],
					l: ppmLightness !== undefined ? +ppmLightness : uc.color[colorName].l,
				}),
				"LCH",
			)
		: undefined;

const getChromaModifiedColor = (
	lch: LCH,
	sign: ColorGroup["sign"],
	modAmount: number,
): LCH => {
	const maxChroma = getOkLCHMaxChroma(lch, 3);
	const mA = (modAmount * MAX_POSSIBLE_CHROMA) / 100;
	switch (sign) {
		case "=":
			return { ...lch, c: clamp(mA, 0, maxChroma) };
		case "+":
			return {
				...lch,
				c: +clamp(lch.c * (1 + mA * 1), 0, maxChroma).toFixed(3),
			};
		case "-":
			return {
				...lch,
				c: +clamp(lch.c * (1 - mA * 1), 0, maxChroma).toFixed(3),
			};
		case ">": {
			return { ...lch, c: +clamp(lch.c, mA, maxChroma).toFixed(3) };
		}
		case "<": {
			return { ...lch, c: +clamp(lch.c, 0, mA).toFixed(3) };
		}
	}
};
export const getHueRotatedColor = (
	lch: LCH,
	sign: NonNullable<ColorGroup["sign"]>,
	modAmount: number,
): LCH => {
	const oldMaxChroma = getOkLCHMaxChroma(lch, 3);
	const ratio = lch.c / (oldMaxChroma || 1);
	const m = sign === "-" ? -1 : 1;
	const newHue = rotationCompensation(lch.h + m * modAmount);
	const r = { ...lch, h: newHue };
	r.c = getOkLCHMaxChroma(r, 3) * ratio;
	return r;
};

const getLightnessModifiedColor = (
	lch: LCH,
	sign: ColorGroup["sign"],
	modAmount: number,
) => {
	if (sign === "+") return skewLighten(lch, modAmount / 100);
	if (sign === "-") return skewDarken(lch, modAmount / 100);
	const oldMaxChroma = getOkLCHMaxChroma(lch, 3);
	const ratio = lch.c / (oldMaxChroma || 1);
	const r = { ...lch, l: modAmount / 100 };
	r.c = +(getOkLCHMaxChroma(r, 3) * ratio).toFixed(3);
	return r;
};

export const getModifiedColor = (
	lch: LCH,
	sign: ColorGroup["sign"],
	modAmount: number,
	modifier: ColorGroup["modifier"],
) => {
	switch (modifier) {
		case "l":
			return getLightnessModifiedColor(lch, sign, modAmount);
		case "c":
			return getChromaModifiedColor(lch, sign, modAmount);
		case "h":
			return getHueRotatedColor(lch, sign, modAmount);
	}
};

// TODO переписать все регулярки на именованные группы

export const colorRule = {
	re: /^(?:(?<mode>on-surface)-?)?(?<prop>bg|text|border|outline|fill|stroke)(?:-(?<side>x|y|t|r|b|l|s|e)?)?-(?<color>[a-z]+)-(?<lightness>\d{1,4})?d(?<mods>(?:\|[lch][+-=<>]\d{1,3})*)?(?:\/(?<opacity>\d{1,3}))?$/,
	fn: (groups: ColorGroups | undefined): CSSEntries | undefined => {
		if (!groups) return;
		const { mods, lightness, opacity, color, prop, side, mode } = groups;
		const cssProp = getCssPropByUtilProp(prop, side);
		if (color === "transparent") return [[cssProp, "transparent"]];

		const lch = resolveThemeColor(color, lightness);
		if (!lch) return;
		if (prop !== "border" && side) return;
		if (!hasOwn(uc.color, color)) return;
		const modifiers = mods
			?.split("|")
			.map((v) => v.match(/^(?<modifier>[lch])(?<sign>[+-=])(?<amount>\d+)$/))
			.slice(1)
			.filter((v) => !!v)
			.map((v) => v.groups)
			.filter((v) => !!v) as
			| {
					modifier: "l" | "c" | "h";
					sign: "+" | "-" | "=" | ">" | "<";
					amount: string;
			  }[]
			| undefined;

		if (modifiers) {
			modifiers.forEach((m) => {
				const mod = getModifiedColor(lch, m.sign, +m.amount, m.modifier);
				lch.c = mod.c;
				lch.h = mod.h;
				lch.l = mod.l;
			});
		}
		const lightnessStep = lerp(
			uc.lightness.range.min / 1000,
			uc.lightness.scale.spread / 1000,
			+uc.lightness.surface.step / 1000,
		).toFixed(3);
		const lOut = mode ? `var(--${prop}-delta-lightness, ${lch.l})` : lch.l;
		const maybeTransparency = opacity
			? +opacity < 101
				? +opacity % 100
				: undefined
			: undefined;
		const transparencyStr = maybeTransparency ? ` / ${maybeTransparency}%` : "";
		const cssValue = ` oklch(${lOut} ${+lch.c} ${lch.h}${transparencyStr})`;
		cssValue;
		const l = lch.l;
		return [
			[
				` --${prop}-delta-lightness`,
				mode === "on-surface"
					? `calc(${l ? `${l}+` : ""}var(--surface-level)*${lightnessStep})`
					: undefined,
			],
			[cssProp, cssValue],
		];
	},
};

function assertEmphasis(emphasis: string): asserts emphasis is Emphasis {
	assert(
		uc.emphasis.includes(emphasis as Emphasis),
		`No such emphasis ${emphasis} in the theme`,
	);
}

export const superColorRule = {
	re: /^super-(?<prop>bg|text|border|outline|fill)(?:-(?<side>x|y|t|r|b|l|s|e)?)?-(?<color>[a-z]+)(?:\/(?<opacity>\d{1,3}))?$/,
	fn: (groups: ColorGroups | undefined): CSSEntries | undefined => {
		if (!groups) return;
		const { opacity, color, prop, side } = groups;
		const cssProp = getCssPropByUtilProp(prop, side);
		if (color === "transparent") return [[cssProp, "transparent"]];

		const maybeTransparency = opacity
			? +opacity < 101
				? +opacity % 100
				: undefined
			: undefined;
		const transparencyStr = maybeTransparency ? ` / ${maybeTransparency}%` : "";
		const cssValue = ` oklch(var(--colors-${color}-lightness) var(--colors-${color}-chroma) var(--colors-${color}-hue)${transparencyStr})`;
		cssValue;
		return [[cssProp, cssValue]];
	},
};

export const getLightSurfaceBgLightness = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const interactiveDelta = interactive
		? uc.lightness.surface.interactiveDelta
		: 0;
	const fallbackLightness =
		uc.lightness.scale.min + uc.lightness.surface.spread + interactiveDelta;
	const lightness = (color ? uc.color[color].l : fallbackLightness) / 1000;
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = round3(idx / (uc.emphasis.length - 1));

	const lightnessBottomBoundTarget =
		uc.lightness.scale.max - 2 * uc.lightness.surface.spread;
	const lightnessBottomBoundStart = uc.lightness.range.min;

	const lightnessTopBoundTarget = uc.lightness.range.max;
	const lightnessTopBoundStart =
		uc.lightness.range.max - uc.lightness.surface.spread;

	const lightnessBottomBound =
		lightnessBottomBoundStart +
		(lightnessBottomBoundTarget -
			lightnessBottomBoundStart -
			interactiveDelta) *
			(1 - emphasis);
	const lightnessTopBound =
		lightnessTopBoundStart +
		(lightnessTopBoundTarget - lightnessTopBoundStart) * emphasis;

	const bgLightness = round3(
		lerp(lightnessBottomBound / 1000, lightnessTopBound / 1000, lightness),
	);
	return bgLightness;
};
export const getDarkSurfaceBgLightness = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const interactiveDelta = interactive
		? uc.lightness.surface.interactiveDelta
		: 0;
	const fallbackLightness =
		uc.lightness.scale.max -
		2 * uc.lightness.surface.interactiveDelta -
		uc.lightness.surface.spread +
		interactiveDelta;
	const lightness = (color ? uc.color[color].l : fallbackLightness) / 1000;
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = round3(idx / (uc.emphasis.length - 1));

	const lightnessBottomBoundTarget = uc.lightness.scale.min + interactiveDelta;
	const lightnessBottomBoundStart = uc.lightness.range.min;

	const lightnessTopBoundTarget =
		lightnessBottomBoundTarget + uc.lightness.surface.spread / 2;
	const lightnessTopBoundStart = uc.lightness.range.max;

	const lightnessBottomBound =
		lightnessBottomBoundStart +
		(lightnessBottomBoundTarget - lightnessBottomBoundStart) * (1 - emphasis);
	const lightnessTopBound =
		lightnessTopBoundStart -
		(lightnessTopBoundStart - lightnessTopBoundTarget) * (1 - emphasis);

	const bgLightness =
		round3(
			lerp(lightnessBottomBound / 1000, lightnessTopBound / 1000, lightness),
		) +
		uc.lightness.surface.spread / 1000;
	return bgLightness;
};
export const getLightSurfaceChroma = (
	emphasisStr: Emphasis,
	color?: Color,
	lowEmphasisChromaLimit = 0.1,
	interactive?: string,
) => {
	const fallbackColor: Color = "foreground";
	const hue = uc.color[color ?? fallbackColor].h;
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = idx / (uc.emphasis.length - 1);
	const lightness = getLightSurfaceBgLightness(emphasisStr, color, interactive);
	const lightnessStep = uc.lightness.surface.step / 1000;
	const lightnesses = uc.emphasis.map(
		(_, i) => lightness + i * lightnessStep * (1 - emphasis),
	);
	const highEmphasisMaxChroma = getOkLCHMaxChroma(
		{ l: getDarkSurfaceBgLightness("high", color) ?? 0, c: 0, h: hue },
		3,
	);
	const minChroma = lerp(
		lowEmphasisChromaLimit,
		highEmphasisMaxChroma,
		emphasis,
	);
	const chromas = lightnesses.map((v) => {
		const maxChroma =
			(getOkLCHMaxChroma({ l: v, c: 0, h: hue }, 3) *
				uc.color[color ?? fallbackColor].c) /
			1000;

		return Math.min(maxChroma, minChroma);
	});
	return round3(Math.min(...chromas));
};

export const getDarkSurfaceChroma = (
	emphasisStr: Emphasis,
	color?: Color,
	lowEmphasisChromaLimit = 0.1,
	interactive?: string,
) => {
	const fallbackColor: Color = "foreground";
	const hue = uc.color[color ?? fallbackColor].h;
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = idx / (uc.emphasis.length - 1);
	const lightness = getDarkSurfaceBgLightness(emphasisStr, color, interactive);
	const lightnessStep = uc.lightness.surface.step / 1000;
	const lightnesses = uc.emphasis.map(
		(_, i) => lightness + i * lightnessStep * (1 - emphasis),
	);
	const highEmphasisMaxChroma = getOkLCHMaxChroma(
		{ l: getDarkSurfaceBgLightness("high", color) ?? 0, c: 0, h: hue },
		3,
	);

	const minChroma = lerp(
		lowEmphasisChromaLimit,
		highEmphasisMaxChroma,
		emphasis,
	);

	const chromas = lightnesses.map((v) => {
		const maxChroma =
			(getOkLCHMaxChroma({ l: v, c: 0, h: hue }, 3) *
				uc.color[color ?? fallbackColor].c) /
			1000;

		return Math.min(maxChroma, minChroma);
	});
	return round3(Math.min(...chromas));
};

export const getLightSurfaceBgCssVars = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const idx = uc.emphasis.indexOf(emphasisStr);

	const bgLightness = getLightSurfaceBgLightness(
		emphasisStr,
		color,
		interactive,
	);

	const bgChroma = getLightSurfaceChroma(
		emphasisStr,
		color,
		0.052,
		interactive,
	);

	const pressedOpacity = round3(
		catmullSplineThrough3Points(uc.emphasis.length, 1, 1.75, 2)[idx].y,
	);

	const stateAdmixRules = interactive
		? `[--bg-hover-admix-${emphasisStr}:${Math.round((bgLightness * 100) / 2.5)}%] [--bg-active-admix-${emphasisStr}:${Math.round((100 - bgLightness * 100) ** 0.65 * 1.5)}%]`
		: "";
	const pressedOpacityRules = `[--pressed-opacity-${emphasisStr}:calc(var(--bg-lightness)/${pressedOpacity})] [--unpressed-opacity-${emphasisStr}:calc(var(--bg-lightness)/${pressedOpacity / 2})]`;
	const bgChromaRules = `[--bg-chroma-${emphasisStr}:${bgChroma}]`;
	const bgLightnessRules = `[--bg-lightness-${emphasisStr}:${bgLightness}]`;

	return [
		stateAdmixRules,
		pressedOpacityRules,
		bgChromaRules,
		bgLightnessRules,
	].join(" ");
};

export const getLightOnIntentSurfaceFgCssVars = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const fallbackColor: Color = "foreground";
	const hue = uc.color[color ?? fallbackColor].h;

	const idx = uc.emphasis.indexOf(emphasisStr);

	const emphasis = idx / (uc.emphasis.length - 1);

	const apca = 80 - (uc.emphasis.length - idx - 1) * (interactive ? 10 : 5);

	const MAX_FG_PLUS_DELTA_LIGHTNESS = 0.72;

	const bgLightness = getLightSurfaceBgLightness(
		emphasisStr,
		color,
		interactive,
	);

	const bgChroma = getLightSurfaceChroma(
		emphasisStr,
		color,
		0.052,
		interactive,
	);
	const plusFgLightness = Math.min(
		1,
		bgLightness + MAX_FG_PLUS_DELTA_LIGHTNESS,
	);
	const testMaxChroma = getOkLCHMaxChroma({ l: 0.3, c: 0, h: hue }, 3);
	const minusFgLightness = Math.max(
		Math.ceil(
			computeFgLightnessForApcaContrast(
				{ l: bgLightness, c: bgChroma, h: hue },
				{ l: 0.3, c: testMaxChroma, h: hue },
				apca,
			).l * 100,
		) / 100,
		uc.lightness.scale.min / 1000,
	);
	const maxChromaPlus = getOkLCHMaxChroma(
		{ l: plusFgLightness, c: 0, h: hue },
		3,
	);

	const chromaPlus = round3(
		(maxChromaPlus * uc.color[color ?? fallbackColor].c) / 1000,
	);
	const highEmphasisMaxChroma = getOkLCHMaxChroma(
		{ l: getDarkSurfaceBgLightness("high", color) ?? 0, c: 0, h: hue },
		3,
	);

	const lowEmphasisChromaLimit = 0.12;

	const minChromaMinus = lerp(
		lowEmphasisChromaLimit,
		highEmphasisMaxChroma,
		emphasis,
	);

	const maxChromaMinus =
		(getOkLCHMaxChroma({ l: minusFgLightness, c: 0, h: hue }, 3) *
			uc.color[color ?? fallbackColor].c) /
		1000;

	const chromaMinus = Math.min(maxChromaMinus, minChromaMinus);

	const plusStr = formatCSS(
		{ l: plusFgLightness, c: chromaPlus, h: hue },
		{ format: "oklch", precision: 3 },
	);
	const minusStr = formatCSS(
		{ l: minusFgLightness, c: chromaMinus, h: hue },
		{ format: "oklch", precision: 3 },
	);
	const bgStr = formatCSS(
		{ l: bgLightness, c: bgChroma, h: hue },
		{ format: "oklch", precision: 3 },
	);
	const apcaPlus = Math.abs(apcaContrast(bgStr, plusStr));
	const apcaMinus = Math.abs(apcaContrast(bgStr, minusStr));
	const fgLightness = apcaPlus > apcaMinus ? plusFgLightness : minusFgLightness;
	const fgChroma = apcaPlus > apcaMinus ? chromaPlus : chromaMinus;

	return `[--fg-chroma-${emphasisStr}:${fgChroma}] [--fg-lightness-${emphasisStr}:${fgLightness}]`;
};

export const getLightOnSurfaceFgCssVars = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const fallbackColor: Color = "foreground";
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = idx / (uc.emphasis.length - 1);
	const interactiveDelta = interactive ? uc.lightness.surface.spread : 0;
	const hue = uc.color[color ?? fallbackColor].h;
	const midLightness = (uc.lightness.scale.min + uc.lightness.scale.max) / 2;
	const targetLightness = (uc.lightness.scale.min + interactiveDelta) / 1000;
	const startLightness = lerp(
		targetLightness + uc.lightness.surface.spread / 1000,
		(midLightness + interactiveDelta) / 1000,
		uc.color[color ?? fallbackColor].l / 1000,
	);

	const deltaLightness =
		(startLightness - targetLightness - interactiveDelta / 1000) /
		(uc.emphasis.length - 1);

	const lightness = round3(startLightness - deltaLightness * idx);
	const maxChroma = getOkLCHMaxChroma({ l: lightness, c: 0, h: hue }, 3);
	const chroma = round3(
		(maxChroma * uc.color[color ?? fallbackColor].c) / 1000,
	);

	const startHoverAdmix = 0.3;
	const endHoverAdmix = 0.5;
	const hoverAdmix = lerp(startHoverAdmix, endHoverAdmix, emphasis);

	const admixRules = interactive
		? `[--fg-hover-admix-${emphasisStr}:${hoverAdmix * 100}%] [--fg-active-admix-${emphasisStr}:${50}%]`
		: "";
	const fgChromaRules = `[--fg-chroma-${emphasisStr}:${chroma}]`;
	const contrastModRules = `[--contrast-mod:#fff]`;
	const fgLightnessRules = `[--fg-lightness-${emphasisStr}:${lightness}]`;

	return [admixRules, fgChromaRules, contrastModRules, fgLightnessRules].join(
		" ",
	);
};

const getDarkSurfaceBgCssVars = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const idx = uc.emphasis.indexOf(emphasisStr);

	const bgLightness = getDarkSurfaceBgLightness(
		emphasisStr,
		color,
		interactive,
	);

	const bgChroma = getDarkSurfaceChroma(emphasisStr, color, 0.061, interactive);

	const admixRules = interactive
		? ` [--bg-hover-admix-${emphasisStr}:${Math.round((bgLightness * 100) / 2.5)}%] [--bg-active-admix-${emphasisStr}:${Math.round((100 - bgLightness * 100) ** 0.65 * 1.5)}%]`
		: "";
	const pressedOpacity = round3(
		catmullSplineThrough3Points(uc.emphasis.length, 0.6, 1.2, 2.4)[idx].y,
	);
	const pressedOpacityRules = `[--pressed-opacity-${emphasisStr}:calc(var(--bg-lightness)/${pressedOpacity})] [--unpressed-opacity-${emphasisStr}:calc(var(--bg-lightness)/${pressedOpacity / 2})]`;
	const bgChromaRules = `[--bg-chroma-${emphasisStr}:${bgChroma}]`;
	const bgLightnessRules = `[--bg-lightness-${emphasisStr}:${bgLightness}]`;

	return [
		admixRules,
		pressedOpacityRules,
		bgChromaRules,
		bgLightnessRules,
	].join(" ");
};
export const getDarkOnIntentSurfaceFgCssVars = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const fallbackColor: Color = "foreground";
	const hue = uc.color[color ?? fallbackColor].h;
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = idx / (uc.emphasis.length - 1);
	const apca = 80 - (uc.emphasis.length - idx - 1) * (interactive ? 10 : 5);
	const MAX_FG_PLUS_DELTA_LIGHTNESS = 0.72;
	const bgLightness = getDarkSurfaceBgLightness(
		emphasisStr,
		color,
		interactive,
	);
	const bgChroma = getDarkSurfaceChroma(emphasisStr, color, 0.061, interactive);
	const testMaxChroma = getOkLCHMaxChroma({ l: 0.8, c: 0, h: hue }, 3);
	const plusFgLightness =
		Math.ceil(
			computeFgLightnessForApcaContrast(
				{ l: bgLightness, c: bgChroma, h: hue },
				{ l: 0.8, c: testMaxChroma, h: hue },
				apca,
			).l * 100,
		) / 100;
	const minusFgLightness = Math.max(
		round3(bgLightness - MAX_FG_PLUS_DELTA_LIGHTNESS),
		uc.lightness.scale.min / 1000,
	);

	const lowEmphasisChromaLimit = 0.125;
	const highEmphasisMaxChroma = getOkLCHMaxChroma(
		{ l: getDarkSurfaceBgLightness("high", color) ?? 0, c: 0, h: hue },
		3,
	);
	const minChromaPlus = lerp(
		lowEmphasisChromaLimit,
		highEmphasisMaxChroma,
		emphasis,
	);

	const maxChromaPlus =
		(getOkLCHMaxChroma({ l: plusFgLightness, c: 0, h: hue }, 3) *
			uc.color[color ?? fallbackColor].c) /
		1000;

	const maxChromaMinus = getOkLCHMaxChroma(
		{ l: minusFgLightness, c: 0, h: hue },
		3,
	);
	const chromaPlus = Math.min(maxChromaPlus, minChromaPlus);
	const chromaMinus = round3(
		(maxChromaMinus * uc.color[color ?? fallbackColor].c) / 1000,
	);
	const plusStr = formatCSS(
		{ l: plusFgLightness, c: chromaPlus, h: hue },
		{ format: "oklch", precision: 3 },
	);
	const minusStr = formatCSS(
		{ l: minusFgLightness, c: chromaMinus, h: hue },
		{ format: "oklch", precision: 3 },
	);
	const bgStr = formatCSS(
		{ l: bgLightness, c: bgChroma, h: hue },
		{ format: "oklch", precision: 3 },
	);
	const apcaPlus = Math.abs(apcaContrast(bgStr, plusStr));
	const apcaMinus = Math.abs(apcaContrast(bgStr, minusStr));
	const fgLightness = apcaPlus > apcaMinus ? plusFgLightness : minusFgLightness;
	const fgChroma = apcaPlus > apcaMinus ? chromaPlus : chromaMinus;

	return `[--fg-chroma-${emphasisStr}:${fgChroma}] [--fg-lightness-${emphasisStr}:${fgLightness}]`;
};
export const getDarkOnSurfaceFgCssVars = (
	emphasisStr: Emphasis,
	color?: Color,
	interactive?: string,
) => {
	const fallbackColor: Color = "foreground";
	const idx = uc.emphasis.indexOf(emphasisStr);
	const emphasis = idx / (uc.emphasis.length - 1);
	const interactiveDelta = interactive
		? uc.lightness.surface.interactiveDelta
		: 0;
	const hue = uc.color[color ?? fallbackColor].h;

	const fallbackLightness =
		uc.lightness.scale.max -
		2 * uc.lightness.surface.interactiveDelta -
		uc.lightness.surface.spread +
		interactiveDelta;
	const midLightness = (uc.lightness.scale.min + uc.lightness.scale.max) / 2;
	const targetLightness = lerp(
		(midLightness + uc.lightness.surface.spread - interactiveDelta) / 1000,
		(uc.lightness.scale.max - uc.lightness.surface.spread - interactiveDelta) /
			1000,
		(color ? uc.color[color].l : fallbackLightness) / 1000,
	);
	const deltaLightness = 0.075 * targetLightness;
	const startLightness =
		targetLightness - deltaLightness * (uc.emphasis.length - 1);

	const lightness = round3(startLightness + deltaLightness * idx);
	const maxChroma = getOkLCHMaxChroma({ l: lightness, c: 0, h: hue }, 3);
	const chroma = round3(
		(maxChroma * uc.color[color ?? fallbackColor].c) / 1000,
	);

	const startHoverAdmix = 0.5;
	const endHoverAdmix = 0.6;
	const hoverAdmix = lerp(startHoverAdmix, endHoverAdmix, 1 - emphasis);

	const admixRules = interactive
		? ` [--fg-hover-admix-${emphasisStr}:${hoverAdmix * 100}%] [--fg-active-admix-${emphasisStr}:${hoverAdmix * 25}%]`
		: "";
	const fgChromaRules = `[--fg-chroma-${emphasisStr}:${chroma}]`;
	const fgLightnessRules = `[--fg-lightness-${emphasisStr}:${lightness}]`;
	const contrastModRules = `[--contrast-mod:#000]`;

	return [admixRules, fgChromaRules, fgLightnessRules, contrastModRules].join(
		" ",
	);
};

export interface SurfaceScGroups {
	color?: string;
	interactive?: string;
	mode?: "light" | "dark";
}
export const surfaceSc = {
	re: /^dggfdg-(?<mode>light|dark)-surface(?:-(?<color>[a-z]+))?(?:-(?<interactive>ia))?$/,
	fn: ({ color, interactive, mode }: SurfaceScGroups) => {
		assertMaybeColor(color);

		const cssVars =
			mode === "dark"
				? uc.emphasis.map((emphasisStr) =>
						getDarkSurfaceBgCssVars(emphasisStr, color, interactive),
					)
				: uc.emphasis
						.flatMap((emphasisStr) =>
							getLightSurfaceBgCssVars(emphasisStr, color, interactive),
						)
						.join(" ");

		const surfaceDelta = uc.lightness.surface.step / 1000;

		return `[--bg-hue:${uc.color[color ?? "foreground"].h}] [--bg-color:oklch(calc(var(--bg-lightness)+var(--surface-level)*${surfaceDelta}*(1-var(--surface-emphasis)))_var(--bg-chroma) var(--bg-hue)_/_var(--surface-opacity, 1))] bg-(--bg-color) ${cssVars}`;
	},
};

export interface OnSurfaceScGroups {
	color?: string;
	intent?: string;
	interactive?: string;
	mode?: "light" | "dark";
}
export const onSurfaceSc = {
	re: /^(?<mode>light|dark)-on(?:-(?<intent>intent))?-surface(?:-(?<color>[a-z]+))?(?:-(?<interactive>ia))?$/,
	fn: ({ color, intent, interactive, mode }: OnSurfaceScGroups) => {
		assertMaybeColor(color);

		const hueVar = ` [--fg-hue:${uc.color[color ?? "foreground"].h}]`;

		return `${(
			mode === "dark"
				? uc.emphasis.map((emphasisStr) =>
						intent
							? getDarkOnIntentSurfaceFgCssVars(emphasisStr, color, interactive)
							: getDarkOnSurfaceFgCssVars(emphasisStr, color, interactive),
					)
				: uc.emphasis.map((emphasisStr) =>
						intent
							? getLightOnIntentSurfaceFgCssVars(
									emphasisStr,
									color,
									interactive,
								)
							: getLightOnSurfaceFgCssVars(emphasisStr, color, interactive),
					)
		).join(" ")}${hueVar}`;
	},
};

export interface SurfaceEmphasisScGroups {
	emphasis: string;
}
export const surfaceEmphasisSc = {
	re: /^(?<emphasis>[a-z]+)-emphasis-surface$/,
	fn: ({ emphasis: emphasisStr }: SurfaceEmphasisScGroups) => {
		assertEmphasis(emphasisStr);
		const idx = uc.emphasis.indexOf(emphasisStr);
		const emphasis = round3(idx / (uc.emphasis.length - 1));
		const pc = emphasis * 100;

		// const lightUnpressedOpacity = round3(catmullSplineThrough3Points(uc.emphasis.length, 1, 1.75, 2)[idx].y);
		// const darkUnpressedOpacity = round3(catmullSplineThrough3Points(uc.emphasis.length, 0.6, 1.2, 2.4)[idx].y);

		const varBgLightness = `var(--bg-lightness-${emphasisStr})`;
		const varBgChroma = `var(--bg-chroma-${emphasisStr})`;

		const hoverAdmixVar = `var(--bg-hover-admix-${emphasisStr})`;
		const activeAdmixVar = `var(--bg-active-admix-${emphasisStr})`;

		const pressedOpacityVar = `var(--pressed-opacity-${emphasisStr})`;
		const unpressedOpacityVar = `var(--unpressed-opacity-${emphasisStr})`;

		return `[--surface-emphasis:${emphasis}] [--surface-emphasis-pc:${pc}%] [--bg-lightness:${varBgLightness}] [--bg-chroma:${varBgChroma}] [--bg-hover-admix:${hoverAdmixVar}] [--bg-active-admix:${activeAdmixVar}] [--pressed-opacity:${pressedOpacityVar}] [--unpressed-opacity:${unpressedOpacityVar}]`;
	},
};

export interface OnSurfaceEmphasisScGroups {
	emphasis: string;
}
export const onSurfaceEmphasisSc = {
	re: /^(?<emphasis>[a-z]+)-emphasis-on-surface$/,
	fn: ({ emphasis: emphasisStr }: OnSurfaceEmphasisScGroups) => {
		assertEmphasis(emphasisStr);
		const idx = uc.emphasis.indexOf(emphasisStr);
		const emphasis = round3(idx / (uc.emphasis.length - 1));
		const pc = emphasis * 100;

		const varFgChroma = `var(--fg-chroma-${emphasisStr})`;
		const varFgLightness = `var(--fg-lightness-${emphasisStr})`;

		const hoverAdmixVar = `var(--fg-hover-admix-${emphasisStr})`;
		const activeAdmixVar = `var(--fg-active-admix-${emphasisStr})`;

		return `[--on-surface-emphasis:${emphasis}] [--on-surface-emphasis-pc:${pc}%] [--fg-chroma:${varFgChroma}] [--fg-lightness:${varFgLightness}] [--bg-hover-admix:${hoverAdmixVar}] [--bg-active-admix:${activeAdmixVar}]`;
	},
};

export interface SurfaceStateScGroups {
	state: "idle" | "hover" | "active" | "pressed" | "unpressed";
}
export const surfaceStateSc = {
	re: /^surface-state-(?<state>idle|hover|active|pressed|unpressed)$/,
	fn: ({ state }: SurfaceStateScGroups) => {
		const surfaceDelta = uc.lightness.surface.step / 1000;

		const bgColorVar = `[--bg-color:oklch(calc(var(--bg-lightness)+var(--surface-level,0)*${surfaceDelta}*(1-var(--surface-emphasis)))_var(--bg-chroma)_var(--bg-hue)/var(--surface-opacity,1))]`;
		const surfaceOpacityVar =
			state === "pressed"
				? "[--surface-opacity:var(--pressed-opacity)]"
				: state === "unpressed"
					? "[--surface-opacity:var(--unpressed-opacity)]"
					: "";
		const admixVar = `var(--bg-${state}-admix)`;
		const mixColor = state === "active" ? "#000" : "#fff";
		const bgColor =
			state === "hover" || state === "active"
				? `bg-[color-mix(in_oklch,var(--bg-color),${mixColor}_${admixVar})]`
				: "bg-[var(--bg-color)]";

		return [bgColorVar, surfaceOpacityVar, bgColor].filter(Boolean).join(" ");
	},
};
export interface OnSurfaceStateScGroups {
	state: "idle" | "hover" | "active" | "pressed" | "unpressed";
	contrast: "lc" | "hc";
}
export const onSurfaceStateSc = {
	re: /^on-surface-state-(?<state>idle|hover|active)-(?<contrast>lc|hc)$/,
	fn: ({ contrast, state }: OnSurfaceStateScGroups) => {
		const surfaceDelta = uc.lightness.surface.step / 1000;
		const surfaceAvgStepLightness = uc.lightness.surface.spread / 2 / 1000;

		const fgColorRules = `[--fg-color:oklch(calc(var(--fg-lightness)+var(--surface-level)*${surfaceDelta}*(1-var(--surface-emphasis)))_var(--bg-chroma)_var(--fg-hue)/var(--surface-opacity,1))]`;
		const surfaceOpacityRules =
			state === "pressed"
				? "[--surface-opacity:var(--pressed-opacity)]"
				: state === "unpressed"
					? "[--surface-opacity:var(--unpressed-opacity)]"
					: "";
		const mixColorRules = state === "hover" ? "#fff" : "#000";
		const hoverRules =
			state === "hover" || state === "active"
				? `fg-[color-mix(in_oklch,var(--fg-color),${mixColorRules}var(--fg-${state}-admix))]`
				: "fg-(--fg-color)";
		const contrastRules =
			contrast === "hc"
				? `oklch(calc(var(--fg-lightness)+var(--surface-level)*${surfaceAvgStepLightness})_var(--fg-chroma)_var(--fg-hue))`
				: `color-mix(in oklch,currentColor,var(--contrast-mod))`;

		return [
			fgColorRules,
			surfaceOpacityRules,
			fgColorRules,
			contrastRules,
			hoverRules,
		].join(" ");
	},
};

// export interface SurfaceColorModeGroups {
// 	color: Color | "transparent";
// 	prop: "bg" | "text" | "border" | "outline" | "fill";
// 	side?: CssIndentSides;
// 	mode: "light" | "dark";
// }
// export const surfaceColorModeRule = {
// 	re: /^surface-(?<mode>dark|light)$/,
// 	fn: (groups: SurfaceColorModeGroups): CSSValueInput => {
// 		const { color } = groups;
// 		const surfaceDelta = uc.lightness.surface.step / 1000;
// 		const cssValue =
// 			color === "transparent"
// 				? "transparent"
// 				: `oklch(calc(var(--bg-lightness) + var(--surface-level) * ${surfaceDelta} * (1 - var(--surface-emphasis))) var(--bg-chroma) var(--hue) / var(--surface-opacity, 1))`;
// 		cssValue;
// 		return {
// 			"--bg-color": cssValue,
// 			"background-color": `var(--bg-color)`,
// 		};
// 	},
// };

// export interface HoverActiveSurfaceEmphasisScGroups {
// 	state: string;
// 	prop: string;
// }
// export const hoverActiveSurfaceEmphasisSc = {
// 	re: /^surface-(?<prop>[a-z]+)-(?<state>hover|active)$/,
// 	fn: ({ prop, state }: HoverActiveSurfaceEmphasisScGroups) => {
// 		assertCssProp(prop);

// 		const mixColor = state === "hover" ? "#fff" : "#000";

// 		return `${prop}-[color-mix(in oklch,var(--bg-color),${mixColor}var(--${state}-admix))]`;
// 	},
// };
// export interface PressedUnpressedEmphasisScGroups {
// 	emphasis: string;
// 	mode: "dark" | "light";
// 	state: "pressed" | "unpressed";
// }
// export const pressedUnpressedSurfaceEmphasisSc = {
// 	re: /^surface-(?<state>pressed|unpressed)-emphasis-(?<emphasis>[a-z]+)-(?<mode>light|dark)$/,
// 	fn: ({ emphasis: emphasisStr, mode, state }: PressedUnpressedEmphasisScGroups) => {
// 		assertEmphasis(emphasisStr);
// 		const idx = uc.emphasis.indexOf(emphasisStr);

// 		const lightPressedOpacity = round3(catmullSplineThrough3Points(uc.emphasis.length, 1, 1.75, 2)[idx].y);
// 		const darkPressedOpacity = round3(catmullSplineThrough3Points(uc.emphasis.length, 0.6, 1.2, 2.4)[idx].y);

// 		return `[--surface-opacity:calc(var(--bg-lightness)/${mode === "dark" ? darkPressedOpacity : lightPressedOpacity}${state === "unpressed" ? "/2" : ""})]`;
// 	},
// };

// export interface HoverActiveOnIntentSurfaceEmphasisRuleGroups {
// 	emphasis: string;
// 	state: string;
// 	prop: string;
// }
// export const hoverActiveOnIntentSurfaceEmphasisRule = {
// 	re: /^on-surface-(?<prop>[a-z]+)-(?<state>hover|active)-emphasis-(?<emphasis>[a-z]+)$/,
// 	fn: ({ emphasis: emphasisStr, prop, state }: HoverActiveOnIntentSurfaceEmphasisRuleGroups) => {
// 		assertEmphasis(emphasisStr);
// 		const cssProp = getCssPropByUtilProp(prop);

// 		return {
// 			[`--on-surface-${state}-admix`]: `var(--${state}-admix-${emphasisStr})`,
// 			[cssProp]: `color-mix(in oklch, var(--fg-hc-color), ${state === "active" ? "#000" : "#fff"} var(--on-surface-${state}-admix))`,
// 		};
// 	},
// };

export interface ElevationRuleGroups {
	level: string;
}
export const elevationRule = {
	re: /^elevation-(?<level>\d)$/,
	fn: ({ level }: ElevationRuleGroups) => {
		const nL = +level;
		if (Number.isNaN(nL)) throw `elevation value ${level} must be a digit`;
		return {
			"--surface-level": nL,
		};
	},
};

// export const onIntentSurfaceCompoundEmphasisRule = {
// 	re: /^on-surface-emphasis-(?<emphasis>[a-z]+)$/,
// 	fn: ({ emphasis: emphasisStr }: SurfaceEmphasisScGroups) => {
// 		assertEmphasis(emphasisStr);
// 		const idx = uc.emphasis.indexOf(emphasisStr);
// 		const emphasis = round3(idx / (uc.emphasis.length - 1));
// 		const pc = emphasis * 100;

// 		const varFgChroma = `var(--fg-chroma-${emphasisStr})`;
// 		const varFgLightness = `var(--fg-lightness-${emphasisStr})`;

// 		return {
// 			"--on-surface-emphasis": `${emphasis}`,
// 			"--on-surface-emphasis-pc": `${pc}%`,
// 			"--fg-chroma": `var(--fg-chroma-${emphasisStr})`,
// 			"--fg-lightness": `var(--fg-lightness-${emphasisStr})`,
// 		};
// 	},
// };

// export interface SurfaceColorModeGroups {
// 	color: Color | "transparent";
// 	prop: "bg" | "text" | "border" | "outline" | "fill";
// 	side?: CssIndentSides;
// 	mode: "light" | "dark";
// }
// export const surfaceColorModeRule = {
// 	re: /^surface-(?<mode>dark|light)$/,
// 	fn: (groups: SurfaceColorModeGroups): CSSValueInput => {
// 		const { color } = groups;
// 		const surfaceDelta = uc.lightness.surface.step / 1000;
// 		const cssValue =
// 			color === "transparent"
// 				? "transparent"
// 				: `oklch(calc(var(--bg-lightness) + var(--surface-level) * ${surfaceDelta} * (1 - var(--surface-emphasis))) var(--bg-chroma) var(--hue) / var(--surface-opacity, 1))`;
// 		cssValue;
// 		return {
// 			"--bg-color": cssValue,
// 			"background-color": `var(--bg-color)`,
// 		};
// 	},
// };

// export interface onSurfaceModeGroups {
// 	color: Color | "transparent";
// 	mode: "light" | "dark";
// 	contrast?: "lc" | "hc";
// }
// export const onSurfaceModeRule = {
// 	re: /^on-surface-(?<mode>dark|light)(?:-(?<contrast>lc|mc|hc))?$/,
// 	fn: (groups: onSurfaceModeGroups): CSSValueInput => {
// 		const { color, mode, contrast } = groups;
// 		const surfaceAvgStepLightness = uc.lightness.surface.spread / 2 / 1000;
// 		const highContrastCssValue =
// 			color === "transparent"
// 				? "transparent"
// 				: `oklch(calc(var(--fg-lightness) + var(--surface-level) * ${surfaceAvgStepLightness}) var(--fg-chroma) var(--hue))`;
// 		const lowContrastCssValue =
// 			color === "transparent"
// 				? "transparent"
// 				: `color-mix(in oklch, currentColor, ${mode === "dark" ? "#000" : "#fff"} 25%)`;
// 		const borderCssValue =
// 			color === "transparent"
// 				? "transparent"
// 				: `color-mix(in oklch, var(--bg-color, color-mix(in oklch, currentColor, ${mode === "dark" ? "#000" : "#fff"})), var(--fg-hc-color))`;
// 		highContrastCssValue;
// 		return {
// 			"--fg-hc-color": highContrastCssValue,
// 			"--fg-lc-color": lowContrastCssValue,
// 			"--border-color": borderCssValue,
// 			color: `var(--fg-${contrast === "lc" ? "lc" : "hc"}-color)`,
// 			"border-color": `var(--border-color)`,
// 		};
// 	},
// };

// export interface OnSurfaceRuleGroups {
// 	color?: string;
// 	interactive?: string;
// 	mode?: "light" | "dark";
// }
// export const onSurfaceRule = {
// 	re: /^on-surface(?:-(?<color>[a-z]+))?(?:-(?<mode>light|dark))?(?:-(?<interactive>ia))?$/,
// 	fn: ({ color = "foreground", interactive, mode }: OnSurfaceRuleGroups) => {
// 		assertColor(color);

// 		const hue = uc.color[color].h;

// 		const cssVars = mode === "dark" ? uc.emphasis.flatMap((emphasisStr) =>
// 			getDarkOnSurfaceFgCssVars(color, emphasisStr, interactive),
// 		) : uc.emphasis.flatMap((emphasisStr) =>
// 			getLightOnSurfaceFgCssVars(color, emphasisStr, interactive),
// 		);

// 		return {
// 			"--hue": hue,
// 			...cssVars,
// 		};
// 	},
// };

// export interface SurfaceActiveGroups {
// 	prop: UtilProp;
// }
// export const surfaceActiveRule = {
// 	re: /^surface-(?<prop>[a-z]+)-active$/,
// 	fn: ({ prop }: SurfaceActiveGroups): CSSValueInput => {
// 		const cssProp = getCssPropByUtilProp(prop);
// 		return {
// 			[cssProp]: `color-mix(in oklch, var(--${prop === "text" ? "fg-hc" : "bg"}-color), #000 var(--active-admix))`,
// 		};
// 	},
// };

// export const intentSurfaceHoverRule = {
// 	re: /^surface-(?<prop>bg)-hover$/,
// 	fn: ({ prop }: SurfaceHoverGroups): CSSValueInput => {
// 		const cssProp = getCssPropByUtilProp(prop);
// 		return {
// 			[cssProp]: `color-mix(in oklch, var(--${prop === "text" ? "fg-hc" : "bg"}-color), #fff var(--surface-hover-admix))`,
// 		};
// 	},
// };

// export const onIntentSurfaceHoverRule = {
// 	re: /^on-surface-(?<prop>[a-z]+)-hover$/,
// 	fn: ({ prop }: SurfaceHoverGroups): CSSValueInput => {
// 		const cssProp = getCssPropByUtilProp(prop);
// 		return {
// 			[cssProp]: `color-mix(in oklch, var(--fg-hc-color), #fff var(--on-surface-hover-admix))`,
// 		};
// 	},
// };

export const shadowRule = {
	re: /^shadow-(d|l|md|ml|ad|al)(?:-([a-z]+))?-(\d+)d$/,
	fn: (mode: string, color: string | undefined, value: string) => {
		const c = color ?? "background";
		if (!hasOwn(uc.color, c)) return;
		const hue = +(uc.color[c].c / 1000).toFixed(3);
		const v = +value;
		if (Number.isNaN(v)) return;
		const DESATURATION_K = 0.25;

		const chroma = (uc.color[c].c * DESATURATION_K) / 1000;
		const isDark = mode === "d" || mode === "sd";
		const isMirrored = mode === "md" || mode === "ml";
		const isAround = mode === "ad" || mode === "al";
		const displacement = isMirrored ? -1 : isAround ? 0 : 1;
		const size = calcSize(v);
		const displacementSize = displacement * size;
		return {
			"box-shadow": ` calc(var(--spacing-size) * ${displacementSize}rem) calc(var(--spacing-size) * ${displacementSize}rem) calc(var(--spacing-size) * ${2 * size}rem) calc(var(--spacing-size) * ${0.5 * size}rem) oklch(${isDark ? 0 : 0.4} ${chroma} ${hue} / 0.5)${isAround ? `, calc(var(--spacing-size) * ${displacementSize}rem) calc(var(--spacing-size) * ${displacementSize}rem) calc(var(--spacing-size) * ${2 * size}rem) calc(var(--spacing-size) * ${0.5 * size}rem) oklch(${isDark ? 0 : 0.4} ${chroma} ${hue} / 0.5)` : ""}`,
		};
	},
};

export const ringRule = {
	re: /^ring-(d|l)(?:-([a-z]+))?-(\d+)d$/,
	fn: (mode: string, color: string, value: string) => {
		if (!hasOwn(uc.color, color)) return;
		const lch = resolveThemeColor(color);
		if (!lch) return;
		const isDark = mode === "d";
		const bgColorName = isDark ? "foreground" : "background";
		const surfaceLightnessSpreadHalf = Math.round(
			uc.lightness.surface.spread / 2,
		);
		const bgLightness = isDark
			? uc.lightness.range.min + surfaceLightnessSpreadHalf
			: uc.lightness.range.max - surfaceLightnessSpreadHalf;
		const bgLch = resolveThemeColor(bgColorName, bgLightness);
		const candidateLch = resolveThemeColor(
			color,
			uc.lightness.range.max - uc.color[color].l,
		);
		if (!candidateLch) return;
		if (!bgLch) return;
		const isLightnessNeedToSwap = isTextNeedSwap(
			formatCSS(bgLch, { format: "oklch", precision: 3 }),
			formatCSS(lch, { format: "oklch", precision: 3 }),
			formatCSS(candidateLch, { format: "oklch", precision: 3 }),
		);
		const res = isLightnessNeedToSwap ? candidateLch : lch;
		return {
			"box-shadow": ` 0 0 0 calc(var(--spacing-size) * ${calcSize(value)}rem) oklch(${res.l} ${res.c} ${res.h} / ${isDark ? 0.4 : 0.3})`,
		};
	},
};
export const fillOpacityRule = {
	re: /^fill-opacity-(\d+)$/,
	fn: (value: string) => {
		return {
			"fill-opacity": `${value}%`,
		};
	},
};

export const outlineOffsetRule = {
	re: /^outline-offset-(\d+(?:\.5)?)d$/,
	fn: (value: string) => ({
		"outline-offset": `calc(var(--spacing-size) * ${calcSize(value)}rem)`,
	}),
};

export interface SurfaceBorderGroup {
	emphasis: string;
	mode: string;
}
export const surfaceBorderRule = {
	re: /^surface-border-(?<mode>d|l)-(?<emphasis>\d{1,3})$/,
	fn: (group: SurfaceBorderGroup) => {
		const opacity = +group.emphasis;
		const mode = group.mode;
		if (Number.isNaN(opacity)) return;
		if (opacity > 100) return;
		return {
			"border-color": `oklch(from oklch(${mode === "d" ? 1 : 0} 0 0) l c h / ${opacity}%)`,
		} as const;
	},
};
export interface IntentBorderGroup {
	emphasis: string;
}
export const emphasisBorderRule = {
	re: /^emphasis-border-(?<emphasis>\d{1,3})$/,
	fn: (group: IntentBorderGroup) => {
		const opacity = +group.emphasis;
		if (Number.isNaN(opacity)) return;
		if (opacity > 100) return;
		return {
			"border-color": `oklch(from currentColor l c h / ${opacity}%)`,
		} as const;
	},
};

export const borderWidthRule = {
	re: /^border(?:-(x|y|t|r|b|l|s|e)?)?-(\d+(?:\.5)?)d$/,
	fn: (side: string, value: string) => ({
		[`border${side ? `-${{ x: "inline", y: "block", t: "top", b: "bottom", l: "left", r: "right", s: "inline-start", e: "inline-end" }[side]}` : ""}-width`]: `calc(var(--spacing-size) * ${calcSize(value)}rem)`,
	}),
};

export const dropShadowRule = {
	re: /^drop-shadow-(d|l)(?:-([a-z]+))?-(\d+)d$/,
	fn: (mode: string, color: string | undefined, value: string) => {
		color = color ?? "foreground";
		if (!hasOwn(uc.color, color)) return;
		const hue = +(uc.color[color].h / 1000).toFixed(3);
		return {
			filter: ` drop-shadow(calc(var(--spacing-size) * ${calcSize(value)}rem) calc(var(--spacing-size) * ${calcSize(value)}rem) calc(var(--spacing-size) * ${+(calcSize(value) / 2).toFixed(2)}rem) oklch(${mode === "d" ? 0 : 0.25} 0.08 ${hue} / 0.5))`,
		};
	},
};

export const marginPaddingRule = {
	re: /^(m|p)(x|y|t|r|b|l|s|e)?-(\d+)d$/,
	fn: (prop: string, side: string, value: string) => ({
		[`${prop === "m" ? "margin" : "padding"}${side ? `-${{ x: "inline", y: "block", t: "top", b: "bottom", l: "left", r: "right", s: "inline-start", e: "inline-end" }[side]}` : ""}`]: `calc(var(--spacing-size) * ${calcSize(value)}rem)`,
	}),
};

export const gapRule = {
	re: /^gap(?:-(x|y))?-(\d+)d$/,
	fn: (side: string, value: string) => ({
		[`${side ? `${{ x: "column-", y: "row-" }[side]}` : ""}gap`]: `calc(var(--spacing-size) * ${calcSize(value)}rem)`,
	}),
};

export interface RoundedGroup {
	side?: string;
	value: string;
}
export const roundedRule = {
	re: /^rounded(?:-(?<side>s|e|t|r|b|l|bl|br|tl|tr|es|ee|se|ss))?-(?<value>\d+)d$/,
	fn: (group: RoundedGroup) => {
		const { side, value } = group;
		let s: string | readonly string[] = "border-radius";
		if (side && hasOwn(cssBorderRadiusSides, side)) {
			s = cssBorderRadiusSides[side];
		}
		const v = `calc(var(--spacing-size) * var(--radius) * ${calcSize(value)}rem)`;
		return Array.isArray(s)
			? Object.fromEntries(s.map((k) => [k, v]))
			: typeof s === "string"
				? { [s]: v }
				: undefined;
	},
};

export const positionRule = {
	re: /^(-)?(top|bottom|left|right)-(\d+)d$/,
	fn: (minus: string, side: string, value: string) => ({
		[side]: `calc(var(--spacing-size) * ${(minus ? -1 : 1) * calcSize(value)}rem)`,
	}),
};

export const sizeRule = {
	re: /^(w|h|min-w|min-h|max-w|max-h)-(\d+)d$/,
	fn: (param: string, value: string) => {
		const params = {
			w: "width",
			h: "height",
			"min-w": "min-width",
			"max-w": "max-width",
			"min-h": "min-height",
			"max-h": "max-height",
		};
		return {
			[params[param as keyof typeof params]]:
				`calc(var(--spacing-size) * ${calcSize(value)}rem)`,
		};
	},
};

export const typographyLeading = {
	re: /^typography_leading-(\d+(?:\.5)?)d$/,
	fn: (value: string) => ({
		"line-height": `${+(+value < 18 ? 2 ** (+value / 28) / 0.75 ** 0.75 : +value < 23 ? 2 ** ((17 - +value) * 0.125) * 1.6 : 1).toFixed(3)}`,
	}),
};

export const fontSizeRule = {
	re: /^fs-(\d+(?:\.5)?)d$/,
	fn: (value: string) => ({
		"font-size": `calc(var(--spacing-size) * var(--text-size) * ${calcSize(value)}rem)`,
	}),
};

export const fontWeightRule = {
	re: /^font-(\d+(?:\.5)?)d$/,
	fn: (value: string) => ({
		"font-weight": `${Math.round(Math.min(1000, 100 * calcSize(value)))}`,
	}),
};

export const strokeRule = {
	re: /^stroke-(\d+(?:\.5)?)d$/,
	fn: (value: string) => ({
		"stroke-width": `${calcSize(value)}`,
	}),
};

export const sizeSc = {
	re: /^size-(\d+)d$/,
	fn: (value: string) => `w-${value}d h-${value}d`,
};

export const typographySc = {
	re: /^text-(\d+(?:\.5)?)$/,
	fn: (value: string) => `fs-${value}d typography_leading-${value}d`,
};

export const bothThemeColorSc = {
	re: /^(bg|text|border|outline|fill)-([a-z]+)(?:-(\d{1,4}))?$/,
	fn: (prop: string, color: string, value?: string) => {
		if (!hasOwn(uc.color, color)) return;
		const lightLightness = +(value ?? 0);
		if (Number.isNaN(lightLightness)) return;
		const darkLightness = Math.round(
			lerp(
				uc.lightness.text.min / 1000,
				uc.lightness.text.max / 1000,
				(uc.lightness.range.max - lightLightness) / 1000,
			) * 1000,
		);
		const darkColor = color === "foreground" ? "background" : color;
		return `${prop}-${color}-${lightLightness}d dark:${prop}-${darkColor}-${darkLightness}d`;
	},
};

export const borderOutlineSc = {
	re: /^(border|outline)(?:-(x|y|t|r|b|l|s|e)?)?-([a-z]+)(?:\/(\d{1,3}))?$/,
	/**
	 *
	 * @param args - prop, side, color, opacity
	 * @returns could create ? string rules : undefined
	 */
	fn: (...args: (string | undefined)[]) => {
		const [prop, side, color, opacity] = args;
		if (!color) return;
		if (!hasOwn(uc.color, color)) return;
		const l = +uc.color[color].l;
		const isSwapped =
			l < uc.lightness.surface.step + uc.lightness.surface.interactiveDelta;
		const swappedLightness = uc.lightness.range.max - l;
		const borderSide = side ? `-${side}` : "";
		return `	${prop}${borderSide}-${color}-${l}d${opacity ? `/${opacity}` : ""}${isSwapped ? ` dark:${prop}${borderSide}-${color}-${swappedLightness}d${opacity ? `/${opacity}` : ""}` : ""}`;
	},
};

export const shadowLiftedSc = {
	re: /^shadow-lifted(?:-([a-z]+))?-(\d+)$/,
	fn: (color: string | undefined, value: string) => {
		color = color ? color : "foreground";
		if (!hasOwn(uc.color, color)) return;
		return `shadow-l-${color}-${+value * 2}d dark:shadow-d-${color}-${+value * 2}d`;
	},
};

export const ringSc = {
	re: /^ring-([a-z]+)-(\d+)$/,
	fn: (color: string, value: string) =>
		hasOwn(uc.color, color)
			? `ring-l-${color}-${value}d dark:ring-d-${color}-${value}d`
			: undefined,
};

export const dropShadowSc = {
	re: /^drop-shadow(?:-([a-z]+))?-(\d+)$/,
	fn: (color: string | undefined, value: string) => {
		color = color ? color : "foreground";
		if (!hasOwn(uc.color, color)) return;
		return `drop-shadow-l-${color}-${value}d dark:drop-shadow-d-${value}d`;
	},
};

// export interface IntentTextGroups {
// 	color: string;
// 	emphasis: string;
// 	mode?: string;
// 	interactive?: string;
// }

// export const getEmphasisIntentBgLightness = (
// 	color: Color,
// 	emphasis: Emphasis,
// ) => {
// 	if (!hasOwn(uc.color, color)) throw "no such color in theme";
// 	const boundedLightness = uc.intentColors.includes(color as IntentColor)
// 		? boundIntentLightness(uc.color[color].l)
// 		: boundSurfaceLightness(uc.color[color].l);

// 	const stepsNumber = emphases.length - 1;
// 	const idx = uc.emphasis.indexOf(emphasis);
// 	const boundStep = Math.round(
// 		(uc.lightness.intentColor.max - uc.lightness.intentColor.min) / 4,
// 	);
// 	const lightBound =
// 		uc.lightness.range.min + boundStep * stepsNumber - idx * boundStep;
// 	const darkBound =
// 		uc.lightness.range.max -
// 		boundStep * stepsNumber * 2.5 +
// 		idx * boundStep * 2.5;
// 	const lightLightness = Math.round(
// 		lerp(
// 			lightBound / 1000,
// 			uc.lightness.range.max / 1000,
// 			boundedLightness / 1000,
// 		) * 1000,
// 	);
// 	const mutedLightLightness = Math.round(
// 		lerp(
// 			uc.lightness.range.spread / 2000,
// 			(uc.lightness.range.max - uc.lightness.surface.interactiveDelta) / 1000,
// 			lightLightness / 1000,
// 		) * 1000,
// 	);
// 	const hEmphasisLightness = Math.round(
// 		lerp(
// 			uc.lightness.range.min / 1000,
// 			uc.lightness.range.max / 1000,
// 			boundedLightness / 1000,
// 		) * 1000,
// 	);
// 	const isBgLNeedToSwap =
// 		hEmphasisLightness <
// 		uc.lightness.intentColor.min + uc.lightness.surface.step;
// 	const darkBoundedLightness = isBgLNeedToSwap
// 		? uc.lightness.range.max - hEmphasisLightness
// 		: hEmphasisLightness;
// 	const darkLightness = Math.round(
// 		lerp(
// 			uc.lightness.range.min / 1000,
// 			darkBound / 1000,
// 			darkBoundedLightness / 1000,
// 		) * 1000,
// 	);
// 	const mutedDarkLightness = Math.round(
// 		lerp(
// 			(uc.lightness.range.min + uc.lightness.surface.interactiveDelta) / 1000,
// 			(uc.lightness.range.max - uc.lightness.surface.interactiveDelta) / 1000,
// 			darkLightness / 1000,
// 		) * 1000,
// 	);

// 	return {
// 		light: lightLightness,
// 		dark: darkLightness,
// 		mutedLight: mutedLightLightness,
// 		mutedDark: mutedDarkLightness,
// 	};
// };

// export const getEmphasisColorTextLightness = (
// 	bgLightness: number,
// 	color: Color,
// 	emphasis: Emphasis,
// ) => {
// 	const APCA_DELTA_BALANCE = 720;
// 	const edgeDelta =
// 		(1.5 * uc.lightness.surface.interactiveDelta * 1000) /
// 		uc.lightness.scale.spread;
// 	const currentEmphasis = Math.max(
// 		0,
// 		APCA_DELTA_BALANCE -
// 		edgeDelta * (emphases.length - 1) +
// 		edgeDelta * emphases.indexOf(emphasis),
// 	);
// 	const delta = Math.min(
// 		Math.round((currentEmphasis * 1000) / uc.lightness.scale.spread),
// 		1000,
// 	);

// 	const bgLch = resolveThemeColor(color, bgLightness);

// 	const surfaceAvgElevationDelta = lerp(
// 		uc.lightness.range.min / 1000,
// 		uc.lightness.scale.spread / 1000,
// 		uc.lightness.surface.step / 1000,
// 	);

// 	const plusLightness = Math.min(bgLightness + delta, uc.lightness.range.max);
// 	const plusLch = resolveThemeColor(color, plusLightness);
// 	const minusLightness = Math.max(bgLightness - delta, uc.lightness.range.min);
// 	const minusLch = resolveThemeColor(color, minusLightness);
// 	if (!bgLch || !plusLch || !minusLch) throw "can't resolve theme color";
// 	const CORRECTION_K = 1.8;
// 	bgLch.l += CORRECTION_K * surfaceAvgElevationDelta;
// 	const bgStr = formatCSS(bgLch, { format: "oklch", precision: 3 });
// 	const plusStr = formatCSS(plusLch, { format: "oklch", precision: 3 });
// 	const minusStr = formatCSS(minusLch, { format: "oklch", precision: 2 });

// 	const plusApca = Math.abs(apcaContrast(bgStr, plusStr));
// 	const minusApca = Math.abs(apcaContrast(bgStr, minusStr));
// 	return plusApca > minusApca ? plusLightness : minusLightness;
// };

// export const getEmphasisIntentBgChroma = (
// 	chromaPercent: number,
// 	color: Color,
// 	lightness: number,
// ) => {
// 	if (lightness > 1000 || lightness < 0)
// 		throw new Error(
// 			`lightness ${lightness} of ${color} color should be in 0-1000 range`,
// 		);
// 	if (!hasOwn(uc.color, color)) throw `no such color ${color} in theme`;
// 	const maxChroma = getOkLCHMaxChroma(
// 		{
// 			l: getCompressedPpmLightness(lightness) / 1000,
// 			c: 0,
// 			h: uc.color[color].h,
// 		},
// 		3,
// 	);
// 	const currentChroma = (maxChroma * chromaPercent) / 100;
// 	return Math.round((currentChroma * 100) / MAX_POSSIBLE_CHROMA);
// };

// export const emphasisChroma = Object.fromEntries(
// 	emphases.map((emphasis) => [emphasis, { light: Infinity, dark: Infinity }]),
// );

// export const intentColorsCtx = {
// 	bg: Object.fromEntries(
// 		allColors.map((color) => {
// 			return [
// 				color,
// 				Object.fromEntries(
// 					emphases
// 						.map((emphasis) => {
// 							const lightness = getEmphasisIntentBgLightness(color, emphasis);
// 							const highEmphasisChroma = uc.color[color].c;
// 							const chromaStep = highEmphasisChroma / emphases.length;
// 							const chromaPercent = Math.round(
// 								(highEmphasisChroma -
// 									chromaStep * (emphases.length - 1) +
// 									chromaStep * emphases.indexOf(emphasis)) /
// 								10,
// 							);
// 							const maxLightChroma = getEmphasisIntentBgChroma(
// 								100,
// 								color,
// 								lightness.light,
// 							);
// 							const maxDarkChroma = getEmphasisIntentBgChroma(
// 								100,
// 								color,
// 								lightness.dark,
// 							);
// 							emphasisChroma[emphasis].light = Math.min(
// 								emphasisChroma[emphasis].light,
// 								maxLightChroma,
// 							);
// 							emphasisChroma[emphasis].dark = Math.min(
// 								emphasisChroma[emphasis].dark,
// 								maxDarkChroma,
// 							);
// 							const chroma = {
// 								light: getEmphasisIntentBgChroma(
// 									chromaPercent,
// 									color,
// 									lightness.light,
// 								),
// 								dark: getEmphasisIntentBgChroma(
// 									chromaPercent,
// 									color,
// 									lightness.dark,
// 								),
// 							};
// 							return [emphasis, { lightness, chroma }] as const;
// 						})
// 						.map(([emphasis, { lightness }], idx, arr) => {
// 							const isLast = idx === arr.length - 1;
// 							const lightChroma = isLast
// 								? lightness.light
// 								: Math.round(
// 									(emphasisChroma[emphasis].light * uc.color[color].c) / 1000,
// 								);
// 							const darkChroma = isLast
// 								? lightness.dark
// 								: Math.round(
// 									(emphasisChroma[emphasis].dark * uc.color[color].c) / 1000,
// 								);
// 							return [
// 								emphasis,
// 								{ lightness, chroma: { light: lightChroma, dark: darkChroma } },
// 							];
// 						}),
// 				),
// 			];
// 		}),
// 	),
// 	fg: Object.fromEntries(
// 		allColors.map((color) => {
// 			return [
// 				color,
// 				Object.fromEntries(
// 					emphases.map((emphasis, idx) => {
// 						const bgLightness = getEmphasisIntentBgLightness(color, emphasis);
// 						const midTextLightness = {
// 							light: getEmphasisColorTextLightness(
// 								bgLightness.light,
// 								color,
// 								emphasis,
// 							),
// 							dark: getEmphasisColorTextLightness(
// 								bgLightness.dark,
// 								color,
// 								emphasis,
// 							),
// 						};
// 						const edgeTextLightness = {
// 							light: getEmphasisColorTextLightness(
// 								Math.min(
// 									bgLightness.light + uc.lightness.surface.interactiveDelta * 2,
// 									1000,
// 								),
// 								color,
// 								emphasis,
// 							),
// 							dark: getEmphasisColorTextLightness(
// 								Math.max(
// 									bgLightness.dark - uc.lightness.surface.interactiveDelta * 2,
// 									0,
// 								),
// 								color,
// 								emphasis,
// 							),
// 						};

// 						return [
// 							emphasis,
// 							{
// 								midLightness: midTextLightness,
// 								edgeLightness: edgeTextLightness,
// 								surfaceBorderEmphasis: 30 + (idx * 20) / (emphases.length - 1),
// 								intentBorderEmphasis: Math.round(
// 									45 + (idx * 15) / (emphases.length - 1),
// 								),
// 							},
// 						] as const;
// 					}),
// 				),
// 			];
// 		}),
// 	),
// };

// export interface IntentGroups {
// 	color: string;
// 	emphasis: string;
// 	muted?: string;
// 	ia?: string;
// }

// const getSurfaceCtx = (l: string) => {
// 	const level = +l;
// 	if (Number.isNaN(l))
// 		throw new Error("the level should be converted to a Number");
// 	const {
// 		surface: { step, quantity, spread },
// 		range: { max: maxRange, min: minRange },
// 	} = uc.lightness;
// 	const delta = step * Math.min(level, quantity);
// 	const lightBgLightness = maxRange - spread + delta;
// 	const darkBgLightness = minRange + delta;

// 	return {
// 		lightBgLightness,
// 		darkBgLightness,
// 		level,
// 	};
// };
// export interface SurfaceGroups {
// 	level: string;
// 	ia?: string;
// }
// export const experimentalSurfaceBgSc = {
// 	re: /^surface_bg-(?<level>\d)(?:-(?<ia>ia))?$/,
// 	fn: (groups: SurfaceGroups) => {
// 		const {
// 			darkBgLightness: darkLightness,
// 			level,
// 			lightBgLightness: lightLightness,
// 		} = getSurfaceCtx(groups.level);
// 		const rules = {
// 			bg: [`background-${lightLightness}d`],
// 			"dark:bg": [`foreground-${darkLightness}d`],
// 			"[--surface": [`level:${level}`, "]"],
// 		};
// 		return combineRules(rules);
// 	},
// };
// export const experimentalSurfaceBgHoverSc = {
// 	re: /^surface_bg_hover-(?<level>\d)(?:-(?<ia>ia))?$/,
// 	fn: ({ level, ia }: SurfaceGroups) => {
// 		const { darkBgLightness: darkLightness, lightBgLightness: lightLightness } =
// 			getSurfaceCtx(level);
// 		const rules = {
// 			"hover:bg": [
// 				ia &&
// 				`background-${lightLightness - uc.lightness.surface.interactiveDelta}d`,
// 			],
// 			"dark:hover:bg": [
// 				ia &&
// 				`foreground-${darkLightness + uc.lightness.surface.interactiveDelta}d`,
// 			],
// 		};
// 		return combineRules(rules);
// 	},
// };

// export const experimentalSurfaceSc = {
// 	re: /^surface-(?<level>\d)(?:-(?<ia>ia))?$/,
// 	fn: ({ level, ia }: SurfaceGroups) => {
// 		const r = [level, ia && "-ia"];
// 		const rules = {
// 			surface_bg: r,
// 			surface_bg_hover: r,
// 		};
// 		return combineRules(rules);
// 	},
// };

// export const surfaceSc = {
// 	re: /^surface(?:-(\d))?$/,
// 	fn: (level?: string) => {
// 		const l = level ? +level : 0;
// 		if (Number.isNaN(l)) return;
// 		const {
// 			surface: { step, quantity, spread },
// 			range: { max: maxRange, min: minRange },
// 		} = uc.lightness;
// 		const delta = step * Math.min(l, quantity);
// 		const lightLightness = maxRange - spread + delta;
// 		const darkLightness = minRange + delta;
// 		return `bg-background-${lightLightness}d text-foreground-${darkLightness}d dark:bg-foreground-${darkLightness}d dark:text-background-${lightLightness}d [--surface-level:${level ?? 0}]`;
// 	},
// };

export const themeColorsLch = allColors.map((v) => ({
	...resolveThemeColor(v),
	name: v,
}));
export const themeHueInverseColorsLch = allColors.map((v) => {
	const r = resolveThemeColor(v);
	if (!r) throw `no such intent color ${v} in user theme`;
	r.h = rotationCompensation(r.h + 180);
	const res = { ...r, name: v };
	return res;
});

export const shadowFocuses = Object.fromEntries(
	themeColorsLch.map((v) => [
		`focus-${v.name}`,
		[
			"0 0 calc(var(--spacing-size) * pow(2, 0.75) * 1rem) calc(var(--spacing-size) * 2rem) currentColor",
			`0 0 calc(var(--spacing-size) * pow(2, 0.75) * 1rem / 2) calc(var(--spacing-size) * 4rem) oklch(${v.l} ${v.c} ${v.h})`,
		],
	]),
);
export const shadowInverseFocuses = Object.fromEntries(
	themeHueInverseColorsLch.map((v) => [
		`focus-${v.name}-inverse`,
		[
			"0 0 calc(var(--spacing-size) * pow(2, 0.75) * 1rem) calc(var(--spacing-size) * 2rem) currentColor",
			`0 0 calc(var(--spacing-size) * pow(2, 0.75) * 1rem / 2) calc(var(--spacing-size) * 4rem) oklch(${v.l} ${v.c} ${v.h})`,
		],
	]),
);
