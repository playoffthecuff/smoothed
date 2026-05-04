import { describe, test } from "bun:test";
import { options } from "../options";
import { getShadowFocuses } from "./shadows";

describe.skip("getShadowFocuses", () => {
	test("", () => {
		const r = getShadowFocuses(options);
		console.log("🚀 ~ r:", r);
	});
});
