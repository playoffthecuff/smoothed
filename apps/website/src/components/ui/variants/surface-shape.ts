import { cva, type VariantProps } from "class-variance-authority";

export const surfaceShapeVariants = cva(null, {
	variants: {
		shape: {
			square: null,
			rounded: "sfc-rounded",
			circular: "sfc-circular",
		},
	},
	defaultVariants: {
		shape: "rounded",
	},
});

export type SurfaceShape = VariantProps<typeof surfaceShapeVariants>;
