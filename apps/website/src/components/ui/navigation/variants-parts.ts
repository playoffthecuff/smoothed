import { cva, type VariantProps } from "class-variance-authority";
import { Variants } from "../variants/index";

export const emphasis = Variants.emphasisSurfaceVariants;
export const intent = Variants.interactiveIntentSurfaceVariants;
export const size = Variants.fontSizeVariants;
export const weight = Variants.mediumFontVariants;
export const link = cva("lifted-text sfc-text hover:underline self-start");
export const intentVisited = cva(null, {
	variants: {
		visitedIntent: {
			neutral: "visited:sfc-color-neutral-on-neutral-ia",
			visited: "visited:sfc-color-visited-on-visited-ia",
		},
	},
	compoundVariants: [
		{
			visitedIntent: undefined,
			className: "visited:sfc-color-default-on-default-ia",
		},
	],
});

export type EmphasisVariants = Variants.EmphasisSurface;
export type IntentVariants = Variants.IntentSurface;
export type Size = Variants.Size;
export type VisitedIntentVariants = VariantProps<typeof intentVisited>;
