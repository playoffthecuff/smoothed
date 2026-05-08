import { describe, test } from "bun:test";
import { options } from "../options";
import { getFontSizeRule } from "./typography";

describe.only("getFontSizeRule", () => {
	test("", () => {
		const [re, fn] = getFontSizeRule(options);
		const m = "fs-16d".match(re);
		console.log("🚀 ~ m:", m);
		if (!m) throw new Error();
		const r = fn(m);
		console.log("🚀 ~ r:", r);
	});
});
