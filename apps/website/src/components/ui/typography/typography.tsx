import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../types";
import { Variants } from "../variants";

export type TypographyProps = FlattenIntersection<
	Variants.EmphasisSurface &
		CompoundProps & {
			as?: React.ElementType;
		}
>;

export const Typography = ({
	as: Tag = "span",
	emphasis,
	className,
	...props
}: TypographyProps) => {
	return (
		<Tag
			className={cn(
				"sfc-text sfc-color-default-on-default",
				Variants.emphasisSurfaceVariants({ emphasis }),
				className,
			)}
			{...props}
		/>
	);
};
