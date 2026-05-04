import { cva, type VariantProps } from "class-variance-authority";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { Typography, type TypographyProps } from "./typography";

const textVariants = cva(null, {
	variants: {
		size: {
			xxxs: "text-12",
			xxs: "text-13",
			xs: "text-14",
			s: "text-15",
			m: "text-16",
			l: "text-17",
			xl: "text-18",
			xxl: "text-19",
			xxxl: "text-20",
		},
	},
});

export type TextVariants = VariantProps<typeof textVariants>;
export type TextProps = FlattenIntersection<TypographyProps & TextVariants>;

export const Text = ({
	className,
	size = "m",
	emphasis = "high",
	as = "span",
	...props
}: TextProps) => (
	<Typography
		className={cn(textVariants({ size }), className)}
		emphasis={emphasis}
		{...props}
	></Typography>
);
