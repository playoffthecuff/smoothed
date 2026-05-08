import { apcaContrast, formatCSS, getOkLCHMaxChroma, type LCH } from "colorizr";
import {
	clamp,
	computeOpacityForApcaContrast,
	getLinearEqOrdinate,
	getLinearEqParams,
	lerp,
	round3,
} from "../../ds-utils";
import type { Color, Emphasis, ThemeHue } from "../options";
import type { SurfaceParams, SurfaceParamsHandler } from "../types";

const lightThemeFallbackColor: Color = "foreground";
const darkThemeFallbackColor: Color = "background";

export const getThemeColor = (p: SurfaceParams): Exclude<Color, "default"> => {
	if (p.color === undefined || p.color === "default") {
		return p.mode === "dark" ? darkThemeFallbackColor : lightThemeFallbackColor;
	}
	if (p.color === "foreground") {
		return p.mode === "dark" ? darkThemeFallbackColor : lightThemeFallbackColor;
	}
	if (p.color === "background") {
		return p.mode === "dark" ? lightThemeFallbackColor : darkThemeFallbackColor;
	}
	return p.color;
};

export const getLightFallbackLightness: SurfaceParamsHandler = ({
	opts,
	isInteractive,
}) =>
	opts.lightness.scale.min +
	opts.lightness.surface.spread +
	opts.lightness.surface.step +
	(isInteractive ? opts.lightness.surface.interactiveDelta : 0);

export const getDarkFallbackLightness: SurfaceParamsHandler = ({
	opts,
	isInteractive,
}) =>
	opts.lightness.scale.max -
	opts.lightness.surface.spread -
	opts.lightness.surface.step -
	(isInteractive ? opts.lightness.surface.interactiveDelta : 0);

export const getThemeColorLightness: SurfaceParamsHandler = (p) =>
	p.color && p.color !== "default"
		? p.opts.color[p.color].l
		: p.mode === "dark"
			? getDarkFallbackLightness(p)
			: getLightFallbackLightness(p);

export const getThemeColorChroma: SurfaceParamsHandler = (p) =>
	getOkLCHMaxChroma({
		l: getThemeColorLightness(p),
		c: 0,
		h: p.opts.color[
			p.color === undefined || p.color === "default"
				? p.mode === "dark"
					? darkThemeFallbackColor
					: lightThemeFallbackColor
				: p.color
		].h.mid,
	}) *
	p.opts.color[
		p.color === undefined || p.color === "default"
			? p.mode === "dark"
				? darkThemeFallbackColor
				: lightThemeFallbackColor
			: p.color
	].c;

export const getThemeColorHue = (p: SurfaceParams): ThemeHue =>
	p.color && p.color !== "default"
		? p.opts.color[p.color].h
		: p.opts.color[
				p.mode === "dark" ? darkThemeFallbackColor : lightThemeFallbackColor
			].h;

export const getEmphasisNumber: SurfaceParamsHandler = ({
	opts,
	emphasisStr = opts.emphasis[0],
}) => round3(opts.emphasis.indexOf(emphasisStr) / (opts.emphasis.length - 1));

export const getInteractiveDelta: SurfaceParamsHandler = ({
	opts,
	isInteractive,
}) => (isInteractive ? opts.lightness.surface.interactiveDelta : 0);

export const getInterpolatedLightness =
	(isIncreasing = true) =>
	(p: SurfaceParams) =>
		getLinearEqOrdinate(
			getLinearEqParams(
				{ x: p.opts.lightness.semanticColor.min, y: +!isIncreasing },
				{ x: p.opts.lightness.semanticColor.max, y: +!!isIncreasing },
			),
			clamp(
				getThemeColorLightness(p),
				p.opts.lightness.semanticColor.min,
				p.opts.lightness.semanticColor.max,
			),
		);

export const getBgLightnessTopBound: SurfaceParamsHandler = (p) =>
	p.opts.lightness.scale.max -
	p.opts.lightness.semanticColor.minDiff[p.mode === "dark" ? "dark" : "light"] -
	p.opts.lightness.surface.spread -
	getInteractiveDelta(p);

export const getLightSurfaceBgLightness: SurfaceParamsHandler = (
	p: SurfaceParams,
) =>
	round3(
		getBgLightnessTopBound(p) -
			getInterpolatedLightness(false)(p) *
				p.opts.lightness.surface.interactiveDelta *
				2 -
			(getBgLightnessTopBound(p) -
				getInterpolatedLightness(false)(p) *
					p.opts.lightness.surface.interactiveDelta *
					2 -
				getThemeColorLightness(p)) *
				getEmphasisNumber(p),
	);

export const getFgLightnessBottomBound: SurfaceParamsHandler = (p) =>
	p.opts.lightness.scale.min +
	p.opts.lightness.semanticColor.minDiff[p.mode === "dark" ? "dark" : "light"] +
	getInteractiveDelta(p);

export const getLightIntentFgLightness: SurfaceParamsHandler = (p) =>
	round3(
		getFgLightnessBottomBound(p) +
			getInterpolatedLightness()(p) *
				p.opts.lightness.surface.interactiveDelta +
			(p.opts.lightness.scale.mid -
				getFgLightnessBottomBound(p) -
				p.opts.lightness.surface.interactiveDelta) *
				(1 - getEmphasisNumber(p)),
	);

export const getFgLightnessTopBound: SurfaceParamsHandler = (p) =>
	p.opts.lightness.scale.max -
	p.opts.lightness.semanticColor.minDiff[p.mode === "dark" ? "dark" : "light"] -
	getInteractiveDelta(p) -
	p.opts.lightness.surface.spread;

export const getDarkIntentFgLightness: SurfaceParamsHandler = (p) =>
	round3(
		getFgLightnessTopBound(p) -
			getInterpolatedLightness(false)(p) *
				p.opts.lightness.surface.interactiveDelta -
			(getFgLightnessTopBound(p) -
				p.opts.lightness.surface.interactiveDelta -
				p.opts.lightness.scale.mid) *
				(1 - getEmphasisNumber(p)),
	);

export const getBgLightnessBottomBound: SurfaceParamsHandler = (p) =>
	p.opts.lightness.scale.min +
	p.opts.lightness.semanticColor.minDiff[p.mode === "dark" ? "dark" : "light"] +
	getInteractiveDelta(p);

export const getDarkSurfaceBgLightness: SurfaceParamsHandler = (p) =>
	round3(
		getBgLightnessBottomBound(p) +
			getInterpolatedLightness(p.color !== "background")(p) *
				p.opts.lightness.surface.interactiveDelta *
				1.5 +
			((p.color === "background"
				? p.opts.lightness.scale.min + getInteractiveDelta(p)
				: getThemeColorLightness(p)) -
				(getBgLightnessBottomBound(p) +
					getInterpolatedLightness(p.color !== "background")(p) *
						p.opts.lightness.surface.interactiveDelta *
						1.5)) *
				getEmphasisNumber(p),
	);

export const getSurfaceBgLightness: SurfaceParamsHandler = (p) =>
	p.mode === "dark"
		? getDarkSurfaceBgLightness(p)
		: getLightSurfaceBgLightness(p);
// export const getSurfaceBgLightness: SurfaceParamsHandler = (p) =>
// 	round3(
// 		getBgLightnessTopBound(p) -
// 			getInterpolatedLightness(false)(p) *
// 				p.opts.lightness.surface.interactiveDelta *
// 				2 -
// 			(getBgLightnessTopBound(p) -
// 				getInterpolatedLightness(false)(p) *
// 					p.opts.lightness.surface.interactiveDelta *
// 					2 -
// 				getThemeColorLightness(p)) *
// 				getEmphasisNumber(p),
// 	);

export const getBgMinChroma: SurfaceParamsHandler = (p) =>
	Math.min(
		...p.opts.emphasis.map(
			(_, i) =>
				getOkLCHMaxChroma(
					{
						l: getSurfaceBgLightness(p) + i * p.opts.lightness.surface.step,
						c: 0,
						h: getThemeColorHue(p).mid,
					},
					3,
				) *
				p.opts.color[
					p.color === undefined || p.color === "default"
						? p.mode === "dark"
							? darkThemeFallbackColor
							: lightThemeFallbackColor
						: p.color
				].c,
		),
	);

export const getThemeColorMaxChromaByLightness =
	(lightness: number) => (p: SurfaceParams) =>
		p.opts.allColors.reduce(
			(a, v) =>
				Math.max(
					getOkLCHMaxChroma(
						{ ...getThemeColorLch({ ...p, color: v }), l: lightness },
						3,
					) * p.opts.color[v].c,
					a,
				),
			0,
		);

export const getFgMinChroma: SurfaceParamsHandler = (p) =>
	Math.min(
		...p.opts.emphasis.map(
			(_, i) =>
				getOkLCHMaxChroma(
					{
						l:
							(p.mode === "dark"
								? getDarkIntentFgLightness(p)
								: getLightIntentFgLightness(p)) +
							i * p.opts.lightness.surface.step,
						c: 0,
						h: getThemeColorHue(p).mid,
					},
					3,
				) *
				p.opts.color[
					p.color === undefined || p.color === "default"
						? p.mode === "dark"
							? darkThemeFallbackColor
							: lightThemeFallbackColor
						: p.color
				].c,
		),
	);

export const getLowestChroma =
	(p: SurfaceParams) => (fn: SurfaceParamsHandler) =>
		Math.min(...p.opts.intentColors.map((v) => fn({ ...p, color: v })));

export const getChroma: SurfaceParamsHandler = (p) =>
	round3(
		Math.min(
			getThemeColorChroma(p),
			lerp(
				getLowestChroma({
					...p,
					emphasisStr: p.opts.emphasis.at(0) as Emphasis,
				})(getThemeColorChroma),
				getThemeColorChroma({
					...p,
					emphasisStr: p.opts.emphasis.at(-1) as Emphasis,
				}),
				getEmphasisNumber(p),
			),
		),
	);

export const getChromaByLightness = (lightness: number) => (p: SurfaceParams) =>
	round3(
		getOkLCHMaxChroma({
			l: lightness,
			c: 0,
			h: p.opts.color[
				p.color === undefined || p.color === "default"
					? p.mode === "dark"
						? darkThemeFallbackColor
						: lightThemeFallbackColor
					: p.color
			].h.mid,
		}) *
			p.opts.color[
				p.color === undefined || p.color === "default"
					? lightThemeFallbackColor
					: p.color
			].c,
	);

export const getThemeColorLch = (p: SurfaceParams): LCH => ({
	l: getSurfaceBgLightness(p),
	c: getChroma(p),
	h: getThemeColorHue(p).mid,
});

export const getThemeColorString = (p: SurfaceParams): string =>
	formatCSS(getThemeColorLch(p), { format: "oklch", precision: 3 });

export const getFgOnIntentSurfaceLightness =
	(bgParams: SurfaceParams) => (fgParams: SurfaceParams) =>
		Math.abs(
			apcaContrast(
				getThemeColorString(bgParams),
				`oklch(1 0 ${getThemeColorHue(fgParams).mid})`,
			),
		) >
		Math.abs(
			apcaContrast(
				getThemeColorString(bgParams),
				`oklch(0 0 ${getThemeColorHue(fgParams).mid})`,
			),
		)
			? 1
			: 0;

export const getIntentFgLightness: SurfaceParamsHandler = (p) =>
	round3(
		p.mode === "dark"
			? getFgLightnessTopBound(p) -
					getInterpolatedLightness(false)(p) *
						p.opts.lightness.surface.interactiveDelta -
					(getFgLightnessTopBound(p) -
						p.opts.lightness.surface.interactiveDelta -
						p.opts.lightness.scale.mid) *
						(1 - getEmphasisNumber(p))
			: getFgLightnessBottomBound(p) +
					getInterpolatedLightness()(p) *
						p.opts.lightness.surface.interactiveDelta +
					(p.opts.lightness.scale.mid -
						getFgLightnessBottomBound(p) -
						p.opts.lightness.surface.interactiveDelta) *
						(1 - getEmphasisNumber(p)),
	);

export const getSurfaceFgLightness =
	(bgParams: SurfaceParams) => (fgParams: SurfaceParams) =>
		getFgOnIntentSurfaceLightness(bgParams)(fgParams);

export const getSurfaceFgOpacity =
	(bgParams: SurfaceParams) => (fgParams: SurfaceParams) =>
		computeOpacityForApcaContrast(
			getThemeColorLch(bgParams),
			{
				l: getSurfaceFgLightness(bgParams)(fgParams),
				c: 0,
				h: getThemeColorHue(fgParams).mid,
			},
			(bgParams.color === "background" ? 90 : 75) -
				(1 - getEmphasisNumber(fgParams)) * 20,
			{},
		);

export const getBorderDeltaLightness: SurfaceParamsHandler = (p) =>
	round3(
		(p.mode === "dark"
			? 1 /
				(3 *
					p.opts.color[
						p.color === undefined || p.color === "default"
							? darkThemeFallbackColor
							: p.color
					].l)
			: -1) * getLightFallbackLightness(p),
	);
