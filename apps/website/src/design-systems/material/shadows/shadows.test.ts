import { describe, test } from "bun:test";
import { options } from "../options";
import { getFocusShadows } from "./shadows";

describe.skip("getShadowFocuses", () => {
	test("", () => {
		const r = getFocusShadows(options);
		console.log("🚀 ~ r:", r);
	});
});
