import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { Link as BaseLink } from "../link";

export type LinkProps = FlattenIntersection<BaseLink.Variants & NextLinkProps>;

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
				BaseLink.emphasis({ emphasis }),
				BaseLink.intent({ intent }),
				BaseLink.link(),
				BaseLink.size({ size }),
				BaseLink.weight({ size }),
				BaseLink.intentVisited({ visitedIntent }),
				className,
			)}
		>
			{children}
		</NextLink>
	);
}
