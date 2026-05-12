import { cva, type VariantProps } from "class-variance-authority";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { Variants as SharedVariants } from "../../variants";

export const emphasis = SharedVariants.emphasisSurfaceVariants;
export const intent = SharedVariants.interactiveIntentSurfaceVariants;
export const size = SharedVariants.fontSizeVariants;
export const weight = SharedVariants.mediumFontVariants;
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

type VisitedIntentVariants = VariantProps<typeof intentVisited>;

export type Variants = FlattenIntersection<
	SharedVariants.EmphasisSurface &
		SharedVariants.IntentSurface &
		SharedVariants.Size &
		VisitedIntentVariants
>;
