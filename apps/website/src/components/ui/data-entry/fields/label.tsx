import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { Variants } from "../../variants";

export type LabelProps = {
	id?: string;
	name?: string;
	required?: boolean;
};

export const FieldLabel = ({
	children,
	className,
	...props
}: LabelProps & CompoundProps & Variants.EmphasisSurface) => (
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
