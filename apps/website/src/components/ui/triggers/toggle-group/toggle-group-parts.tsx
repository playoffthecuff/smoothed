"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { useRippleAnimate } from "@/components/ui/use-ripple-animate";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { Variants } from "../../variants";

type BaseToggleGroupNames =
	| "defaultValue"
	| "value"
	| "children"
	| "onValueChange"
	| "loopFocus"
	| "multiple"
	| "orientation"
	| "className"
	| "disabled"
	| "render";

type PickBaseToggleProps = Pick<BaseToggleGroup.Props, BaseToggleGroupNames>;

type Shape = "square" | "rounded" | "circular";

export type ToggleGroupProps = FlattenIntersection<
	Omit<ToggleContextProps, "value"> & PickBaseToggleProps
>;

type ToggleAppearance = Pick<
	ToggleProps,
	| "animated"
	| "emphasis"
	| "flat"
	| "outlined"
	| "size"
	| "solid"
	| "toggleEffect"
	| "pressedIntent"
	| "intent"
>;

export type ToggleContextProps = FlattenIntersection<
	ToggleAppearance & {
		groupValue?: ToggleGroupProps["value"];
		pressedIntent?: ToggleProps["intent"];
		shape?: Shape;
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
	disabled,
	defaultValue,
	shape,
	onValueChange,
	render,
	...toggleProps
}: ToggleGroupProps) {
	return (
		<ToggleGroupContext.Provider
			value={{ ...toggleProps, groupValue: value || defaultValue }}
		>
			<BaseToggleGroup
				className={cn(
					"flex leading-none h-fit sfc-border p-[0.1em]",
					(shape === "rounded" || !shape) &&
						"rounded-[0.5em] [&>div:first-child>button]:sfc-rounded-s [&>div:last-child>button]:sfc-rounded-e",
					shape === "circular" &&
						"rounded-full [&>div:first-child>button]:rounded-s-full [&>div:last-child>button]:rounded-e-full [&>div:first-child>button:before]:rounded-s-full [&>div:last-child>button:before]:rounded-e-full",
					toggleProps.outlined && "[&>div:not(:last-child)>button]:border-e-0",
					className,
				)}
				value={value}
				defaultValue={defaultValue}
				onValueChange={onValueChange}
				render={render}
				orientation={orientation}
				disabled={disabled}
				multiple={multiple}
				loopFocus={loopFocus}
			>
				{children}
			</BaseToggleGroup>
		</ToggleGroupContext.Provider>
	);
}

const toggleVariants = cva(null, {
	variants: {
		disabled: { true: "sfc-disabled" },
		pressedIntent: {
			accent: "data-[pressed]:sfc-color-accent-on-accent-ia",
			neutral: "data-[pressed]:sfc-color-neutral-on-neutral-ia",
			info: "data-[pressed]:sfc-color-info-on-info-ia",
			success: "data-[pressed]:sfc-color-success-on-success-ia",
			warning: "data-[pressed]:sfc-color-warning-on-warning-ia",
			danger: "data-[pressed]:sfc-color-danger-on-danger-ia",
		},
		solid: {
			true: "trigger-box sfc-ia",
		},
		outlined: {
			true: "sfc-border",
		},
		toggleEffect: {
			fill: "[&[data-pressed]>svg]:fill-current",
			background: "toggle-state",
			none: null,
		},
		flat: { false: "sfc-shadow" },
	},
	compoundVariants: [
		{
			solid: true,
			toggleEffect: ["fill", "none"],
			className: "sfc-solid",
		},
		{
			solid: true,
			toggleEffect: "background",
			className: "sfc-toggle",
		},
		{
			outlined: true,
			solid: false,
			className: "trigger-box sfc-ia sfc-outlined",
		},
		{
			solid: false,
			outlined: false,
			className:
				"sfc-text leading-16d h-fit cursor-pointer outlined-none transition-all",
		},
		{
			flat: false,
			solid: false,
			outlined: false,
			className: "lifted-text-trigger",
		},
		{
			flat: false,
			solid: true,
			className: "lowered-toggle",
		},
	],
	defaultVariants: {
		solid: true,
		flat: false,
		outlined: false,
		toggleEffect: "fill",
	},
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

type BaseTogglePropNames =
	| "value"
	| "defaultPressed"
	| "pressed"
	| "onPressedChange"
	| "nativeButton"
	| "disabled"
	| "className"
	| "style"
	| "render"
	| "children"
	| "onMouseDown"
	| "onMouseUp"
	| "onKeyDown"
	| "onKeyUp";

type BaseToggleProps = Pick<BaseToggle.Props, BaseTogglePropNames>;

type ToggleProps = FlattenIntersection<
	BaseToggleProps &
		ToggleVariants &
		Variants.EmphasisSurface &
		Variants.IntentSurface &
		Variants.Size & { loading?: boolean; animated?: boolean }
>;

export function Toggle({
	className,
	children,
	onPressedChange,
	defaultPressed,
	pressed,
	nativeButton,
	value,
	onMouseDown,
	onMouseUp,
	onKeyDown,
	onKeyUp,
	...props
}: Omit<ToggleProps, keyof ToggleAppearance>) {
	const ctxProps = useContext(ToggleGroupContext);
	if (!ctxProps) throw new Error("must be within ToggleGroup context provider");
	const effects = useRippleAnimate({
		animateClassName: `before:animate-ripple`,
		onKeyDown,
		onKeyUp,
		onMouseDown,
		onMouseUp,
		disabled: (!ctxProps.outlined && !ctxProps.solid) || !ctxProps.animated,
	});
	return (
		<div
			className={cn(
				"inline-flex",
				props.disabled && "cursor-not-allowed",
				ctxProps.shape === "rounded" && "sfc-rounded",
				ctxProps.shape === "circular" && "rounded-full before:rounded-full",
				className,
			)}
		>
			<BaseToggle
				data-slot="button"
				className={cn(
					toggleVariants({
						...props,
						...ctxProps,
					}),
					Variants.emphasisSurfaceVariants(ctxProps),
					Variants.intentSurfaceVariants(ctxProps),
					Variants.fontSizeVariants(ctxProps),
					Variants.semiBoldFontVariants(ctxProps),
					props.loading && "cursor-wait",
					props.disabled && "pointer-events-none",
				)}
				disabled={props.disabled}
				{...effects}
				onPressedChange={onPressedChange}
				value={value}
				defaultPressed={defaultPressed}
				pressed={pressed}
				nativeButton={nativeButton}
			>
				{props.loading ? (
					<>
						<SpinnerIcon className="animate-spin absolute pointer-events-none" />
						<span className="text-transparent">{children}</span>
					</>
				) : (
					children
				)}
			</BaseToggle>
		</div>
	);
}
