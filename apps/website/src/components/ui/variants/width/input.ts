import { cva } from "class-variance-authority";
import type { InputWidth } from "./types";

type Config = {
	width: Record<NonNullable<InputWidth["width"]>, string>;
};

export const inputWidthVariants = cva<Config>(null, {
	variants: {
		width: {
			narrow: "input-box-narrow",
			normal: "input-box-normal",
			wide: "input-box-wide",
			fill: "input-box-fill",
		},
	},
	defaultVariants: {
		width: "normal",
	},
});
