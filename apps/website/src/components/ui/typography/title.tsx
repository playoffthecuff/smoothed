import { cva, type VariantProps } from "class-variance-authority";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { Typography, type TypographyProps } from "./typography";

const titleVariants = cva("fw-11d", {
	variants: {
		size: {
			xxs: "text-15",
			xs: "text-16",
			s: "text-17",
			m: "text-18",
			l: "text-19",
			xl: "text-20",
			xxl: "text-21",
		},
	},
});

export type TitleVariants = VariantProps<typeof titleVariants>;
export type TitleProps = FlattenIntersection<TypographyProps & TitleVariants>;

export const Title = ({
	className,
	size = "xxl",
	emphasis = "high",
	as = "h1",
	...props
}: TitleProps) => (
	<Typography
		className={cn(titleVariants({ size }), className)}
		emphasis={emphasis}
		{...props}
	></Typography>
);
