import { describe, test } from "bun:test";
import { options } from "../options";
import { getPositionRule } from "./geometry";

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
