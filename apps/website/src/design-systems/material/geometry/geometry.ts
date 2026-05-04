import { getBorderSide, getCssSide } from "../../ds-utils";
import { calcSize } from "../material-theme";
import type { Options } from "../options";
import type { GetDynamicRule, GetStaticRule } from "../types";

export const getSizeRule: GetDynamicRule = () => [
	/^(?<prop>w|h|min-w|min-h|max-w|max-h)-(?<value>\d+)d$/,
	({ groups }) => {
		if (!groups) return;
		const params = {
			w: "width",
			h: "height",
			"min-w": "min-width",
			"max-w": "max-width",
			"min-h": "min-height",
			"max-h": "max-height",
		};
		return {
			[params[groups.prop as keyof typeof params]]:
				`calc(var(--spacing-size) * ${calcSize(groups.value)}rem)`,
		};
	},
];

export const getBorderWidthRule: GetDynamicRule = () => [
	/^(?<prop>border|outline|stroke)(?:-(?<side>x|y|t|r|l|b|s|e))?-(?<value>\d+(\.5)?)d$/,
	({ groups }) => {
		if (!groups) return;
		const bs = getCssSide(groups.side);
		const prop = `${groups.prop}${bs && groups.prop === "border" ? `-${bs}` : ""}-width`;
		const v = `calc(var(--spacing-size) * ${calcSize(groups?.value ?? 0)}rem)`;
		return { [prop]: v };
	},
];

export const getRoundedRule: GetDynamicRule = () => [
	/^rounded(?:-(?<side>s|e|t|r|b|l|bl|br|tl|tr|es|ee|se|ss))?-(?<value>\d+)d$/,
	({ groups }) => {
		const bs = getBorderSide(groups?.side ?? "", "border-radius");
		const v = `calc(var(--spacing-size) * var(--radius) * ${calcSize(groups?.value ?? 0)}rem)`;
		return Array.isArray(bs)
			? Object.fromEntries(bs.map((k) => [k, v]))
			: typeof bs === "string"
				? { [bs]: v }
				: undefined;
	},
];

export const getScrollbarWidthRule: GetStaticRule = () => [
	"sbw-none",
	{ "scrollbar-width": "none" },
];

export const getPositionRule: GetDynamicRule = () => [
	/^(?<minus>-)?(?<prop>top|bottom|left|right|inset)-(?<value>\d+)d$/,
	({ groups }) => {
		if (!groups) return;
		return {
			[groups.prop]: `calc(var(--spacing-size) * ${(groups.minus ? -1 : 1) * calcSize(groups.value)}rem)`,
		};
	},
];

export const getGapRule: GetDynamicRule = () => [
	/^gap(?:-(?<axis>x|y))?-(?<value>\d+)d$/,
	({ groups }) => ({
		[groups?.axis === "x"
			? "column-gap"
			: groups?.axis === "y"
				? "row-gap"
				: "gap"]:
			`calc(var(--spacing-size) * ${calcSize(groups?.value ?? 0)}rem)`,
	}),
];

export const marginPaddingRule = {
	re: /^(m|p)(x|y|t|r|b|l|s|e)?-(\d+)d$/,
	fn: (prop: string, side: string, value: string) => ({
		[`${prop === "m" ? "margin" : "padding"}${side ? `-${{ x: "inline", y: "block", t: "top", b: "bottom", l: "left", r: "right", s: "inline-start", e: "inline-end" }[side]}` : ""}`]: `calc(var(--spacing-size) * ${calcSize(value)}rem)`,
	}),
};

export const getPaddingMarginRule: GetDynamicRule = () => [
	/^(?<prop>m|p)(?<side>x|y|t|r|b|l|s|e)?-(?<value>\d+)d$/,
	({ groups }) => {
		if (!groups) return;
		return {
			[`${groups.prop === "m" ? "margin" : "padding"}${groups.side ? `-${{ x: "inline", y: "block", t: "top", b: "bottom", l: "left", r: "right", s: "inline-start", e: "inline-end" }[groups.side]}` : ""}`]: `calc(var(--spacing-size) * ${calcSize(groups.value)}rem)`,
		};
	},
];

export const getGeometryRules = (opts: Options) => [
	getSizeRule(opts),
	getRoundedRule(opts),
	getScrollbarWidthRule(),
	getPositionRule(opts),
	getGapRule(opts),
	getPaddingMarginRule(opts),
	getBorderWidthRule(opts),
];
