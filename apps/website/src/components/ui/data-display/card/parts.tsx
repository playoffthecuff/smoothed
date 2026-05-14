import { cva, type VariantProps } from "class-variance-authority";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { T } from "../../typography";
import { Variants } from "../../variants";

//TODO Add variants
//TODO Add data slots attributes to all compound components

export const cardVariants = cva(
	"flex flex-col gap-[.5em] bg-2 sfc-p-1 overflow-hidden rel-elevation-5 —base-elevation-3 hover:rel-elevation-10 sfc-solid transition-all",
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

export type CardProps = FlattenIntersection<
	CardVariants & Variants.Size & Variants.SurfaceShape & CompoundProps
>;

export const Root = ({ children, className, ...props }: CardProps) => {
	return (
		<article
			data-slot="card"
			className={cn(
				cardVariants(props),
				Variants.fontSizeVariants(props),
				Variants.surfaceShapeVariants(props),
				className,
			)}
		>
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
	<div data-slot="card-content" className={className}>
		{children}
	</div>
);

export const Footer = ({ children, className }: CompoundProps) => (
	<footer data-slot="card-footer" className={className}>
		{children}
	</footer>
);
