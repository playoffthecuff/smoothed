import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { T } from "../../typography";

//TODO Add variants
//TODO Add data slots attributes to all compound components

export const cardVariants = cva(
	"flex flex-col gap-12d bg-2 rounded-12d overflow-hidden rel-elevation-6 —base-elevation-4 sfc-solid",
	{
		variants: {
			flat: {
				true: null,
				false: "sfc-shadow",
			},
		},
		defaultVariants: {
			flat: false,
		},
	},
);

export type CardVariants = VariantProps<typeof cardVariants>;

export const Root = ({
	children,
	className,
	...props
}: CardVariants & CompoundProps) => {
	return (
		<article data-slot="card" className={cn(cardVariants(props), className)}>
			{children}
		</article>
	);
};

export const Header = ({ children, className }: CompoundProps) => (
	<header
		data-slot="card-header"
		className={cn("flex items-center gap-16d", className)}
	>
		{children}
	</header>
);

export const Title = (props: T.TitleProps) => (
	<T.Title data-slot="card-title" as="h3" size={"l"} {...props} />
);

export const Description = (props: T.TextProps) => (
	<T.Text data-slot="card-description" as="p" emphasis={"medium"} {...props} />
);

export const Content = ({ children, className }: CompoundProps) => (
	<div data-slot="card-content" className={cn("px-16d", className)}>
		{children}
	</div>
);

export const Footer = ({ children, className }: CompoundProps) => (
	<footer data-slot="card-footer" className={cn("px-16d", className)}>
		{children}
	</footer>
);
