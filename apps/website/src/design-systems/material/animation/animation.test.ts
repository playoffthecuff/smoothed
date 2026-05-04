import { describe, test } from "bun:test";
import { getRippleAnimationShortcut } from "./animation";

describe.skip("getRippleAnimationShortcut", () => {
	test("", () => {
		const r = getRippleAnimationShortcut();
		console.log("🚀 ~ r:", r);
	});
});
