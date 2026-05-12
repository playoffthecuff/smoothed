import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { Variants } from "../../variants";

export namespace FieldLabel {
	export type Variants = Variants.EmphasisSurface;
	export type Props = FlattenIntersection<
		Variants &
			CompoundProps & {
				id?: string;
				name?: string;
				required?: boolean;
			}
	>;
}

export const FieldLabel = ({
	children,
	className,
	...props
}: FieldLabel.Props) => (
	<label
		className={cn(
			"leading-[1.25] sfc-text sfc-color-default-on-default",
			Variants.emphasisSurfaceVariants(props),
			className,
		)}
		htmlFor={props.id ?? props.name}
	>
		{children}
	</label>
);
