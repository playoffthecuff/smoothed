"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { useRippleAnimate } from "@/components/ui/use-ripple-animate";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { Variants } from "../../variants";

const rootVariants = cva("flex leading-none h-fit", {
	variants: {
		shape: {
			square: null,
			rounded:
				"[&>div:first-child>button]:sfc-rounded-s [&>div:last-child>button]:sfc-rounded-e [--rounding:.5em]",
			circular:
				"[&>div:first-child>button]:rounded-s-full [&>div:last-child>button]:rounded-e-full [&>div:first-child>button:before]:rounded-s-full [&>div:last-child>button:before]:rounded-e-full",
		},
		outlined: {
			true: "[&>div:not(:last-child)>button]:border-e-0",
		},
		disabled: { true: "sfc-disabled" },
	},
	defaultVariants: {
		shape: "rounded",
	},
});
type RootVariants = VariantProps<typeof rootVariants>;

const toggleVariants = cva("sfc-ripple focus-visible:ring-6d trigger-box", {
	variants: {
		pressedIntent: {
			accent: "data-[pressed]:sfc-color-accent-on-accent-ia",
			neutral: "data-[pressed]:sfc-color-neutral-on-neutral-ia",
			info: "data-[pressed]:sfc-color-info-on-info-ia",
			success: "data-[pressed]:sfc-color-success-on-success-ia",
			warning: "data-[pressed]:sfc-color-warning-on-warning-ia",
			danger: "data-[pressed]:sfc-color-danger-on-danger-ia",
		},
		solid: {
			true: "lowered-toggle",
		},
		outlined: {
			true: "sfc-border",
		},
		disabled: {
			true: "pointer-events-none",
		},
		loading: {
			true: "shimmer-bg",
		},
		toggleEffect: {
			fill: "[&[data-pressed]>svg]:fill-current",
			background:
				"toggle-state not-[[data-pressed]]:sfc-outlined not-[[data-pressed]]:sfc-border [--border-divider:2.4] dark:[--border-divider:8]",
			none: null,
		},
		flat: { true: null },
	},
	compoundVariants: [
		{ toggleEffect: ["fill", "none"], solid: true, className: "sfc-solid" },
		{
			solid: true,
			toggleEffect: "background",
			className: "sfc-solid",
		},
		{
			outlined: true,
			solid: false,
			className: "sfc-outlined lowered-toggle",
		},
		{
			outlined: false,
			solid: false,
			className: "sfc-text lifted-text",
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
			className: "lowered-toggle sfc-shadow",
		},
		{
			flat: false,
			solid: false,
			outlined: true,
			className: "sfc-shadow",
		},
	],
	defaultVariants: {
		solid: false,
		flat: false,
		outlined: false,
		toggleEffect: "fill",
	},
});
type ToggleVariants = VariantProps<typeof toggleVariants>;

const toggleWrapperVariants = cva("inline-flex", {
	variants: {
		shape: {
			square: null,
			rounded: "sfc-rounded",
			circular: "sfc-circular",
		},
		disabled: {
			true: "cursor-not-allowed",
		},
	},
	defaultVariants: {
		shape: "rounded",
	},
});

export type ToggleGroupProps = FlattenIntersection<
	Omit<ToggleContextProps, "value"> & BaseToggleGroup.Props
>;

export type ToggleContextProps = FlattenIntersection<
	ToggleVariants &
		RootVariants &
		Variants.IntentSurface &
		Variants.EmphasisSurface &
		Variants.SurfaceShape &
		Variants.Size & {
			groupValue?: ToggleGroupProps["value"];
			loading?: boolean;
			animated?: boolean;
		}
>;

const ToggleGroupContext = createContext<ToggleContextProps | null>(null);

export function Root({
	children,
	className,
	value,
	orientation,
	loopFocus,
	multiple,
	defaultValue,
	onValueChange,
	render,
	animated = true,
	...props
}: ToggleGroupProps) {
	return (
		<ToggleGroupContext.Provider
			value={{ ...props, animated, groupValue: value || defaultValue }}
		>
			<BaseToggleGroup
				className={cn(
					rootVariants(props),
					Variants.surfaceCursorVariants(props),
					Variants.fontSizeVariants(props),
					Variants.semiBoldFontVariants(props),
					className,
				)}
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				render={render}
				orientation={orientation}
				disabled={props.disabled}
				multiple={multiple}
				loopFocus={loopFocus}
			>
				{children}
			</BaseToggleGroup>
		</ToggleGroupContext.Provider>
	);
}

type BaseToggleProps = BaseToggle.Props;

type ToggleProps = FlattenIntersection<BaseToggleProps>;

export function Toggle({
	className,
	children,
	onPressedChange,
	defaultPressed,
	pressed,
	nativeButton,
	value,
	...props
}: ToggleProps) {
	const ctxProps = useContext(ToggleGroupContext);
	if (!ctxProps) throw new Error("must be within ToggleGroup context provider");
	const effects = useRippleAnimate({
		animateClassName: `before:animate-ripple`,
		onKeyDown: props.onKeyDown,
		onKeyUp: props.onKeyUp,
		onMouseDown: props.onMouseDown,
		onMouseUp: props.onMouseUp,
		animated: (!ctxProps.outlined && !ctxProps.solid) || !ctxProps.animated,
	});
	return (
		<div className={cn(toggleWrapperVariants(props), className)}>
			<BaseToggle
				data-slot="button"
				className={cn(
					toggleVariants({
						...props,
						...ctxProps,
					}),
					Variants.emphasisSurfaceVariants(ctxProps),
					Variants.interactiveIntentSurfaceVariants(ctxProps),
					Variants.surfaceCursorVariants(ctxProps),
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
		</div>
	);
}
