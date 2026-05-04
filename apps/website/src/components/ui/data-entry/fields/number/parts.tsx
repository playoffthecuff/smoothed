"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import type { IconProps } from "@/components/ui/icons/types";
import { Popover } from "@/components/ui/overlays/popover";
import { HintButton } from "@/components/ui/triggers/hint-button";
import { Variants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { FieldLabel } from "../label";
import { FieldMessage } from "../message";

const NumberFieldContext = createContext<NumberFieldProps | null>(null);

const useNumberFieldProps = () => {
	const ctx = useContext(NumberFieldContext);
	if (!ctx) throw new Error("Must be inside NumberField");
	return ctx;
};

export type NumberFieldProps = FlattenIntersection<
	InputVariants &
		Variants.Size &
		Variants.IntentSurface &
		Variants.EmphasisSurface &
		Variants.InputWidth &
		InputWrapperVariants & {
			required?: boolean;
			id?: string;
			name?: string;
		}
>;

export const Root = ({
	children,
	className,
	...props
}: NumberFieldProps & CompoundProps) => {
	return (
		<NumberFieldContext.Provider value={props}>
			<div
				className={cn(
					Variants.fontSizeVariants(props),
					Variants.semiBoldFontVariants(props),
					"flex-col",
					props.width === "fill" ? "flex" : "inline-flex w-min",
					className,
				)}
			>
				{children}
			</div>
		</NumberFieldContext.Provider>
	);
};

interface CompoundProps {
	children?: ReactNode;
	className?: string;
}

export const Label = ({ className, children }: CompoundProps) => {
	const props = useNumberFieldProps();
	return (
		<FieldLabel
			{...props}
			className={cn(
				props.shape === "circular" && "first-letter:ms-[.525em]",
				props.required && "before:content-['✺_'] before:sfc-text-danger-450d",
				className,
			)}
		>
			{children}
		</FieldLabel>
	);
};

export const Hint = ({ children, className }: CompoundProps) => {
	const props = useNumberFieldProps();
	return (
		<HintButton {...props} disabled={false} className={className}>
			{children}
		</HintButton>
	);
};

export const Message = ({ children, className }: CompoundProps) => {
	const props = useNumberFieldProps();
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

const PopoverRoot = ({ children, open }: PopoverProps) => {
	return <Popover.Root open={open}>{children}</Popover.Root>;
};

export { PopoverRoot as Popover };

export const PopoverTrigger = ({ children, className }: CompoundProps) => {
	return <Popover.Trigger className={className}>{children}</Popover.Trigger>;
};

export const PopoverMessage = ({ children }: CompoundProps) => {
	const props = useNumberFieldProps();
	return <Popover.Portal {...props}>{children}</Popover.Portal>;
};

const buttonVariants = cva(
	"relative z-1 first:z-2 last:z-0 flex items-center justify-center cursor-pointer sfc-border h-full aspect-square zero-elevation-5 transition-all rel-elevation-0 base-elevation-0 hover:rel-elevation-10 active:—rel-elevation-4",
	{
		variants: {
			controlsPosition: {
				start: null,
				between: null,
				end: null,
			},
			shape: {
				square: null,
				rounded: "sfc-rounded",
				circular: "rounded-full",
			},
			type: {
				increment: "rounded-s-0",
				decrement: "rounded-e-0",
			},
			solid: {
				true: "sfc-solid",
				false: "sfc-outlined",
			},
			outlined: {
				true: null,
			},
			flat: {
				false: "sfc-shadow",
			},
			disabled: {
				true: "pointer-events-none",
			},
		},
		compoundVariants: [
			{ flat: true, solid: true, className: "border-[var(--border-color)]" },
			{
				type: "increment",
				controlsPosition: "start",
				className: "rounded-0 -ms-[0.075em]",
			},
			{
				type: "decrement",
				controlsPosition: "end",
				className: "rounded-0 -me-[0.075em]",
			},
		],
		defaultVariants: {
			controlsPosition: "between",
			solid: false,
			outlined: false,
			flat: false,
			shape: "rounded",
		},
	},
);

const iconVariants = cva(null, {
	variants: {
		size: {
			xs: "stroke-5d",
			s: "stroke-5d",
			m: "stroke-4d",
			l: "stroke-3.5d",
			xl: "stroke-3d",
		},
		appearance: {
			outlined: null,
			solid: "fill-current",
			hybrid: null,
		},
	},
	defaultVariants: {
		size: "m",
		appearance: "solid",
	},
});

const inputWrapperVariants = cva(
	"focus-within:ring-6d has-[>input:invalid]:ring-6d after:pointer-events-none after:z-1",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded",
				circular: "rounded-full",
			},
			outlined: {
				true: "sfc-outlined",
			},
			solid: {
				true: null,
			},
			disabled: {
				true: "sfc-disabled",
			},
			ringed: {
				true: "ring-6d",
			},
		},
		compoundVariants: [
			{ solid: true, outlined: true, className: "sfc-solid" },
			{ outlined: false, solid: false, className: "[--border-divider:4.8]" },
		],
		defaultVariants: {
			shape: "rounded",
			solid: false,
			outlined: false,
		},
	},
);

const inputVariants = cva(
	"relative grow h-full text-center tabular-nums outline-none placeholder:font-sans px-[0.5em] min-w-0 lowered-number-input transition-all",
	{
		variants: {
			outlined: {
				true: "sfc-border",
			},
			solid: {
				true: "sfc-solid",
				false: "sfc-outlined",
			},
			loading: {
				true: null,
			},
			flat: {
				false: "sfc-shadow",
				true: "sfc-border",
			},
			disabled: {
				true: "pointer-events-none",
			},
			shape: {
				square: null,
				rounded: null,
				circular: null,
			},
			controlsPosition: {
				start: "border-s-0",
				between: "border-x-0",
				end: "border-e-0",
			},
		},
		compoundVariants: [
			{
				disabled: false,
				loading: true,
				className: "cursor-wait shimmer-bg",
			},
			{
				controlsPosition: "start",
				shape: "rounded",
				className: "sfc-rounded rounded-s-0",
			},
			{
				controlsPosition: "end",
				shape: "rounded",
				className: "sfc-rounded rounded-e-0",
			},
			{
				controlsPosition: "end",
				shape: "circular",
				className: "rounded-s-full",
			},
			{
				controlsPosition: "start",
				shape: "circular",
				className: "rounded-e-full",
			},
			{ disabled: true, loading: true, className: "text-transparent" },
		],
		defaultVariants: {
			flat: false,
			outlined: false,
			solid: false,
			disabled: false,
			loading: false,
			shape: "rounded",
			controlsPosition: "between",
		},
	},
);

export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;
type ButtonContent = React.ComponentType<IconProps> | string | number;
type ButtonVariants = VariantProps<typeof buttonVariants>;
type IconVariants = VariantProps<typeof iconVariants>;

type ButtonProps = ButtonVariants &
	IconVariants & {
		content?: ButtonContent;
	};

const FieldDecrement = ({ content: Content, size, ...props }: ButtonProps) => (
	<BaseNumberField.Decrement
		className={buttonVariants({
			...props,
			type: "decrement",
		})}
		disabled={props.disabled ?? undefined}
	>
		{Content &&
			(typeof Content === "string" || typeof Content === "number" ? (
				Content
			) : (
				<Content className={iconVariants({ size })} size={1} />
			))}
	</BaseNumberField.Decrement>
);
const FieldIncrement = ({ content: Content, size, ...props }: ButtonProps) => (
	<BaseNumberField.Increment
		className={buttonVariants({
			...props,
			type: "increment",
		})}
		disabled={props.disabled ?? undefined}
	>
		{Content &&
			(typeof Content === "string" || typeof Content === "number" ? (
				Content
			) : (
				<Content className={iconVariants({ size })} size={1} />
			))}
	</BaseNumberField.Increment>
);

export type InputVariants = VariantProps<typeof inputVariants>;

export type NumberInputProps = FlattenIntersection<
	{
		placeholder?: string;
		decrementContent?: ButtonContent;
		incrementContent?: ButtonContent;
		controlsPosition?: ButtonProps["controlsPosition"];
	} & Pick<
		BaseNumberField.Root.Props,
		| "defaultValue"
		| "onValueChange"
		| "onValueCommitted"
		| "allowWheelScrub"
		| "locale"
		| "snapOnStep"
		| "step"
		| "smallStep"
		| "largeStep"
		| "min"
		| "max"
		| "format"
		| "readOnly"
		| "required"
		| "inputRef"
		| "className"
		| "style"
		| "render"
		| "children"
	>
>;

export const Input = ({
	className,
	placeholder,
	decrementContent = "-",
	incrementContent = "+",
	children,
	...props
}: NumberInputProps) => {
	const ctxProps = useNumberFieldProps();
	const decrement = <FieldDecrement {...ctxProps} content={decrementContent} />;
	const increment = <FieldIncrement {...ctxProps} content={incrementContent} />;
	return (
		<BaseNumberField.Root
			className={cn(
				ctxProps.width !== "fill" &&
					"w-fit inline-flex items-center justify-center",
				"group font-mono",
				ctxProps.disabled && "cursor-not-allowed",
				className,
			)}
			{...props}
			id={ctxProps.id}
			name={ctxProps.name}
			disabled={ctxProps.disabled ?? undefined}
		>
			{children}
			<BaseNumberField.Group
				className={cn(
					inputWrapperVariants({
						...ctxProps,
						ringed: ctxProps.ringed,
					}),
					Variants.interactiveIntentSurfaceVariants(ctxProps),
					Variants.emphasisSurfaceVariants(ctxProps),
					Variants.inputWidthVariants(ctxProps),
				)}
			>
				{ctxProps.controlsPosition !== "end" && decrement}
				{ctxProps.controlsPosition === "start" && increment}
				<BaseNumberField.Input
					className={cn(
						inputVariants(ctxProps),
						ctxProps.intent && "sfc-intent-selection",
					)}
					placeholder={placeholder}
					disabled={ctxProps.disabled ?? undefined}
				/>
				{ctxProps.controlsPosition === "end" && decrement}
				{ctxProps.controlsPosition !== "start" && increment}
			</BaseNumberField.Group>
			{ctxProps.disabled && ctxProps.loading && (
				<SpinnerIcon className="animate-spin z-1 absolute pointer-events-none" />
			)}
		</BaseNumberField.Root>
	);
};
