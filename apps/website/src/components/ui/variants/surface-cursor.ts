import { cva, type VariantProps } from "class-variance-authority";

export const surfaceCursorVariants = cva(null, {
	variants: {
		disabled: {
			true: "cursor-not-allowed",
		},
		loading: {
			true: null,
		},
	},
	compoundVariants: [
		{ disabled: false, loading: true, className: "cursor-wait" },
		{ disabled: false, loading: false, className: "cursor-pointer" },
	],
	defaultVariants: {
		disabled: false,
		loading: false,
	},
});

export type SurfaceCursor = VariantProps<typeof surfaceCursorVariants>;
