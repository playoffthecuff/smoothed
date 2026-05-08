import { describe, test } from "bun:test";
import { options } from "../options";
import {
	getSurfaceBgVars,
	getSurfaceColorRule,
	getSurfaceColorRules,
	getSurfaceFgCssVars,
	getSurfaceFgVars,
} from "./surface";

describe("colorRule", () => {
	test("", () => {
		const [re, fn] = getSurfaceColorRule(options);
		const m = "bg-background-0d".match(re);
		if (!m) throw new Error();
		const r = fn(m);
		console.log("🚀 ~ r:", r);
	});
});

describe.only("getSurfaceColorRules", () => {
	test("", () => {
		const [re, fn] = getSurfaceColorRules(options);
		const m = "sfc-color-accent-on-accent-ia".match(re);
		if (!m) throw new Error();
		const r = fn(m);
		console.log("🚀 ~ r:", r);
	});
});

describe.only("getSurfaceBgVars", () => {
	test("", () => {
		const r = getSurfaceBgVars({
			opts: options,
			color: "accent",
			emphasisStr: "high",
			mode: "light",
		});
		console.log("🚀 ~ r:", r);
	});
});

describe("getSurfaceFgCssVars", () => {
	test("accent high", () => {
		const r = getSurfaceFgCssVars({
			opts: options,
			color: "accent",
			isInteractive: true,
			emphasisStr: "high",
			mode: "light",
		})({
			opts: options,
			color: "accent",
			isInteractive: true,
			mode: "light",
			emphasisStr: "high",
		});
		console.log("🚀 ~ r:", r);
	});
	test("danger high", () => {
		const r = getSurfaceFgCssVars({
			opts: options,
			color: "danger",
			isInteractive: true,
			emphasisStr: "high",
			mode: "light",
		})({
			opts: options,
			color: "danger",
			isInteractive: true,
			mode: "light",
			emphasisStr: "high",
		});
		console.log("🚀 ~ r:", r);
	});
});

describe("getSurfaceFgVars", () => {
	test("", () => {
		const r = getSurfaceFgVars({
			opts: options,
			color: "accent",
			isInteractive: true,
			mode: "light",
		})({ opts: options, color: "accent", isInteractive: true, mode: "light" });
		console.log("🚀 ~ r:", r);
	});
});

describe("getSurfaceFgVars", () => {
	test("", () => {
		const r = getSurfaceFgVars({
			opts: options,
			color: "accent",
			mode: "light",
			isInteractive: true,
		})({ opts: options, color: "accent", mode: "light", isInteractive: true });
		console.log("🚀 ~ r:", r);
	});
});

describe("getSurfaceFgCssVars", () => {
	test("", () => {
		const low = getSurfaceFgCssVars({
			opts: options,
			color: "background",
			emphasisStr: "low",
			isInteractive: true,
			mode: "dark",
		})({
			opts: options,
			color: "accent",
			emphasisStr: "low",
			isInteractive: true,
			mode: "dark",
		});
		const high = getSurfaceFgCssVars({
			opts: options,
			color: "background",
			emphasisStr: "high",
			isInteractive: true,
			mode: "dark",
		})({
			opts: options,
			color: "accent",
			emphasisStr: "high",
			isInteractive: true,
			mode: "dark",
		});
		console.log("🚀 ~ high:", high);
		console.log("🚀 ~ low:", low);
	});
});
