"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
// import { useRippleAnimate } from "@/components/ui/use-ripple-animate";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { useRippleAnimate } from "../use-ripple-animate";
import { Variants } from "../variants";

const buttonVariants = cva("sfc-ripple", {
	variants: {
		width: {
			fit: "trigger-box-fit",
			narrow: "trigger-box-narrow",
			normal: "trigger-box-normal",
			wide: "trigger-box-wide",
			fill: "trigger-box-fill",
		},
		shape: {
			square: null,
			rounded: "sfc-rounded",
			circular: "sfc-circular",
		},
		solid: {
			true: "sfc-solid lifted-trigger",
		},
		outlined: {
			true: "after:sfc-border",
		},
		disabled: {
			true: "sfc-disabled pointer-events-none",
		},
		loading: {
			true: null,
		},
		flat: {
			true: null,
		},
	},
	compoundVariants: [
		{
			loading: true,
			disabled: false,
			className: "shimmer-bg",
		},
		{
			outlined: false,
			solid: false,
			className: "sfc-text lifted-text ",
		},
		{
			outlined: true,
			solid: false,
			className: "sfc-outlined lifted-trigger",
		},
		{
			flat: false,
			solid: false,
			outlined: false,
			className: "drop-shadow",
		},
		{
			flat: false,
			solid: true,
			className: "sfc-shadow",
		},
		{
			flat: false,
			solid: false,
			outlined: true,
			className: "sfc-shadow",
		},
	],
	defaultVariants: {
		shape: "rounded",
		width: "normal",
		disabled: false,
		loading: false,
		outlined: false,
		solid: false,
		flat: false,
	},
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = FlattenIntersection<
	React.ComponentProps<"button"> &
		ButtonVariants &
		Variants.IntentSurface &
		Variants.EmphasisSurface &
		Variants.Size & { animated?: boolean }
>;

export function Button({
	children,
	className,
	animated = true,
	solid,
	outlined,
	loading,
	size,
	width,
	flat,
	emphasis,
	shape,
	intent,
	...props
}: ButtonProps) {
	const effects = useRippleAnimate({
		animateClassName: `before:animate-ripple`,
		onKeyDown: props.onKeyDown,
		onKeyUp: props.onKeyUp,
		onMouseDown: props.onMouseDown,
		onMouseUp: props.onMouseUp,
		animated: (!outlined && !solid) || !animated,
	});
	return (
		<div
			className={cn(
				"items-center justify-center",
				width === "fill" ? "flex w-full" : "inline-flex",
				props.disabled && "cursor-not-allowed",
				className,
			)}
		>
			<button
				className={cn(
					Variants.interactiveIntentSurfaceVariants({ intent }),
					Variants.emphasisSurfaceVariants({ emphasis }),
					Variants.fontSizeVariants({ size }),
					Variants.semiBoldFontVariants({ size }),
					Variants.surfaceCursorVariants({
						disabled: props.disabled,
						loading,
					}),
					buttonVariants({
						className,
						disabled: props.disabled,
						shape,
						width,
						loading,
						flat,
						outlined,
						solid,
					}),
				)}
				{...props}
				{...effects}
			>
				{children}
			</button>
			{loading && props.disabled && (
				<SpinnerIcon className="animate-spin absolute pointer-events-none" />
			)}
		</div>
	);
}
