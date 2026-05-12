"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import { HintButton } from "@/components/ui/triggers/hint-button";
import type { CompoundProps } from "@/components/ui/types";
import { Variants as SharedVariants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { FieldLabel } from "../label";
import { FieldMessage } from "../message";

export { Popover } from "../popover";

const inputVariants = cva(
	"justify-end focus-within:after:ring-6d transition-all lowered-text-input",
	{
		variants: {
			flat: {
				false: "sfc-shadow",
			},
			outlined: {
				true: "after:sfc-border",
			},
			solid: {
				true: "sfc-solid",
				false: "sfc-outlined",
			},
			// TODO implement inline input - add width=fit prop to every possible component
			disabled: {
				true: "sfc-disabled pointer-events-none",
			},
			ringed: {
				true: "after:ring-6d",
			},
		},
		compoundVariants: [
			{
				flat: true,
				solid: false,
				outlined: false,
				className: "outlined-sfc",
			},
		],
		defaultVariants: {
			solid: false,
			outlined: false,
			flat: false,
			disabled: false,
		},
	},
);
export type Variants = VariantProps<typeof inputVariants> &
	SharedVariants.EmphasisSurface &
	SharedVariants.IntentSurface &
	SharedVariants.Size &
	SharedVariants.InputWidth &
	SharedVariants.SurfaceCursor &
	SharedVariants.SurfaceShape;
export type Props = FlattenIntersection<
	Variants & {
		type?: "text" | "password" | "search" | "email" | "tel" | "url";
	} & Omit<
			React.ComponentProps<"input">,
			"type" | "className" | "children" | "width" | "size"
		> &
		CompoundProps
>;

const TextFieldContext = createContext<Variants | null>(null);

const useTextFieldProps = () => {
	const ctx = useContext(TextFieldContext);
	if (!ctx) throw new Error("Must be inside TextFieldContext.Provider");
	return ctx;
};

export const Root = ({ children, className, ...props }: Props) => (
	<TextFieldContext.Provider value={props}>
		<div
			className={cn(
				SharedVariants.fontSizeVariants(props),
				SharedVariants.semiBoldFontVariants(props),

				"flex-col",
				props.width === "fill" ? "flex" : "inline-flex w-min",
				"justify-center items-center",
				className,
			)}
		>
			{children}
		</div>
	</TextFieldContext.Provider>
);

export const Control = ({ className, children, ...props }: Props) => {
	const mergedProps = { ...useTextFieldProps(), ...props };
	return (
		<div
			className={cn(
				"flex relative justify-end items-center",
				SharedVariants.surfaceCursorVariants(mergedProps),
			)}
		>
			<div
				className={cn(
					inputVariants(mergedProps),
					SharedVariants.emphasisSurfaceVariants(mergedProps),
					SharedVariants.interactiveIntentSurfaceVariants(mergedProps),
					SharedVariants.inputWidthVariants(mergedProps),
					SharedVariants.surfaceShapeVariants(mergedProps),
					mergedProps.loading && !mergedProps.disabled && "shimmer-bg",
					className,
				)}
			>
				{children}
			</div>
			{mergedProps.loading && mergedProps.disabled && (
				<div className="h-full absolute flex items-center justify-center aspect-square pointer-events-none">
					<SpinnerIcon className="animate-spin" />
				</div>
			)}
		</div>
	);
};

export const Input = ({ className, children, ...props }: Props) => {
	const {
		emphasis,
		intent,
		flat,
		loading,
		outlined,
		solid,
		disabled,
		ringed,
		size,
		shape,
		...ctxProps
	} = useTextFieldProps();
	return (
		<input
			className={cn(
				"text-input-box sfc-intent-selection",
				loading && "not-focus:cursor-wait",
				className,
			)}
			disabled={disabled || props.disabled}
			{...ctxProps}
			{...props}
			width={undefined}
			size={undefined}
		/>
	);
};

export const InputContent = ({ children, className }: CompoundProps) => (
	<div
		className={cn(
			"relative h-full flex items-center justify-center",
			className,
		)}
	>
		{children}
	</div>
);

export const Hint = ({
	children,
	className,
	...props
}: CompoundProps & Variants) => {
	const ctxProps = useTextFieldProps();
	return (
		<InputContent className={cn("aspect-square", className)}>
			<HintButton
				className="rounded-s-none"
				{...ctxProps}
				{...props}
				loading={undefined}
			>
				{children}
			</HintButton>
		</InputContent>
	);
};

export const Label = ({ className, children, ...props }: FieldLabel.Props) => {
	const mergedProps = { ...useTextFieldProps(), ...props };
	return (
		<FieldLabel
			className={cn(
				"w-full",
				mergedProps.shape === "circular" && "first-letter:ms-[.525em]",
				mergedProps.required &&
					"before:content-['✺_'] before:sfc-text-danger-450d",
				className,
			)}
			{...mergedProps}
		>
			{children}
		</FieldLabel>
	);
};

export const Message = ({
	children,
	className,
	...props
}: FieldMessage.Props) => {
	const mergedProps = { ...useTextFieldProps(), ...props };
	return (
		<FieldMessage
			className={cn(
				"h-[3.5em] -mt-[2em] pt-[2em] w-full transition-all duration-500",
				!children && "bg-transparent",
				(mergedProps.shape === "circular" ||
					mergedProps.solid ||
					mergedProps.outlined) &&
					"ps-[.525em]",
				className,
			)}
			{...mergedProps}
		>
			{children}
		</FieldMessage>
	);
};

export const PopoverMessage = ({
	children,
	className,
	...props
}: Popover.Portal.Props) => {
	const mergedProps = { ...useTextFieldProps(), ...props };
	return (
		<Popover.Portal {...mergedProps} className={className}>
			{children}
		</Popover.Portal>
	);
};
