import type { Theme } from "@unocss/preset-wind4";
import { type Preset, presetWind4 } from "unocss";
import {
	getRippleAnimationShortcut,
	getRippleColorKeyFrames,
	getRippleScaleKeyFrames,
	getShimmerKeyFrames,
	getShimmerRules,
	getTextShimmerRules,
} from "./animation/animation";
import { getColorRules } from "./color/color";
import { getGeometryRules } from "./geometry/geometry";
import { type Options, options } from "./options";
import {
	getFocusShadows,
	getShadowShortcuts,
	getShadowsRules,
} from "./shadows/shadows";
import { getSurfaceRules, getSurfaceShortcuts } from "./surface/surface";
import {
	getTypographyRules,
	getTypographyShortcuts,
} from "./typography/typography";

const material = (opts?: Options): Preset => {
	opts ??= options;
	return {
		name: "material",
		presets: [
			presetWind4({
				dark: "class",
			}),
		],
		rules: [
			...getSurfaceRules(opts),
			...getTypographyRules(opts),
			...getGeometryRules(opts),
			...getShadowsRules(opts),
			...getColorRules(opts),
			getShimmerRules(),
			getTextShimmerRules(),
		],
		shortcuts: [
			getRippleAnimationShortcut(),
			...getTypographyShortcuts(opts),
			...getShadowShortcuts(),
			...getSurfaceShortcuts(opts),
		],
		extendTheme: (theme: Theme) => ({
			...theme,
			animation: {
				...theme.animation,
				keyframes: {
					...theme.animation?.keyframes,
					...getRippleColorKeyFrames(),
					...getRippleScaleKeyFrames(),
					...getShimmerKeyFrames(),
				},
			},
			colors: {},
			shadow: {
				...theme.shadow,
				...getFocusShadows(),
			},
			media: {
				...theme.media,
				pointer_coarse: "(pointer_coarse)",
			},
		}),
		preflights: [
			{
				getCSS: () => `:root, :host {
--spacing-size: ${options.size.spacing};
--radius: ${options.size.radius};
--text-size: ${options.size.text};
--text-weight: ${options.size.textWeight};
--transition-time: ${options.animation.transitionTime};
--min-lightness: ${options.lightness.scale.min};
--max-lightness: ${options.lightness.scale.max};
--sun-x: ${options.sun.x};
--sun-y: ${options.sun.y};
--sun-z: ${options.sun.z};
--border-width: ${options.size.borderWidth}
}`,
			},
		],
		safelist: [
			"animate-ripple-scale",
			"animate-ripple-color",
			"animate-ripple",
			"animate-text-shimmer",
			"animate-shimmer-position",
		],
	};
};

export { material as default };
