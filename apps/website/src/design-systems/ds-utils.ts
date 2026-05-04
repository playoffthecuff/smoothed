/** biome-ignore-all lint/suspicious/noExplicitAny: "lib" */
import {
	apcaContrast,
	type FormatCSSOptions,
	formatCSS,
	getOkLCHMaxChroma,
	hex2rgb,
	type LAB,
	type LCH,
	mix,
	parseCSS,
} from "colorizr";

const cssIndentSides = {
	x: "inline",
	y: "block",
	t: "top",
	b: "bottom",
	l: "left",
	r: "right",
	s: "inline-start",
	e: "inline-end",
} as const;

export type CssIndentSides = keyof typeof cssIndentSides;

export const cssBorderRadiusSides = {
	bl: "border-bottom-left-radius",
	br: "border-bottom-right-radius",
	tl: "border-top-left-radius",
	tr: "border-top-right-radius",
	es: "border-end-start-radius",
	ee: "border-end-end-radius",
	se: "border-start-end-radius",
	ss: "border-start-start-radius",
	s: ["border-start-start-radius", "border-end-start-radius"],
	e: ["border-start-end-radius", "border-end-end-radius"],
	t: ["border-top-left-radius", "border-top-right-radius"],
	r: ["border-top-right-radius", "border-bottom-right-radius"],
	b: ["border-bottom-right-radius", "border-bottom-left-radius"],
	l: ["border-top-left-radius", "border-bottom-left-radius"],
} as const;

export type BorderSideUtils = keyof typeof cssBorderRadiusSides;

export const getBorderSide = (maybeBorderSide: string, defaultValue: string) =>
	cssBorderRadiusSides[maybeBorderSide as keyof typeof cssBorderRadiusSides] ??
	defaultValue;

/**
 *
 * @description Type Guard
 *
 * @param key - object key
 * @param obj - object
 * @returns - does the obj have a key
 */
export function hasOwn<T extends object>(
	obj: T,
	key: PropertyKey,
): key is keyof T {
	return Object.hasOwn(obj, key);
}
/**
 *
 * @param side
 * @returns
 */
export const getCssSide = (side: string) =>
	hasOwn(cssIndentSides, side) ? `-${cssIndentSides[side]}` : undefined;

interface UtilProps {
	bg: string;
	text: string;
	border: string;
	outline: string;
	fill: string;
	stroke: string;
}
export type UtilProp = keyof UtilProps;
const cssProps: UtilProp[] = [
	"bg",
	"text",
	"border",
	"outline",
	"fill",
	"stroke",
];
export function assertCssProp(prop: string): asserts prop is UtilProp {
	assert(
		cssProps.includes(prop as UtilProp),
		`prop ${prop} was not declared as css props list item`,
	);
}

export const getCssPropByUtilProp = (prop: UtilProp, side?: CssIndentSides) =>
	({
		bg: "background-color",
		text: "color",
		border: `border${getCssSide(side ?? "") ?? ""}-color`,
		outline: "outline-color",
		fill: "fill",
		stroke: "stroke",
	})[prop];

/**
 *
 * @param lch - params of modified color
 * @param amount - amount of modifying
 * @returns modified lch with clipped chroma
 */
export const modifyLightnessInLch = (lch: LCH, amount: number) => {
	const r = { ...lch, l: clamp(lch.l + amount, 0, 1) };
	const maxChroma = getOkLCHMaxChroma(r, 3);
	return { ...r, c: Math.min(lch.c, maxChroma) };
};

export const clamp = (x: number, min = 0, max = 1) =>
	Math.min(max, Math.max(min, x));

export const lerp = (min: number, max: number, x: number) =>
	min + (max - min) * x;

export const smoothstep = (a: number, b: number, x: number) => {
	const t = clamp((x - a) / (b - a));
	return t * t * (3 - 2 * t);
};

interface DeriveStateOptions {
	darkHover: number;
	lightHover: number;
	darkActive: number;
	lightActive: number;
	smoothMin: number;
	smoothMax: number;
	chromaDarkHover: number;
	chromaLightHover: number;
	chromaDarkActive: number;
	chromaLightActive: number;
}

/**
 * count oklch params for hover and active state
 * @param param0 - LCH
 * @param param0.l - oklch lightness
 * @param param0.c - oklch chroma
 * @param param0.h - oklch hue
 * @param opts.darkHover - (default 0.18) как сильно светлеет тёмный цвет
 * @param opts.lightHover - (default 0.05) как сильно светлеет светлый цвет
 * @param opts.darkActive - (default 0.2) как сильно темнеет тёмный цвет
 * @param opts.liteActive - (default 0.05) как сильно темнеет светлый цвет
 * @param opts.smoothMin - (default 0.0) для smoothstep
 * @param opts.smoothMax - (default 1.0)
 * @param opts.chromaDarkHover - (default 0.55) множитель chroma для темных цветов
 * @param opts.chromaLightHover - (default 0.85) множитель chroma для светлых цветов
 * @param opts.chromaDarkActive - (default 0.55) множитель chroma для темных цветов
 * @param opts.chromaLightActive - (default 0.85) множитель chroma для светлых цветов
 * @returns hover LCH and active LCH
 */
export function deriveState(
	{ l, c, h }: { l: number; c: number; h: number },
	opts: Partial<DeriveStateOptions> = {},
) {
	const {
		darkHover = 0.18,
		lightHover = 0.05,
		darkActive = 0.2,
		lightActive = 0.05,
		smoothMin = 0.0,
		smoothMax = 1.0,
		chromaDarkHover = 0.55,
		chromaLightHover = 0.85,
		chromaDarkActive = 0.55,
		chromaLightActive = 0.85,
	} = opts;

	const w = smoothstep(smoothMin, smoothMax, l);
	const kL_hover = lerp(darkHover, lightHover, w);
	const L_hover = l + (1 - l) * kL_hover;

	const kC_hover = lerp(chromaDarkHover, chromaLightHover, w);
	const C_hover = c * kC_hover;

	const kL_active = lerp(darkActive, lightActive, w);
	const L_active = l - l * kL_active;

	const kC_active = lerp(chromaDarkActive, chromaLightActive, w);
	const C_active = c * kC_active;

	return {
		hover: { l: L_hover, c: C_hover, h },
		active: { l: L_active, c: C_active, h },
	};
}

export const computeOklch = (l: number, h: number, c: number) =>
	formatCSS(
		{ l, c: getOkLCHMaxChroma({ c: 0, h, l }) * c, h },
		{ format: "oklch", precision: 4 },
	);

export function computeRelativeChromaOklch(LCH: LCH, format?: "LCH"): LCH;
export function computeRelativeChromaOklch(LCH: LCH, format?: "string"): string;
/**
 *
 * @param param0 - LCH with relative chroma in ppm
 * @param format - output format
 * @returns - LCH with computed chroma in the specified format
 */
export function computeRelativeChromaOklch(
	{ alpha, c, h, l }: LCH,
	format: "string" | "LCH" = "string",
) {
	const lch: LCH = { l, c: getOkLCHMaxChroma({ c: 0, h, l }) * c, h };
	if (alpha) lch.alpha = alpha;
	lch.c = c * lch.c;
	const formatted = formatCSS(lch, { format: "oklch", precision: 3, alpha });
	return format === "LCH" ? parseCSS(formatted, "oklch") : formatted;
}

export const rotationCompensation = (H = 0) => ((H % 360) + 360) % 360;

export const normalizePpmColor = (lch: LCH): LCH => ({
	...lch,
	l: lch.l / 1000,
	c: lch.c / 1000,
});

export const computeCompressedLightness = (
	l: number,
	min: number,
	fullRange: number,
	compressedRange: number,
) => min + (l * compressedRange) / fullRange;

export const combineRules = (
	rules: Record<string, (string | number | undefined | false)[]>,
) =>
	Object.entries(rules)
		.filter(([_, v]) => !!v[0])
		.map(([k, v]) => `${k}-${v.filter(Boolean).join("")}`)
		.join(" ");

// =============================================================

const oklabColorsDiff = (c1: LAB, c2: LAB) => {
	const dL = Math.abs(c1.l - c2.l);
	const dC = Math.hypot(c1.a - c2.a, c1.b - c2.b);
	return Math.sqrt(dL ** 2 + dC ** 2);
};

const mainTRC = 2.4;
const normBG = 0.56;
const normTXT = 0.57;
const revBG = 0.65;
const revTXT = 0.62;
const sRco = 0.2126729;
const sGco = 0.7151522;
const sBco = 0.072175;
const blkThreshold = 0.022;
const blkClamp = Math.SQRT2;
const scaleBoW = 1.14;
const scaleWoB = 1.14;
const loBoWOffset = 0.027;
const loWoBOffset = 0.027;
const softClamp = (Y: number) =>
	Y > blkThreshold ? Y : Y + (blkThreshold - Y) ** blkClamp;
const sRGBtoY = (r: number, g: number, b: number) =>
	sRco * (r / 255) ** mainTRC +
	sGco * (g / 255) ** mainTRC +
	sBco * (b / 255) ** mainTRC;

const noClipApcaContrast = (background: string, foreground: string) => {
	const bg = hex2rgb(parseCSS(background, "hex"));
	const fg = hex2rgb(parseCSS(foreground, "hex"));
	const txtY = softClamp(sRGBtoY(fg.r, fg.g, fg.b));
	const bgY = softClamp(sRGBtoY(bg.r, bg.g, bg.b));
	const SAPC =
		bgY > txtY
			? (bgY ** normBG - txtY ** normTXT) * scaleBoW
			: (bgY ** revBG - txtY ** revTXT) * scaleWoB;
	const Lc = SAPC > 0 ? (SAPC - loBoWOffset) * 100 : (SAPC + loWoBOffset) * 100;
	return Lc;
};

export const smartContrast = (bg: string, fg: string) => {
	const apca = noClipApcaContrast(bg, fg);
	const bgOklab = parseCSS(bg, "oklab");
	const fgOklab = parseCSS(fg, "oklab");
	const diff = oklabColorsDiff(bgOklab, fgOklab);
	return Math.round(apca * diff ** 2 * 1000) / 1000;
};

/**
 *
 * @description - create typed (keys as elements of tuple) variant object
 */
export const createVariantFromTuple = <T extends readonly string[]>(
	tuple: T,
	mapFn: (key: T[number]) => any,
) => Object.fromEntries(tuple.map(mapFn)) as Record<T[number], string | null>;

interface LightenDarkenOptions {
	darkLightness: number;
	lightLightness: number;
	smoothMin: number;
	smoothMax: number;
	darkChroma: number;
	lightChroma: number;
}

/**
 * emulates shading by changing LCH params
 * @param param0 - LCH
 * @param param0.l - oklch lightness
 * @param param0.c - oklch chroma
 * @param param0.h - oklch hue
 * @param opts.darkLightness - (default 0.2) как сильно темнеет тёмный цвет
 * @param opts.liteLightness - (default 0.05) как сильно темнеет светлый цвет
 * @param opts.smoothMin - (default 0.0) для smoothstep
 * @param opts.smoothMax - (default 1.0)
 * @param opts.darkChroma - (default 0.55) множитель chroma для темных цветов
 * @param opts.lightChroma - (default 0.85) множитель chroma для светлых цветов
 * @returns hover LCH and active LCH
 */
export function skewDarken(
	{ l, c, h }: { l: number; c: number; h: number },
	amount: number,
	opts: Partial<LightenDarkenOptions> = {},
) {
	const {
		darkLightness = 0.25,
		lightLightness = 0.2,
		smoothMin = 0.2,
		smoothMax = 0.8,
		darkChroma = 0.6,
		lightChroma = 0.4,
	} = opts;
	const w = smoothstep(smoothMin, smoothMax, l);
	const kL = lerp(darkLightness * amount, lightLightness * amount, w);
	const L = +(l - l * kL).toFixed(3);
	const kC = lerp(1 - amount * darkChroma, 1 - amount * lightChroma, w);
	const C = +(c * kC).toFixed(3);
	return { l: L, c: C, h };
}

/**
 * emulates lighting by changing LCH params
 * @param param0 - LCH
 * @param param0.l - oklch lightness
 * @param param0.c - oklch chroma
 * @param param0.h - oklch hue
 * @param opts.darkLightness - (default 0.3) как сильно светлеет тёмный цвет
 * @param opts.liteLightness - (default 0.8) как сильно светлеет светлый цвет
 * @param opts.smoothMin - (default 0.4) для smoothstep
 * @param opts.smoothMax - (default 1.0)
 * @param opts.darkChroma - (default 1) как сильно ослабляется насыщенность тёмных цветов
 * @param opts.lightChroma - (default 1) как сильно ослабляется насыщенность светлых цветов
 * @returns hover LCH and active LCH
 */
export function skewLighten(
	{ l, c, h }: { l: number; c: number; h: number },
	amount: number,
	opts: Partial<LightenDarkenOptions> = {},
) {
	const {
		darkLightness = 0.225,
		lightLightness = 0.45,
		smoothMin = 0.4,
		smoothMax = 1,
		darkChroma = 0.4,
		lightChroma = 0.4,
	} = opts;
	const w = smoothstep(smoothMin, smoothMax, l);
	const kL = lerp(darkLightness * amount, lightLightness * amount, w);
	const L = +(l + (1 - l) * kL).toFixed(3);
	const kC = lerp(1 - amount * darkChroma, 1 - amount * lightChroma, w);
	const C = +(c * kC).toFixed(3);
	return { l: L, c: C, h };
}

/**
 *
 * @param x - input
 * @param p - decimal places
 * @returns rounded number
 */
export const round = (x: number, p: number) =>
	Math.round(x * 10 ** p) / 10 ** p;

/**
 *
 * @param x - input
 * @returns rounded number to 3 decimal places
 */
export const round3 = (x: number) => round(x, 3);

// export function computeFgLightnessForApcaContrast(
//   bgLch: LCH,
//   fgLch: LCH,
//   targetContrast: number,
//   epsilon = 0.1,
//   maxIter = 20
// ) {
// 	const formatSettings: FormatCSSOptions = {format: "oklch", precision: 3};
//   const bgCss = formatCSS(bgLch, formatSettings)

//   const fg = {
//     l: fgLch.l,
//     c: fgLch.c * 0.5, // downgrade to avoid recalculation
//     h: fgLch.h
//   }

//   const contrastAt = (l: number) => {
//     fg.l = l
//     return Math.abs(apcaContrast(bgCss, formatCSS(fg, formatSettings)))
//   }

//   let lo: number, hi: number

//   if (fg.l < bgLch.l) {
//     lo = 0
//     hi = bgLch.l
//   } else {
//     lo = bgLch.l
//     hi = 1
//   }

//   let bestL = fg.l
//   let bestDiff = Infinity

//   for (let i = 0; i < maxIter; i++) {
//     const mid = (lo + hi) / 2
//     const contrast = contrastAt(mid)

//     const diff = Math.abs(contrast - targetContrast)

//     if (diff < bestDiff) {
//       bestDiff = diff
//       bestL = mid
//     }

//     if (diff <= epsilon) break

//     if (contrast > targetContrast) {
//       if (mid < bgLch.l) lo = mid
//       else hi = mid
//     } else {
//       if (mid < bgLch.l) hi = mid
//       else lo = mid
//     }
//   }

//   fg.l = bestL
//   return fg
// }

export function computeFgLightnessForApcaContrast(
	bgLch: LCH,
	fgLch: LCH,
	targetContrast: number,
	epsilon = 0.1,
	maxIter = 20,
) {
	const formatSettings: FormatCSSOptions = { format: "oklch", precision: 3 };
	const bgCss = formatCSS(bgLch, formatSettings);

	const fg: LCH = { ...fgLch };

	// сохраняем относительную насыщенность
	const maxStartChroma = getOkLCHMaxChroma(fgLch);
	const chromaRatio = maxStartChroma === 0 ? 0 : fgLch.c / maxStartChroma;

	const contrastAt = (l: number) => {
		fg.l = l;

		const maxC = getOkLCHMaxChroma({ l, c: 0, h: fg.h });
		fg.c = chromaRatio * maxC;

		return Math.abs(apcaContrast(bgCss, formatCSS(fg, formatSettings)));
	};

	let lo: number, hi: number;

	if (fg.l < bgLch.l) {
		lo = 0;
		hi = bgLch.l;
	} else {
		lo = bgLch.l;
		hi = 1;
	}

	let bestL = fg.l;
	let bestDiff = Infinity;

	for (let i = 0; i < maxIter; i++) {
		const mid = (lo + hi) / 2;
		const contrast = contrastAt(mid);

		const diff = Math.abs(contrast - targetContrast);

		if (diff < bestDiff) {
			bestDiff = diff;
			bestL = mid;
		}

		if (diff <= epsilon) break;

		if (contrast > targetContrast) {
			if (mid < bgLch.l) lo = mid;
			else hi = mid;
		} else {
			if (mid < bgLch.l) hi = mid;
			else lo = mid;
		}
	}

	// финальное восстановление chroma
	const maxC = getOkLCHMaxChroma({ l: bestL, c: 0, h: fg.h });
	fg.l = bestL;
	fg.c = chromaRatio * maxC;

	return fg;
}

export function computeOpacityForApcaContrast(
	bgLch: LCH,
	fgLch: LCH,
	targetContrast: number,
	{
		epsilon = 0.1,
		maxIter = 20,
		precision = 3,
	}: {
		epsilon?: number;
		maxIter?: number;
		precision?: number;
	},
) {
	const formatSettings: FormatCSSOptions = { format: "oklch", precision: 3 };
	const bgCss = formatCSS(bgLch, formatSettings);

	const fg: LCH = { ...fgLch };

	const contrastAtOpacity = (o: number) =>
		Math.abs(
			apcaContrast(
				bgCss,
				mix(bgCss, formatCSS(fg, formatSettings), o, "oklch"),
			),
		);

	let lo = 0,
		hi = 1;

	let bestO = 1;
	let bestDiff = Infinity;

	for (let i = 0; i < maxIter; i++) {
		const mid = (lo + hi) / 2;
		const contrast = contrastAtOpacity(mid);

		const diff = Math.abs(contrast - targetContrast);

		if (diff <= bestDiff) {
			bestDiff = diff;
			bestO = mid;
		}

		if (diff <= epsilon) break;

		if (contrast > targetContrast) {
			hi = mid;
		} else {
			lo = mid;
		}
	}

	return round(bestO, precision);
}

interface Point {
	x: number;
	y: number;
}

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
	const t2 = t * t;
	const t3 = t2 * t;

	return (
		0.5 *
		(2 * p1 +
			(-p0 + p2) * t +
			(2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
			(-p0 + 3 * p1 - 3 * p2 + p3) * t3)
	);
}

export function catmullSplineThrough3Points(
	count: number,
	p0: number,
	p1: number,
	p2: number,
): Point[] {
	const pts: Point[] = [];

	const step = 1 / (count - 1);

	for (let i = 0; i < count; i++) {
		const x = i * step;

		let y: number;

		if (x < 0.5) {
			const t = x / 0.5;
			y = catmull(p0, p0, p1, p2, t);
		} else {
			const t = (x - 0.5) / 0.5;
			y = catmull(p0, p1, p2, p2, t);
		}

		pts.push({ x, y });
	}

	return pts;
}

class AssertionError extends Error {
	constructor(message?: string) {
		super();
		this.name = "AssertionError";
		if (message) this.message = message;
	}
}

export function assert(condition: any, msg?: string) {
	if (!condition) throw new AssertionError(msg);
}

export const getLinearEqParamK = (p1: Point, p2: Point) =>
	(p1.y - p2.y) / (p1.x - p2.x);

export const getLinearEqParamB = (p1: Point, p2: Point) =>
	p1.y - getLinearEqParamK(p1, p2) * p1.x;

export const getLinearEqParams = (p1: Point, p2: Point) => ({
	k: getLinearEqParamK(p1, p2),
	b: getLinearEqParamB(p1, p2),
});

export const getLinearEqOrdinate = (
	{ k, b }: { k: number; b: number },
	x: number,
) => k * x + b;
