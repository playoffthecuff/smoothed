"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { useRippleAnimate } from "../use-ripple-animate";
import { Variants } from "../variants";

export const toggleVariants = cva("sfc-ripple trigger-box", {
	variants: {
		shape: {
			square: null,
			rounded: "sfc-rounded",
			circular: "sfc-circular",
		},
		pressedIntent: {
			accent: "data-[pressed]:sfc-color-accent-on-accent-ia",
			neutral: "data-[pressed]:sfc-color-neutral-on-neutral-ia",
			info: "data-[pressed]:sfc-color-info-on-info-ia",
			success: "data-[pressed]:sfc-color-success-on-success-ia",
			warning: "data-[pressed]:sfc-color-warning-on-warning-ia",
			danger: "data-[pressed]:sfc-color-danger-on-danger-ia",
		},
		solid: {
			true: "sfc-solid lifted-trigger",
		},
		outlined: {
			true: "after:sfc-border",
		},
		disabled: { true: "sfc-disabled pointer-events-none" },
		loading: { true: null },
		flat: {
			true: null,
		},
		toggleEffect: {
			fill: "[&[data-pressed]>svg]:fill-current",
			background:
				"toggle-state not-[[data-pressed]]:sfc-outlined dark:not-[data-pressed]:base-elevation-0",
			none: null,
		},
	},
	compoundVariants: [
		{ disabled: true, loading: true, className: "text-transparent" },
		{
			loading: true,
			disabled: false,
			className: "shimmer-bg",
		},
		{
			outlined: false,
			solid: false,
			className: "sfc-text lifted-text",
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
		toggleEffect: "fill",
		disabled: false,
		loading: false,
		flat: false,
		solid: false,
		outlined: false,
	},
});

export type ToggleVariants = VariantProps<typeof toggleVariants>;

export type ToggleProps = FlattenIntersection<
	BaseToggle.Props &
		ToggleVariants &
		Variants.IntentSurface &
		Variants.EmphasisSurface &
		Variants.Size & {
			loading?: boolean;
			animated?: boolean;
		}
>;

export function Toggle({
	className,
	children,
	animated = true,
	onPressedChange,
	defaultPressed,
	pressed,
	nativeButton,
	value,
	...props
}: ToggleProps) {
	const effects = useRippleAnimate({
		animateClassName: `before:animate-ripple`,
		onKeyDown: props.onKeyDown,
		onKeyUp: props.onKeyUp,
		onMouseDown: props.onMouseDown,
		onMouseUp: props.onMouseUp,
		animated: (!props.outlined && !props.solid) || !animated,
	});
	return (
		<div
			className={cn(
				"inline-flex items-center justify-center",
				props.disabled && "cursor-not-allowed",
				className,
			)}
		>
			<BaseToggle
				data-slot="button"
				className={cn(
					Variants.interactiveIntentSurfaceVariants(props),
					Variants.emphasisSurfaceVariants(props),
					Variants.fontSizeVariants(props),
					Variants.semiBoldFontVariants(props),
					toggleVariants(props),
					Variants.surfaceCursorVariants(props),
				)}
				disabled={props.disabled}
				onPressedChange={onPressedChange}
				value={value}
				defaultPressed={defaultPressed}
				pressed={pressed}
				nativeButton={nativeButton}
				{...effects}
			>
				{children}
			</BaseToggle>
			{props.loading && props.disabled && (
				<SpinnerIcon className="animate-spin absolute pointer-events-none" />
			)}
		</div>
	);
}
