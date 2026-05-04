import type { Rule } from "unocss";
import { assertCssProp, getCssPropByUtilProp, lerp } from "../../ds-utils";
import { assertMaybeColor, type Options } from "../options";
import {
	getChromaByLightness,
	getThemeColor,
	getThemeColorHue,
} from "../surface/computation";
import type { GetDynamicRule } from "../types";

export const getColorRule: GetDynamicRule = (opts) => [
	/^(?<prop>bg|text|border|outline|fill)(?:-(?<side>x|y|t|r|l|b|s|e))?-(?<color>[a-z]+)-(?<lightness>\d{1,4})?d$/,
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

		return {
			[cssProp]: `oklch(${lightness} ${getChromaByLightness(lightness)({ opts, color: groups.color })} ${getThemeColorHue({ opts, color: groups.color }).mid})`,
		};
	},
];

export const getColorRules = (opts: Options): Rule[] => [getColorRule(opts)];
