"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import { HintButton } from "@/components/ui/triggers/hint-button";
import { Variants } from "@/components/ui/variants";
import type { AssignableProps, FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { FieldLabel, type LabelProps } from "../label";
import { FieldMessage } from "../message";

const inputVariants = cva(
	"justify-end focus-within:after:ring-6d transition-all has-[>input:invalid]:after:ring-6d lowered-text-input",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded",
				circular: "rounded-full after:rounded-full",
			},
			flat: {
				false: "sfc-shadow",
			},
			outlined: {
				true: "after:sfc-border lowered-text-input",
			},
			solid: {
				true: "sfc-solid lowered-text-input",
				false: "sfc-outlined",
			},
			// TODO implement inline input - add width=fit prop to every possible component
			disabled: {
				true: "sfc-disabled pointer-events-none",
			},
			loading: {
				true: null,
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
			shape: "rounded",
			solid: false,
			outlined: false,
			flat: false,
			disabled: false,
		},
	},
);
type InputVariants = VariantProps<typeof inputVariants>;

export type InputProps = FlattenIntersection<{
	type?: "text" | "password" | "search" | "email" | "tel" | "url";
}> &
	Pick<
		React.ComponentProps<"input">,
		| "className"
		| "placeholder"
		| "defaultValue"
		| "value"
		| "onChange"
		| "id"
		| "name"
		| "required"
	>;

export type TextInputProps = FlattenIntersection<InputVariants & InputProps>;

type CommonProps = AssignableProps<LabelProps, InputProps>;

export type TextFieldProps = FlattenIntersection<
	InputVariants &
		Variants.EmphasisSurface &
		Variants.IntentSurface &
		Variants.Size &
		Variants.InputWidth &
		CommonProps
>;

const TextFieldContext = createContext<TextFieldProps | null>(null);

function useTextFieldProps() {
	const ctx = useContext(TextFieldContext);
	if (!ctx) throw new Error("Must be inside TextFieldContext.Provider");
	return ctx;
}

export function Root({
	children,
	className,
	...props
}: TextFieldProps & CompoundProps) {
	return (
		<TextFieldContext.Provider value={props}>
			<div
				className={cn(
					Variants.fontSizeVariants(props),
					Variants.semiBoldFontVariants(props),
					Variants.inputWidthVariants(props),
					"flex-col",
					props.width === "fill" ? "flex" : "inline-flex w-min",
					className,
				)}
			>
				{children}
			</div>
		</TextFieldContext.Provider>
	);
}

interface CompoundProps {
	children?: ReactNode;
	className?: string;
}
export const Label = ({ className, children }: CompoundProps) => {
	const props = useTextFieldProps();
	return (
		<FieldLabel
			className={cn(
				props.shape === "circular" && "first-letter:ms-[.525em]",
				props.required && "before:content-['✺_'] before:sfc-text-danger-450d",
				className,
			)}
			required={props.required}
			emphasis={props.emphasis}
		>
			{children}
		</FieldLabel>
	);
};

export const Message = ({ children, className }: CompoundProps) => {
	const props = useTextFieldProps();
	return (
		<FieldMessage
			className={cn(
				"w-fit h-[3.5em] -mt-[2em] pt-[2em] w-full transition-all duration-500",
				!children && "bg-transparent",
				(props.shape === "circular" || props.solid || props.outlined) &&
					"ps-[.525em]",
				className,
			)}
			{...props}
		>
			{children}
		</FieldMessage>
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
	const props = useTextFieldProps();
	return <Popover.Portal {...props}>{children}</Popover.Portal>;
};

export const Control = ({ className, children }: CompoundProps) => {
	const props = useTextFieldProps();
	return (
		<div
			className={cn(
				"relative justify-center items-center",
				props.disabled && "cursor-not-allowed",
				props.width === "fill" ? "flex" : "inline-flex w-fit",
				className,
			)}
		>
			<div
				className={cn(
					inputVariants(props),
					Variants.emphasisSurfaceVariants(props),
					Variants.interactiveIntentSurfaceVariants(props),
					props.loading && !props.disabled && "shimmer-bg",
				)}
			>
				{children}
			</div>
			{props.loading && props.disabled && (
				<div className="h-full absolute flex items-center justify-center aspect-square pointer-events-none">
					<SpinnerIcon className="animate-spin" />
				</div>
			)}
		</div>
	);
};

export const Input = ({
	defaultValue,
	type,
	placeholder,
	className,
}: InputProps) => {
	const props = useTextFieldProps();
	return (
		<input
			className={cn(
				"text-input-box sfc-intent-selection text-medium",
				props.loading && "not-focus:cursor-wait",
				className,
			)}
			type={type}
			id={props.id}
			defaultValue={defaultValue}
			disabled={props.disabled ?? undefined}
			placeholder={placeholder}
		/>
	);
};

export const InputContent = ({ children, className }: CompoundProps) => {
	return (
		<div
			className={cn(
				"relative h-full flex items-center justify-center",
				className,
			)}
		>
			{children}
		</div>
	);
};

export const Hint = ({ children, className }: CompoundProps) => {
	const props = useTextFieldProps();
	return (
		<InputContent className={cn("aspect-square", className)}>
			<HintButton
				className="rounded-s-none"
				{...props}
				loading={undefined}
				openOnHover
				delay={150}
			>
				{children}
			</HintButton>
		</InputContent>
	);
};
