"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { CheckIcon } from "@/components/ui/icons/check";
import { MinusIcon } from "@/components/ui/icons/minus";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import type { CompoundProps } from "@/components/ui/types";
import { useRippleAnimate } from "@/components/ui/use-ripple-animate";
import { Variants as SharedVariants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { FieldLabel } from "../label";
import type { FieldMessage } from "../message";

export { Popover } from "../popover";

// TODO сделать правила теней для разных цветов (shadow-focus-danger - не работает)
const checkboxVariants = cva(
	"rounded-full invalid:focus-visible:shadow-focus-danger sfc-ripple focus-visible:ring-6d checkbox-box [--bg-opacity:0] lifted-trigger before:rounded-full after:content-[''] after:absolute after:inset-0 after:rounded-full after:pointer-events-none group sfc-subtle hover:[--bg-opacity:.4] focus-visible:[--bg-opacity:.4] active:[--bg-opacity:.5]",
	{
		variants: {
			disabled: {
				true: "sfc-disabled pointer-events-none",
			},
			loading: {
				true: null,
			},
		},
		compoundVariants: [
			{
				disabled: true,
				loading: true,
				className: "bg-transparent",
			},
			{
				loading: true,
				disabled: false,
				className: "after:shimmer-bg ![--bg-opacity:.4]",
			},
		],
		defaultVariants: {
			disabled: false,
			loading: false,
		},
	},
);

const indicatorVariants = cva(
	"flex items-center justify-center relative —rel-elevation-4 —base-elevation-4 group-hover:—rel-elevation-7 group-active:—rel-elevation-1",
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
				true: "sfc-solid",
				false: "sfc-outlined bg-background-1000d dark:bg-foreground-0d",
			},
			outlined: {
				true: "sfc-border",
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
export type Variants = FlattenIntersection<
	CheckboxVariants &
		FieldLabel.Variants &
		IndicatorVariants &
		FieldMessage.Variants
>;
export type Props = FlattenIntersection<
	Variants &
		Omit<BaseCheckbox.Root.Props, "className" | "children" | "render"> &
		CompoundProps & {
			required?: boolean;
			animated?: boolean;
		}
>;

const CheckboxFieldContext = createContext<Variants | null>(null);

const useCheckboxFieldProps = () => {
	const ctx = useContext(CheckboxFieldContext);
	if (!ctx) throw new Error("Must be inside CheckboxFieldContext.Provider");
	return ctx;
};

export const Root = ({ children, className, ...props }: Props) => {
	return (
		<div
			className={cn(
				"inline-flex flex-col justify-center w-fit",
				SharedVariants.fontSizeVariants(props),
				SharedVariants.semiBoldFontVariants(props),
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
	className,
	animated = true,
	...props
}: BaseCheckbox.Root.Props & Variants & { animated?: boolean }) => {
	const mergedProps = {
		...useCheckboxFieldProps(),
		...props,
	};
	const { solid, outlined, flat, loading, ...checkboxProps } = mergedProps;
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
				mergedProps.disabled && "cursor-not-allowed",
				className,
			)}
		>
			<BaseCheckbox.Root
				ref={effects.ref}
				className={cn(
					checkboxVariants(mergedProps),
					SharedVariants.emphasisSurfaceVariants(mergedProps),
					SharedVariants.intentSurfaceVariants(mergedProps),
					SharedVariants.surfaceCursorVariants(mergedProps),
				)}
				{...checkboxProps}
				{...effects}
				nativeButton
				render={<button type="button" />}
				disabled={mergedProps.disabled ?? undefined}
			>
				<div className={cn(indicatorVariants(mergedProps))}>
					<BaseCheckbox.Indicator>
						{props.indeterminate ? (
							<MinusIcon size={1} strokeWidth={2.75} />
						) : (
							<CheckIcon size={1} strokeWidth={2.75} />
						)}
					</BaseCheckbox.Indicator>
				</div>
			</BaseCheckbox.Root>
			{loading && mergedProps.disabled && (
				<SpinnerIcon
					className="animate-spin absolute z-1 pointer-events-none"
					size={0.8}
				/>
			)}
		</div>
	);
};

export const Label = ({
	className,
	children,
	...props
}: CompoundProps & FieldLabel.Props) => {
	const mergedProps = { ...useCheckboxFieldProps(), ...props };
	return (
		<FieldLabel
			{...mergedProps}
			className={cn(
				"relative inline-flex items-center gap-[.25em]",
				mergedProps.shape === "circular" && "first-letter:ms-[.525em]",
				mergedProps.required &&
					"after:content-['✺_'] after:sfc-text-danger-450d",
				className,
			)}
		>
			{children}
		</FieldLabel>
	);
};

export const Message = ({
	children,
	className,
	...props
}: CompoundProps &
	SharedVariants.EmphasisSurface &
	SharedVariants.IntentSurface &
	SharedVariants.Size) => {
	const mergedProps = { ...useCheckboxFieldProps(), ...props };
	return (
		<p
			className={cn(
				"w-fit h-[2.75em] -mt-[1.75em] pt-[1.5em] w-full transition-all duration-500 ps-[2.75em] sfc-outlined inline-flex items-center gap-[.5ch] leading-[1]",
				SharedVariants.emphasisSurfaceVariants(mergedProps),
				SharedVariants.intentSurfaceVariants(mergedProps),
				SharedVariants.mediumFontVariants(mergedProps),
				className,
			)}
		>
			{children}
		</p>
	);
};

export const PopoverMessage = ({
	children,
	className,
	...props
}: Popover.Portal.Props) => {
	const mergedProps = { ...useCheckboxFieldProps(), ...props };
	return (
		<Popover.Portal {...mergedProps} className={className}>
			{children}
		</Popover.Portal>
	);
};
