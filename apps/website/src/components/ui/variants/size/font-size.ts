import { cva } from "class-variance-authority";
import type { Size } from "./types";

export const fontSizeVariants = cva<{
	size: Record<NonNullable<Size["size"]>, string>;
}>(null, {
	variants: {
		size: {
			xs: "fs-14d",
			s: "fs-15d",
			m: "fs-16d",
			l: "fs-17d",
			xl: "fs-18d",
		},
	},
	defaultVariants: {
		size: "m",
	},
});
