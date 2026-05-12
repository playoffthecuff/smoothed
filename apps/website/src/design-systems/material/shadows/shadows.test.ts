import { describe, test } from "bun:test";
import { getFocusShadows } from "./shadows";

describe.skip("getShadowFocuses", () => {
	test("", () => {
		const r = getFocusShadows();
		console.log("🚀 ~ r:", r);
	});
});
