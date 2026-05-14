import { describe, test } from "bun:test";
import { options } from "../options";
import { getPaddingMarginRule, getPositionRule } from "./geometry";

describe.skip("getPositionRule", () => {
	test("", () => {
		const [re, fn] = getPositionRule(options);
		const m = "-inset-8d".match(re);
		console.log("🚀 ~ m:", m);
		if (!m) throw new Error();
		const r = fn(m);
		console.log("🚀 ~ r:", r);
	});
});

describe("getPaddingMarginRule", () => {
	test("", () => {
		const [re, fn] = getPaddingMarginRule(options);
		const m = "p-18d".match(re);
		if (!m) throw new Error();
		console.log("🚀 ~ m:", m);
		const r = fn(m);
		console.log("🚀 ~ r:", r);
	});
});
