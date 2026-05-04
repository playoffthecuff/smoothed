import { describe, expect, test } from "bun:test";
import { computeOpacityForApcaContrast } from "@/design-systems/ds-utils";
import { options } from "../options";
import {
	getBgLightnessBottomBound,
	getBgLightnessTopBound,
	getBgMinChroma,
	getDarkIntentFgLightness,
	getDarkSurfaceBgLightness,
	getEmphasisNumber,
	getIntentFgLightness,
	getInterpolatedLightness,
	getLightIntentFgLightness,
	getSurfaceBgLightness,
	getSurfaceFgLightness,
	getSurfaceFgOpacity,
	getThemeColorHue,
	getThemeColorLch,
	getThemeColorLightness,
	getThemeColorMaxChromaByLightness,
	getThemeColorString,
} from "./computation";

describe.skip("getThemeColorMaxChromaByLightness", () => {
	test("", () => {
		const r = getThemeColorMaxChromaByLightness(0.55)({
			opts: options,
			color: "accent",
			emphasisStr: "high",
			mode: "light",
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getLightIntentFgLightness", () => {
	test("", () => {
		const r = getLightIntentFgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "light",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
	test("", () => {
		const r = getLightIntentFgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "medium",
			mode: "light",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
	test("", () => {
		const r = getLightIntentFgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "high",
			mode: "light",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getDarkSurfaceBgLightness", () => {
	test("", () => {
		const r = getDarkSurfaceBgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			isInteractive: true,
			mode: "dark",
		});
		console.log("🚀 ~ r:", r);
	});
	test("", () => {
		const r = getDarkSurfaceBgLightness({
			opts: options,
			color: "warning",
			emphasisStr: "low",
			isInteractive: true,
			mode: "dark",
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getSurfaceBgLightness", () => {
	test("must be equal either in dark and light mode", () => {
		const dark = getSurfaceBgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "high",
			mode: "dark",
		});
		console.log("🚀 ~ dark:", dark);
		const light = getSurfaceBgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "high",
			mode: "light",
		});
		const darkLow = getSurfaceBgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "dark",
		});
		console.log("🚀 ~ darkLow:", darkLow);
		console.log("🚀 ~ dark:", dark);
		const lightLow = getSurfaceBgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "light",
		});
		console.log("🚀 ~ lightLow:", lightLow);
		console.log("🚀 ~ light:", light);
	});
	test("must return correct fallback colorless value", () => {
		const r = getSurfaceBgLightness({
			opts: options,
			emphasisStr: "high",
			mode: "light",
			color: "default",
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("computeOpacityForApcaContrast", () => {
	test("", () => {
		const themeLch = getThemeColorLch({
			opts: options,
			color: "background",
			emphasisStr: "high",
			mode: "light",
		});
		console.log("🚀 ~ themeLch:", themeLch);
		const lightness = getSurfaceFgLightness({
			opts: options,
			color: "background",
			emphasisStr: "high",
			mode: "light",
		})({
			opts: options,
			color: "foreground",
			emphasisStr: "high",
			mode: "light",
		});
		console.log("🚀 ~ lightness:", lightness);
		const hue = getThemeColorHue({
			opts: options,
			color: "foreground",
			emphasisStr: "high",
			mode: "light",
		}).mid;
		console.log("🚀 ~ hue:", hue);
		const emphasisNumber = getEmphasisNumber({
			opts: options,
			color: "foreground",
			emphasisStr: "high",
			mode: "light",
		});
		console.log("🚀 ~ emphasisNumber:", emphasisNumber);
		const r = computeOpacityForApcaContrast(
			themeLch,
			{ l: lightness, c: 0, h: hue },
			90 - (1 - emphasisNumber) * 20,
			{},
		);
		const r2 = computeOpacityForApcaContrast(
			{ l: 0.9, c: 0, h: 270 },
			{ l: 0, h: 270, c: 0 },
			90,
			{},
		);
		console.log("🚀 ~ r2:", r2);
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getInterpolatedLightness", () => {
	test("", () => {
		const low = getInterpolatedLightness(false)({
			opts: options,
			color: "background",
			mode: "dark",
			emphasisStr: "low",
		});
		console.log("🚀 ~ low:", low);
		const high = getInterpolatedLightness(false)({
			opts: options,
			color: "background",
			mode: "dark",
			emphasisStr: "high",
		});
		console.log("🚀 ~ high:", high);
	});
});

describe.only("getIntentFgLightness", () => {
	test("", () => {
		const medium = getIntentFgLightness({
			opts: options,
			color: "default",
			emphasisStr: "high",
			isInteractive: false,
			mode: "dark",
		});
		// const low = getIntentFgLightness({
		// 	opts: options,
		// 	color: "accent",
		// 	emphasisStr: "low",
		// 	isInteractive: true,
		// 	mode: "dark",
		// });
		// console.log("🚀 ~ low:", low);
		console.log("🚀 ~ medium:", medium);
	});
});

describe.skip("getThemeColorString", () => {
	test("", () => {
		const r = getThemeColorString({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "light",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getSurfaceFgLightness", () => {
	test("", () => {
		const r = getSurfaceFgLightness({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "light",
			isInteractive: true,
		})({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "light",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getSurfaceFgOpacity", () => {
	test("", () => {
		const r = getSurfaceFgOpacity({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			mode: "light",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getDarkSurfaceFgLightness", () => {
	test("", () => {
		const r = getDarkIntentFgLightness({
			emphasisStr: "low",
			opts: options,
			color: "accent",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getLightSurfaceFgLightness", () => {
	test("", () => {
		const r = getLightIntentFgLightness({
			emphasisStr: "low",
			opts: options,
			color: "accent",
			isInteractive: true,
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getLightBgMinChroma", () => {
	test("", () => {
		const r = getBgMinChroma({
			emphasisStr: "low",
			opts: options,
			color: "accent",
		});
		console.log("🚀 ~ r:", r);
	});
});

describe.skip("getDarkLightnessBottomBound", () => {
	test("", () => {
		const r = getBgLightnessBottomBound({
			opts: options,
			emphasisStr: "low",
			color: "warning",
		});
		console.log("🚀 ~ r:", r);
		expect(r).toBeNumber();
	});
});

describe.skip("getConfigLightness", () => {
	test("can get correct value", () => {
		const r = getThemeColorLightness({
			opts: options,
			color: "accent",
			emphasisStr: "low",
		});
		console.log("🚀 ~ r:", r);
		expect(r).toBeNumber();
	});
	test("must return correct fallback colorless value", () => {
		const r1 = getThemeColorLightness({
			opts: options,
			color: "default",
			emphasisStr: "high",
		});
		console.log("🚀 ~ r1:", r1);
		const r2 = getThemeColorLightness({
			opts: options,
			emphasisStr: "high",
		});
		console.log("🚀 ~ r2:", r2);
	});
});

describe.skip("getLightnessTopBound", () => {
	test("should not depend on color", () => {
		const accent = getBgLightnessTopBound({
			opts: options,
			emphasisStr: "low",
			color: "accent",
		});
		console.log("🚀 ~ accent:", accent);
		const warning = getBgLightnessTopBound({
			opts: options,
			emphasisStr: "low",
			color: "warning",
		});
		expect(accent).toEqual(warning);
	});
	test("correct value", () => {
		const low = getBgLightnessTopBound({
			opts: options,
			emphasisStr: "low",
			color: "accent",
		});
		console.log("🚀 ~ low:", low);
		const medium = getBgLightnessTopBound({
			opts: options,
			emphasisStr: "medium",
			color: "accent",
		});
		console.log("🚀 ~ medium:", medium);
		const high = getBgLightnessTopBound({
			opts: options,
			emphasisStr: "high",
			color: "accent",
		});
		console.log("🚀 ~ high:", high);
	});
});
