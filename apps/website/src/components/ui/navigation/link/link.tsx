import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { LinkVariantsParts } from "../variants";

export type LinkVariants = FlattenIntersection<
	LinkVariantsParts.EmphasisVariants &
		LinkVariantsParts.IntentVariants &
		LinkVariantsParts.Size &
		LinkVariantsParts.VisitedIntentVariants
>;

export type LinkProps = FlattenIntersection<LinkVariants & NextLinkProps>;

export function Link({
	children,
	className,
	emphasis,
	intent,
	size,
	visitedIntent,
	...props
}: LinkProps & CompoundProps) {
	return (
		<NextLink
			{...props}
			className={cn(
				LinkVariantsParts.emphasis({ emphasis }),
				LinkVariantsParts.intent({ intent }),
				LinkVariantsParts.link(),
				LinkVariantsParts.size({ size }),
				LinkVariantsParts.weight({ size }),
				LinkVariantsParts.intentVisited({ visitedIntent }),
				className,
			)}
		>
			{children}
		</NextLink>
	);
}
