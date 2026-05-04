import type { Options } from "../options";
import type { GetDynamicRule, GetDynamicShortcut } from "../types";
import { calcSize } from "../utils";

export const getFontSizeRule: GetDynamicRule = () => [
	/^fs-(?<value>\d+(\.5)?)d$/,
	({ groups }) => ({
		"font-size": `calc(var(--spacing-size) * 1rem * var(--text-size) * ${calcSize(groups?.value ?? 0)})`,
	}),
];

export const getFontWeightRule: GetDynamicRule = () => [
	/^fw-(?<value>\d+(\.5)?)d$/,
	({ groups }) => ({
		"font-weight": `calc(var(--text-weight) * ${Math.round(calcSize(groups?.value ?? 0, 100))})`,
	}),
];

export const getTextShortcut: GetDynamicShortcut = () => [
	/^text-(?<value>\d+(\.5)?)$/,
	({ groups }) =>
		`fs-${groups?.value ?? 0}d typography_leading-${groups?.value ?? 0}d`,
];

export const getTypographyLeadingRule: GetDynamicRule = () => [
	/^typography_leading-(?<value>\d+(?:\.5)?)d$/,
	({ groups }) => {
		if (!groups) return;
		const x = +groups.value;
		if (Number.isNaN(x)) throw `value ${groups.value} should be a number`;
		const K = 12;
		const t1 = 1 / (1 + Math.exp(-K * (x - 18)));
		const t2 = 1 / (1 + Math.exp(-K * (x - 23)));
		const f1 = 2 ** (x / 28) / 0.75 ** 0.75;
		const f2 = 2 ** ((17 - x) * 0.125) * 1.6;
		const f2Lifted = f2 + 0.05;
		const f3 = 1;
		const f12 = f1 * (1 - t1) + f2Lifted * t1;
		const res = Math.round((f12 * (1 - t2) + f3 * t2) * 100) / 100;

		return {
			"line-height": res,
		};
	},
];

export const getTypographyRules = (opts: Options) => [
	getFontSizeRule(opts),
	getFontWeightRule(opts),
	getTypographyLeadingRule(opts),
];

export const getTypographyShortcuts = (opts: Options) => [
	getTextShortcut(opts),
];
