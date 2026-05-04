import { describe, test } from "bun:test";
import { getPositionRule } from "./geometry";
import { options } from "../options";

describe.skip("getPositionRule", () => {
	test("", () => {
		const [re, fn] = getPositionRule(options);
		const m = "-inset-8d".match(re);
		console.log("🚀 ~ m:", m);
		const r = fn(m);
		console.log("🚀 ~ r:", r);
	});
});
