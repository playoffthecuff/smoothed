import { cva, type VariantProps } from "class-variance-authority";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { Variants } from "../../variants";

export const fieldMessageVariants = cva(
	"inline-flex items-center gap-[0.5ch] leading-[1.25] rel-elevation-4 —base-elevation-5",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded",
				circular: "rounded-[1em]",
			},
			solid: {
				true: "sfc-solid",
			},
			outlined: {
				true: "sfc-border",
			},
		},
		compoundVariants: [
			{ outlined: false, solid: false, className: "sfc-text" },
			{ outlined: true, solid: false, className: "sfc-outlined" },
		],
		defaultVariants: {
			shape: "rounded",
			solid: false,
			outlined: false,
		},
	},
);

export type FieldMessageVariants = VariantProps<typeof fieldMessageVariants>;

export type FieldMessageProps = FlattenIntersection<
	Variants.EmphasisSurface &
		Variants.IntentSurface &
		Variants.Size &
		FieldMessageVariants
>;

export function FieldMessage({
	children,
	className,
	...props
}: FieldMessageProps & CompoundProps) {
	return (
		<p
			className={cn(
				Variants.emphasisSurfaceVariants(props),
				Variants.interactiveIntentSurfaceVariants(props),
				Variants.mediumFontVariants(props),
				fieldMessageVariants(props),
				props.solid && "sfc-solid",
				className,
			)}
		>
			{children}
		</p>
	);
}
