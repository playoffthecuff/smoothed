import { cva } from "class-variance-authority";
import type { Size } from "./types";

type Config = {
	size: Record<NonNullable<Size["size"]>, string>;
};

export const mediumFontVariants = cva<Config>(null, {
	variants: {
		size: {
			xs: "fw-9d",
			s: "fw-8.5d",
			m: "fw-8d",
			l: "fw-7.5d",
			xl: "fw-7d",
		},
	},
	defaultVariants: {
		size: "m",
	},
});

export const semiBoldFontVariants = cva<Config>(null, {
	variants: {
		size: {
			xs: "fw-9.5d",
			s: "fw-9d",
			m: "fw-8.5d",
			l: "fw-8d",
			xl: "fw-7.5d",
		},
	},
	defaultVariants: {
		size: "m",
	},
});

export const boldFontVariants = cva<Config>(null, {
	variants: {
		size: {
			xs: "fw-10d",
			s: "fw-9.5d",
			m: "fw-9d",
			l: "fw-8.5d",
			xl: "fw-8d",
		},
	},
});
