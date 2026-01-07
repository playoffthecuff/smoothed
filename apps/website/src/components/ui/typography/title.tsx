import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const headingVariants = cva("font-11d", {
	variants: {
		size: {
			1: "text-8d",
			2: "text-7d",
			3: "text-6d",
			4: "text-5d",
			5: "text-4d",
			6: "text-3d",
		},
	},
	defaultVariants: {
		size: 1,
	},
});

type Props = React.ComponentProps<"h1"> & VariantProps<typeof headingVariants>;

export function Title({ size, children, className, ...props }: Props) {
	switch (size) {
		case 2: {
			return <h2 className={clsx(headingVariants({ size }), className)} {...props}>{children}</h2>;
		}
		case 3: {
			return <h3 className={clsx(headingVariants({ size }), className)} {...props}>{children}</h3>;
		}
		case 4: {
			return <h4 className={clsx(headingVariants({ size }), className)} {...props}>{children}</h4>;
		}
		case 5: {
			return <h5 className={clsx(headingVariants({ size }), className)} {...props}>{children}</h5>;
		}
		case 6: {
			return <h6 className={clsx(headingVariants({ size }), className)} {...props}>{children}</h6>;
		}
		default: {
			return <h1 className={clsx(headingVariants({ size }), className)} {...props}>{children}</h1>;
		}
	}
}
