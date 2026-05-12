import type { Options } from "../options";
import type { GetDynamicRule, GetStaticShortcut } from "../types";
import { calcSize } from "../utils";

export const getFocusShadows = () => ({
	focus: [
		"0 0 calc(var(--spacing-size) * 1rem * pow(2, 0.75)) calc(var(--spacing-size) * 1rem * 2) canvas",
		"0 0 calc(var(--spacing-size) * 1rem * pow(2, 0.75)) calc(var(--spacing-size) * 1rem * 3) var(--focus-shadow-color)",
		`0 0 calc(var(--spacing-size) * 1rem * pow(2, 0.75) / 2) calc(var(--spacing-size) * 1rem * 5) oklch(from var(--bg-color) l c h / 1)`,
	],
});

export const getRingRule: GetDynamicRule = () => [
	/^ring-(?<value>\d+)d$/,
	({ groups }) => {
		if (!groups) return;
		return {
			"box-shadow": `0 0 0 calc(var(--spacing-size) * 1rem * ${calcSize(groups.value ?? 0)}) var(--ring-color)`,
		};
	},
];

// TODO переписать на вариант минус вместо реверсе при переходе на полный пресет
export const getDropShadowRule: GetDynamicRule = (p) => [
	/^drop-shadow(?:-(?<reverse>reverse))?-(?<mode>dark|light)$/,
	({ groups }) => ({
		filter: `drop-shadow(calc(var(--spacing-size) * 1rem * var(--rel-elevation) * ${groups?.reverse ? "-" : ""}20) calc(var(--spacing-size) * 1rem * var(--rel-elevation) * ${groups?.reverse ? "-" : ""}20) calc(pow(var(--sun-z) * var(--rel-elevation) * var(--spacing-size) * 0.025, .5) * 1rem) oklch(${groups?.mode === "dark" ? 0 : 0.25} 0.08 ${p.color.foreground.h.mid} / 0.5))`,
	}),
];

export const getDropShadowShortcut: GetStaticShortcut = () => [
	"drop-shadow",
	"drop-shadow-light dark:drop-shadow-dark",
];

export const getShadowsRules = (opts: Options) => [
	getRingRule(opts),
	getDropShadowRule(opts),
];

export const getShadowShortcuts = () => [getDropShadowShortcut()];
