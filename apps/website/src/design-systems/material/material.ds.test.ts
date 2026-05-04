// /** biome-ignore-all lint/suspicious/noExplicitAny: <""> */
// import { describe, expect, test } from "bun:test";
// import type { CSSEntries } from "unocss";
// import { stripAnyOfPrefixes, stripPrefix } from "@/lib/utils/str";
// import {
// 	borderOutlineSc,
// 	bothThemeColorSc,
// 	type ColorGroup,
// 	type ColorGroups,
// 	colorRule,
// 	dropShadowRule,
// 	dropShadowSc,
// 	experimentalSurfaceSc,
// 	getDarkIntentSurfaceChroma,
// 	getDarkSurfaceBgLightness,
// 	getEmphasisColorTextLightness,
// 	getEmphasisIntentBgLightness,
// 	getLightSurfaceChroma,
// 	getModifiedColor,
// 	ringRule,
// 	ringSc,
// 	roundedRule,
// 	shadowRule,
// 	surfaceSc,
// 	surfaceStateSc,
// } from "./material-theme";

// const STATE_PREFIXES = ["dark:hover:", "dark:active:", "hover:", "active:"];

// const getStrRulesFromShortcut = (
// 	testStr: string,
// 	shortcut: { re: RegExp; fn: (...params: any[]) => string | undefined; },
// 	matchParams: string[],
// 	mode: "arrElem" | "arrGroups" = "arrElem",
// ) => {
// 	const match = testStr.match(shortcut.re);
// 	if (!match)
// 		throw `test string ${testStr} doesn't match with shortcut reg exp ${shortcut.re}`;
// 	return shortcut.fn(...match.slice(1, matchParams.length + 1));
// };

// const getCssFromStrRules = (
// 	testStr: string,
// 	rule: {
// 		re: RegExp;
// 		fn: (...params: any[]) => CSSEntries | Record<string, string> | undefined;
// 	},
// 	matchParams: string[],
// 	mode: "arrElem" | "arrGroups" = "arrElem",
// ) => {
// 	const match = testStr.match(rule.re);
// 	if (!match)
// 		throw `test string ${testStr} doesn't match with rule reg exp ${rule.re}`;
// 	if (mode === "arrGroups") {
// 		if (!match.groups) throw "not matched with any named variable of groups";
// 		return rule.fn(match.groups);
// 	}
// 	return rule.fn(...match.slice(1, matchParams.length + 1));
// };

// describe("surfaceStateSc", () => {
// 	test("can get correct value", () => {
// 		const m = "suka-hover-surface".match(surfaceStateSc.re);
// 		const r = surfaceStateSc.fn(m?.groups);
// 		console.log("🚀 ~ r:", r)

// 	})
// })

// describe("surfaceSc", () => {
// 	test("can get correct value", () => {
// 		const m = "light-surface-accent-ia".match(surfaceSc.re)
// 		const r = surfaceSc.fn(m?.groups);
// 		console.log("🚀 ~ r:", r)
// 	})
// })

// describe("getDarkIntentSurfaceBgLightness", () => {
// 	test("can get correct value", () => {
// 		const low = getDarkSurfaceBgLightness("accent", "low");
// 		console.log("🚀 ~ low:", low);
// 		const medium = getDarkSurfaceBgLightness("accent", "medium");
// 		console.log("🚀 ~ medium:", medium);
// 		const high = getDarkSurfaceBgLightness("accent", "high");
// 		console.log("🚀 ~ high:", high);
// 	});
// });

// describe("getLightIntentSurfaceMaxChroma", () => {
// 	test("can get correct value", () => {
// 		const low = getLightSurfaceChroma("accent", "low");
// 		console.log(low);
// 		const medium = getLightSurfaceChroma("accent", "medium");
// 		console.log(medium);
// 	});
// });
// describe("getDarkIntentSurfaceMaxChroma", () => {
// 	test("can get correct value", () => {
// 		const low = getDarkIntentSurfaceChroma("accent", "low");
// 		console.log(low);
// 		const medium = getDarkIntentSurfaceChroma("accent", "medium");
// 		console.log(medium);
// 		const high = getDarkIntentSurfaceChroma("accent", "high");
// 		console.log(high);
// 	});
// });

// describe("surface shortcut", () => {
// 	test("can create correct lightness for intentless color", () => {
// 		const m = "surface-2".match(experimentalSurfaceSc.re);
// 		const r = experimentalSurfaceSc.fn(...(m ? m.slice(1) : ([] as const)));
// 		console.log("🚀 ~ r:", r);
// 	});
// });

// describe("on surface intent shortcut", () => {
// 	test("can create correct lightness for intentless color", () => {
// 		const m = "on-surface-foreground-medium".match(experimentalOnSurfaceSc.re);
// 		const r = experimentalOnSurfaceSc.fn(...(m ? m.slice(1) : ([] as const)));
// 		console.log("🚀 ~ r:", r);
// 	});
// });

// describe("compute intent bg lightness based on the emphasis", () => {
// 	test("must compute a random theme color", () => {
// 		const r = getEmphasisIntentBgLightness("foreground", "high");
// 		console.log("🚀 ~ r:", r);
// 	});
// });

// describe("compute intent text lightness based on bg lightness", () => {
// 	test("must compute a random theme color", () => {
// 		const r = getEmphasisColorTextLightness(725, "accent", "medium");
// 		console.dir("🚀 ~ r:", r);
// 	});
// });

// describe("intent colors context", () => {
// 	test("able to create", () => {
// 		const r = intentColorsCtx;
// 		console.log("🚀 ~ r:", r);
// 	});
// });

// // describe("high emphasis surface", () => {
// // 	test("can create surface intentless surface", () => {
// // 		const strRules = getStrRulesFromShortcut("surface-high-input", highEmphasisSurfaceSc, ["color", "behavior"]);
// // 		console.log("🚀 ~ strRules:", strRules)
// // 		if (!strRules) throw "can't create str rules from shortcut";
// // 		const arrBorderRules = strRules.split(" ").filter(v => v.includes("border")).map(v => stripAnyOfPrefixes(v, ["dark:before:", "before:"]));
// // 		const bordersCss = arrBorderRules.map(v => getCssFromStrRules(v, colorRule, ["prop", "color", "lightness", "mods", "opacity", "mode"], "arrGroups"));
// // 	})
// // });

// describe("both theme color props", () => {
// 	test("can create various props", () => {
// 		const strRules = getStrRulesFromShortcut(
// 			"border-foreground-600",
// 			bothThemeColorSc,
// 			["prop", "color", "value"],
// 		);
// 		if (!strRules) throw "can't create string rules from shortcut";
// 		const arrRules = strRules.split(" ").map((v) => stripPrefix(v, "dark:"));
// 		const css = arrRules.map((v) =>
// 			getCssFromStrRules(
// 				v,
// 				colorRule,
// 				["prop", "color", "lightness", "mods", "opacity", "mode"],
// 				"arrGroups",
// 			),
// 		);
// 		console.log("🚀 ~ css:", css);
// 		colorRule.fn;
// 	});
// });

// // describe("low emphasis surface", () => {
// // 	test("can create rules with opacity", () => {
// // 		const testScStr = "surface-neutral-low-ia/15";
// // 		const strRules = getStrRulesFromShortcut(testScStr, lowEmphasisSurfaceSc, [
// // 			"color",
// // 			"ia",
// // 			"opacity",
// // 		]);
// // 		if (!strRules) throw "no rules";
// // 		const arrBgStrRules = strRules
// // 			.split(" ")
// // 			.filter((v) => v.includes("bg-neutral"))
// // 			.map((v) => stripAnyOfPrefixes(v, STATE_PREFIXES));
// // 		const arrBgRules = arrBgStrRules.map((v) => {
// // 			const m = v.match(colorRule.re);
// // 			if (!m) return undefined;
// // 			const css = getCssFromStrRules(
// // 				v,
// // 				colorRule,
// // 				["prop", "color", "lightness", "mods", "opacity", "mode"],
// // 				"arrGroups",
// // 			);
// // 			return css;
// // 		});
// // 	});
// // });

// describe("border outline shortcut", () => {
// 	test("can create css with opacity", () => {
// 		const strRules = getStrRulesFromShortcut(
// 			"border-accent/10",
// 			borderOutlineSc,
// 			["prop", "side", "color", "opacity"],
// 		);
// 		if (!strRules) throw "no str rules";
// 		const css = getCssFromStrRules(
// 			strRules.trim(),
// 			colorRule,
// 			["prop", "color", "lightness", "mods", "opacity", "mode"],
// 			"arrGroups",
// 		);
// 	});
// 	test("can create correct css with 100% opacity", () => {
// 		const strRules = getStrRulesFromShortcut(
// 			"border-accent/100",
// 			borderOutlineSc,
// 			["prop", "side", "color", "opacity"],
// 		);
// 		if (!strRules) throw "no str rules";
// 		const css = getCssFromStrRules(
// 			strRules.trim(),
// 			colorRule,
// 			["prop", "color", "lightness", "mods", "opacity", "mode"],
// 			"arrGroups",
// 		);
// 	});
// 	test("can create correct css with over 100% opacity", () => {
// 		const strRules = getStrRulesFromShortcut(
// 			"border-accent/999",
// 			borderOutlineSc,
// 			["prop", "side", "color", "opacity"],
// 		);
// 		if (!strRules) throw "no str rules";
// 		const css = getCssFromStrRules(
// 			strRules.trim(),
// 			colorRule,
// 			["prop", "color", "lightness", "mods", "opacity", "mode"],
// 			"arrGroups",
// 		);
// 	});
// });

// // describe.only("medium surface", () => {
// // 	test("must filter interactive css props", () => {
// // 		const strRules = getStrRulesFromShortcut(
// // 			"surface-neutral-medium",
// // 			mediumEmphasisSurfaceSc,
// // 			["color", "ia"],
// // 		);
// // 		expect(strRules?.includes("hover")).toBeFalse();
// // 		expect(strRules?.includes("active")).toBeFalse();
// // 	});
// // 	test("can create rules", () => {
// // 		const strRules = getStrRulesFromShortcut(
// // 			"surface-medium-input",
// // 			mediumEmphasisSurfaceSc,
// // 			["color", "ia"],
// // 		);
// // 		console.log("🚀 ~ strRules:", strRules)
// // 		if (!strRules) throw "couldn't create rules from shortcut string";
// // 		return;
// // 	});
// // });

// describe("strong surface", () => {
// 	// test.skip("must filter interactive css props", () => {
// 	// 	const strRules = getStrRulesFromShortcut(
// 	// 		"surface-neutral-strong",
// 	// 		strongSurfaceSc,
// 	// 		["color", "ia"],
// 	// 	);
// 	// 	expect(strRules?.includes("hover")).toBeFalse();
// 	// 	expect(strRules?.includes("active")).toBeFalse();
// 	// });
// 	// test.skip("can create background-color css props", () => {
// 	// 	const strRules = getStrRulesFromShortcut(
// 	// 		"surface-accent-strong-ia",
// 	// 		strongSurfaceSc,
// 	// 		["color", "ia"],
// 	// 	);
// 	// 	if (!strRules) throw "couldn't create rules from shortcut string";
// 	// 	const arr = strRules.split(" ").filter(v => v.includes("bg-")).map(v => stripAnyOfPrefixes(v, ["dark:hover:", "dark:active:", "dark:", "active:", "hover:"]));
// 	// 	expect(arr.every((v) => {
// 	// 		const css = getCssFromStrRules(v, colorRule, [
// 	// 			"prop",
// 	// 			"color",
// 	// 			"lightness",
// 	// 			"mods",
// 	// 			"opacity",
// 	// 			"mode",
// 	// 		], "arrGroups");
// 	// 		return css?.every(Array.isArray);
// 	// 	})).toBeTrue();
// 	// });
// });

// describe("shadow rule", () => {
// 	test.each([
// 		["shadow-l-2d"],
// 		["shadow-d-4d"],
// 	])("can create css for different themes", (testStr) => {
// 		const match = testStr.match(shadowRule.re);
// 		if (!match) throw "util doesn't match";
// 		const [_, mode, color, value] = match;
// 		const strRules = shadowRule.fn(mode, color, value);
// 		expect(strRules).toBeDefined();
// 	});
// });

// describe("drop shadow shortcut", () => {
// 	test("can create rule string", () => {
// 		const testString = "drop-shadow-2";
// 		const scMatch = testString.match(dropShadowSc.re);
// 		if (!scMatch) throw "test string doesn't match shortcut reg exp";
// 		const [_, color, value] = scMatch;
// 		const strRules = dropShadowSc.fn(color, value);
// 		if (!strRules) throw "couldn't create string rules from shortcut match";
// 		const [lightRule, darkRule] = strRules.split(" ");
// 		const lightMatch = lightRule.match(dropShadowRule.re);
// 		if (!lightMatch)
// 			throw `couldn't match light string rule ${lightRule} with reg exp ${dropShadowRule.re}`;
// 		const [__, lightMode, lightColor, lightValue] = lightMatch;
// 		const lightCss = dropShadowRule.fn(lightMode, lightColor, lightValue);
// 		expect(lightCss).toBeDefined();
// 		const strippedDarkRule = stripPrefix(darkRule, "dark:");
// 		const darkMatch = strippedDarkRule.match(dropShadowRule.re);
// 		if (!darkMatch)
// 			throw `couldn't match dark string rule ${strippedDarkRule} with reg exp ${dropShadowRule.re}`;
// 		const [___, darkMode, darkColor, darkValue] = darkMatch;
// 		const darkCss = dropShadowRule.fn(darkMode, darkColor, darkValue);
// 		expect(darkCss).toBeDefined();
// 	});
// });

// describe("rounded rule", () => {
// 	test("can create double css props", () => {
// 		const testStr = "rounded-s-2d";
// 		const match = testStr.match(roundedRule.re);
// 		if (!match) throw "doesn't match";
// 		const [_, side, value] = match;
// 		const rule = roundedRule.fn(side, value);
// 		expect(Object.keys(rule).length).toBe(2);
// 	});
// });

// describe("modify color", () => {
// 	test.each([
// 		[{ c: 0, h: 350, l: 1 }, "+", 180, "h"],
// 		[{ c: 0, h: 350, l: 1 }, "=", 999, "h"],
// 		[{ c: 0, h: 20, l: 1 }, "-", 180, "h"],
// 	])("could rotate the color over full circle", (lch, sign, amount, modifier) => {
// 		const res = getModifiedColor(
// 			lch,
// 			sign as ColorGroup["sign"],
// 			amount,
// 			modifier as ColorGroup["modifier"],
// 		);
// 		expect(res.c >= 0).toBeTrue();
// 		expect(res.c <= 0.4).toBeTrue();
// 		expect(res.l >= 0).toBeTrue();
// 		expect(res.l <= 1).toBeTrue();
// 		expect(res.h >= 0).toBeTrue();
// 		expect(res.h <= 360).toBeTrue();
// 	});
// 	test("should limit the color of shortcut text lightness to the boundaries of the configuration", () => {
// 		const scMatch = "text-foreground-0".match(bothThemeColorSc.re);
// 		if (!scMatch) throw "text shortcut doesn't match";
// 		const [_, color, value] = scMatch;
// 		const strRules = bothThemeColorSc.fn(color, value);
// 		if (!strRules) throw "couldn't create string rules from shortcut";
// 		const [lightThemeStrRule, darkThemeStrRule] = strRules.split(" ");
// 		if (!lightThemeStrRule)
// 			throw "couldn't create light theme string rule from shortcut";
// 		if (!darkThemeStrRule)
// 			throw "couldn't create dark theme string rule from shortcut";
// 		const lightThemeRuleMatch = lightThemeStrRule.match(colorRule.re);
// 		if (!lightThemeRuleMatch) throw "couldn't match light theme string rule";
// 		const lightGroups = lightThemeRuleMatch.groups as unknown as ColorGroups;
// 		const lightRule = colorRule.fn(lightGroups);
// 		expect(lightRule).toBeDefined();
// 		const darkThemeRuleStripped = stripPrefix(darkThemeStrRule, "dark:");
// 		const darkThemeRuleMatch = darkThemeRuleStripped.match(colorRule.re);
// 		if (!darkThemeRuleMatch) throw "couldn't match dark theme string rule";
// 		const darkGroups = darkThemeRuleMatch.groups as unknown as ColorGroups;
// 		const darkRule = colorRule.fn(darkGroups);
// 		expect(darkRule).toBeDefined();
// 	});
// });

// describe("ring shortcut", () => {
// 	test("can create ring rules from shortcut", () => {
// 		const testStr = "ring-accent-6";
// 		const scMatch = testStr.match(ringSc.re);
// 		if (!scMatch) throw "doesn't match with shortcut regexp";
// 		const [_, color, value] = scMatch;
// 		const strRules = ringSc.fn(color, value);
// 		if (!strRules) throw "couldn't create string rules from shortcut";
// 		const [lightThemeStrRule, darkThemeStrRule] = strRules.split(" ");
// 		if (!lightThemeStrRule) throw "couldn't create light theme rule";
// 		const lightThemeRuleMatch = lightThemeStrRule.match(ringRule.re);
// 		if (!lightThemeRuleMatch) throw "couldn't match light theme string rule";
// 		const [__, lightMod, lightColor, lightValue] = lightThemeRuleMatch;
// 		const lightRule = ringRule.fn(lightMod, lightColor, lightValue);
// 		expect(lightRule).toBeDefined();
// 		if (!darkThemeStrRule) throw "couldn't create dark theme rule";
// 		const darkThemeRuleStripped = stripPrefix(darkThemeStrRule, "dark:");
// 		const darkThemeRuleMatch = darkThemeRuleStripped.match(ringRule.re);
// 		if (!darkThemeRuleMatch) throw "couldn't match dark theme string rule";
// 		const [___, darkMod, darkColor, darkValue] = darkThemeRuleMatch;
// 		const darkRule = ringRule.fn(darkMod, darkColor, darkValue);
// 		expect(darkRule).toBeDefined();
// 	});
// });

// describe("text shortcut", () => {
// 	const textShortcutMatch = "text-foreground".match(bothThemeColorSc.re);
// 	if (!textShortcutMatch) throw "text shortcut doesn't match";
// 	const [, color, value] = textShortcutMatch as string[];
// 	const rulesStr = bothThemeColorSc.fn(color, value);
// 	if (!rulesStr) throw "couldn't create string rules from shortcut";
// 	const rules = rulesStr.split(" ");
// 	const firstRule = rules[0];
// 	const firstMatch = firstRule.match(colorRule.re);
// 	if (!firstMatch) throw "don't match";
// 	const firstRes = colorRule.fn(firstMatch.groups as unknown as ColorGroups);
// 	if (!firstRes) throw "couldn't create a rule";
// 	const secondRule = stripPrefix(rules[1], "dark:");
// 	const secondMatch = secondRule.match(colorRule.re);
// 	if (!secondMatch) throw "don't match";
// 	const secondRes = colorRule.fn(secondMatch.groups as unknown as ColorGroups);
// 	if (!secondRes) throw "couldn't create a rule";

// 	test("could create rule from shorthand shortcut for light theme", () => {
// 		expect(Array.isArray(firstRes)).toBeTrue();
// 		expect(firstRes.every(Array.isArray)).toBeTrue();
// 		expect(firstRes.every((v) => v.length === 2)).toBeTrue();
// 	});
// 	test("could create rule from shorthand shortcut for dark theme", () => {
// 		expect(Array.isArray(secondRes)).toBeTrue();
// 		expect(secondRes.every(Array.isArray)).toBeTrue();
// 		expect(secondRes.every((v) => v.length === 2)).toBeTrue();
// 	});
// });
