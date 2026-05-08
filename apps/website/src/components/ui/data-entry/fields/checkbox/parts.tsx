"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { MinusIcon } from "@/components/ui/icons/minus";
import { Popover } from "@/components/ui/overlays/popover";
import type { CompoundProps } from "@/components/ui/types";
import { Variants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { CheckIcon } from "../../../icons/check";
import { SpinnerIcon } from "../../../icons/spinner";
import { useRippleAnimate } from "../../../use-ripple-animate";
import { FieldLabel, type LabelProps } from "../label";
import type { FieldMessageProps } from "../message";

const checkboxVariants = cva(
	"rounded-full invalid:focus-visible:shadow-focus-error sfc-ripple checkbox-box [--bg-opacity:0.33] lifted-trigger before:rounded-full after:content-[''] after:absolute after:inset-0 after:rounded-full after:pointer-events-none",
	{
		variants: {
			disabled: {
				true: "sfc-disabled pointer-events-none",
			},
			solid: {
				true: null,
			},
			outlined: {
				true: "sfc-outlined-checkbox",
			},
			loading: {
				false: "not-hover:[--bg-opacity:0]",
			},
		},
		compoundVariants: [
			{
				solid: true,
				outlined: false,
				className: "sfc-solid-checkbox",
			},
			{
				outlined: false,
				solid: false,
				className: "sfc-outlined-checkbox",
			},
			{
				disabled: true,
				loading: true,
				className: "bg-transparent",
			},
			{
				loading: true,
				disabled: false,
				className: "after:shimmer-bg",
			},
		],
		defaultVariants: {
			outlined: false,
			solid: false,
			disabled: false,
			loading: false,
		},
	},
);

const indicatorVariants = cva(
	"flex items-center justify-center relative —rel-elevation-4 —base-elevation-4 hover:—rel-elevation-7 active:—rel-elevation-1",
	{
		variants: {
			loading: {
				true: null,
			},
			disabled: {
				true: null,
			},
			shape: {
				square: "w-[1.32em] h-[1.32em]",
				rounded: "rounded-[calc(0.2em*var(--radius))] w-[1.32em] h-[1.32em]",
				circular: "rounded-full w-[1.5em] h-[1.5em]",
			},
			solid: {
				true: null,
			},
			outlined: {
				true: "sfc-outlined sfc-border bg-background-1000d dark:bg-foreground-0d",
			},
			flat: {
				false: "sfc-shadow",
			},
		},
		compoundVariants: [
			{
				loading: true,
				disabled: true,
				className: "text-transparent",
			},
			{
				outlined: false,
				solid: true,
				className: "sfc-solid",
			},
			{
				outlined: false,
				solid: false,
				className: "sfc-outlined",
			},
			{
				outlined: false,
				solid: false,
				flat: true,
				className: "sfc-border bg-background-1000d dark:bg-foreground-0d",
			},
		],
		defaultVariants: {
			shape: "rounded",
			outlined: false,
			solid: false,
			flat: false,
			loading: false,
			disabled: false,
		},
	},
);

type IndicatorVariants = VariantProps<typeof indicatorVariants>;

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export type CheckboxFieldProps = FlattenIntersection<
	CheckboxVariants &
		LabelProps &
		IndicatorVariants &
		FieldMessageProps & { required?: boolean }
>;

const CheckboxFieldContext = createContext<CheckboxFieldProps | null>(null);

const useCheckboxFieldProps = () => {
	const ctx = useContext(CheckboxFieldContext);
	if (!ctx) throw new Error("Must be inside CheckboxFieldContext.Provider");
	return ctx;
};

export const Root = ({
	children,
	className,
	...props
}: CheckboxFieldProps & CompoundProps) => {
	return (
		<div
			className={cn(
				"inline-flex flex-col justify-center w-fit",
				Variants.fontSizeVariants(props),
				Variants.semiBoldFontVariants(props),
				className,
			)}
		>
			<CheckboxFieldContext.Provider value={props}>
				{children}
			</CheckboxFieldContext.Provider>
		</div>
	);
};

export const Checkbox = ({
	animated = true,
	...props
}: BaseCheckbox.Root.Props & { animated?: boolean }) => {
	const ctxProps = useCheckboxFieldProps();
	const effects = useRippleAnimate({
		animateClassName: "before:animate-ripple",
		animated: !animated,
		onKeyDown: props.onKeyDown,
		onKeyUp: props.onKeyUp,
		onMouseDown: props.onMouseDown,
		onMouseUp: props.onMouseUp,
	});
	return (
		<div
			className={cn(
				"relative flex items-center justify-center",
				ctxProps.disabled && "cursor-not-allowed",
			)}
		>
			<BaseCheckbox.Root
				ref={effects.ref}
				className={cn(
					checkboxVariants(ctxProps),
					Variants.emphasisSurfaceVariants(ctxProps),
					Variants.intentSurfaceVariants(ctxProps),
					Variants.surfaceCursorVariants(ctxProps),
				)}
				{...props}
				{...effects}
				id={ctxProps.id}
				name={ctxProps.name}
			>
				<div className={cn(indicatorVariants(ctxProps))}>
					<BaseCheckbox.Indicator>
						{props.indeterminate ? (
							<MinusIcon size={1} strokeWidth={2.75} />
						) : (
							<CheckIcon size={1} strokeWidth={2.75} />
						)}
					</BaseCheckbox.Indicator>
				</div>
			</BaseCheckbox.Root>
			{ctxProps.loading && ctxProps.disabled && (
				<SpinnerIcon
					className="animate-spin absolute z-1 pointer-events-none"
					size={0.8}
				/>
			)}
		</div>
	);
};

export const Label = ({ className, children }: CompoundProps) => {
	const props = useCheckboxFieldProps();
	return (
		<FieldLabel
			{...props}
			className={cn(
				"relative inline-flex items-center gap-[.25em]",
				props.shape === "circular" && "first-letter:ms-[.525em]",
				props.required && "after:content-['✺_'] after:sfc-text-danger-450d",
				className,
			)}
		>
			{children}
		</FieldLabel>
	);
};

export const Message = ({ children, className }: CompoundProps) => {
	const props = useCheckboxFieldProps();
	return (
		<p
			className={cn(
				"w-fit h-[2.75em] -mt-[1.75em] pt-[1.5em] w-full transition-all duration-500 ps-[2.75em] sfc-outlined inline-flex items-center gap-[.5ch] leading-[1]",
				Variants.emphasisSurfaceVariants(props),
				Variants.intentSurfaceVariants(props),
				className,
			)}
		>
			{children}
		</p>
	);
};

interface PopoverProps extends CompoundProps {
	open?: boolean;
}

const PopoverRoot = ({ children, open, className }: PopoverProps) => {
	return (
		<Popover.Root open={open}>
			<Popover.Trigger className={className}>{children}</Popover.Trigger>
		</Popover.Root>
	);
};

export { PopoverRoot as Popover };

export const PopoverMessage = ({ children }: CompoundProps) => {
	const props = useCheckboxFieldProps();
	return <Popover.Portal {...props}>{children}</Popover.Portal>;
};
