import { cva, type VariantProps } from "class-variance-authority";

export const emphasisSurfaceVariants = cva(null, {
	variants: {
		emphasis: {
			low: "sfc-emphasis-low-on-low",
			medium: "sfc-emphasis-medium-on-medium",
			high: "sfc-emphasis-high-on-high",
		},
	},
	defaultVariants: {
		emphasis: "medium",
	},
});
export type EmphasisSurface = VariantProps<typeof emphasisSurfaceVariants>;
