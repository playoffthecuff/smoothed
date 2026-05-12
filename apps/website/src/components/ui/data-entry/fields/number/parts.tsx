"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import type { IconProps } from "@/components/ui/icons/types";
import { Popover } from "@/components/ui/overlays/popover";
import { HintButton } from "@/components/ui/triggers/hint-button";
import { Variants as SharedVariants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { FieldLabel } from "../label";
import { FieldMessage } from "../message";

export { Popover } from "../popover";

const buttonVariants = cva(
	"relative z-1 first:z-2 last:z-0 flex items-center justify-center cursor-pointer sfc-border h-full aspect-square transition-all rel-elevation-0 —base-elevation-9 hover:rel-elevation-10 active:—rel-elevation-4",
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
			{
				outlined: false,
				solid: false,
				className: "[--border-divider:4.8] dark:[--border-divider:32]",
			},
			{
				solid: true,
				outlined: false,
				className: "[--border-divider:4.8] dark:[--border-divider:2.4]",
			},
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

namespace NumberInput {
	type ButtonContent = React.ComponentType<IconProps> | string | number;
	type ButtonVariants = VariantProps<typeof buttonVariants>;
	type IconVariants = VariantProps<typeof iconVariants>;
	export type ButtonProps = ButtonVariants &
		IconVariants & {
			content?: ButtonContent;
		};
	export type Props = FlattenIntersection<
		{
			placeholder?: string;
			decrementContent?: ButtonContent;
			incrementContent?: ButtonContent;
			controlsPosition?: ButtonProps["controlsPosition"];
		} & Omit<BaseNumberField.Root.Props, "render">
	>;
}

type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;
export type Variants = FlattenIntersection<
	InputVariants &
		SharedVariants.Size &
		SharedVariants.IntentSurface &
		SharedVariants.EmphasisSurface &
		SharedVariants.InputWidth &
		InputWrapperVariants
>;
export type Props = FlattenIntersection<Variants & NumberInput.Props>;

type ContextProps = Omit<Props, "className" | "children" | "style">;

const NumberFieldContext = createContext<ContextProps | null>(null);

const useNumberFieldProps = () => {
	const ctx = useContext(NumberFieldContext);
	if (!ctx) throw new Error("Must be inside NumberField");
	return ctx;
};

export const Root = ({
	children,
	className,
	controlsPosition,
	incrementContent = "+",
	decrementContent = "-",
	...props
}: Props) => {
	return (
		<NumberFieldContext.Provider
			value={{ ...props, incrementContent, decrementContent, controlsPosition }}
		>
			<div
				className={cn(
					SharedVariants.fontSizeVariants(props),
					SharedVariants.semiBoldFontVariants(props),
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

export const Label = ({ className, children, ...props }: FieldLabel.Props) => {
	const {
		incrementContent,
		decrementContent,
		controlsPosition,
		...mergedProps
	} = {
		...useNumberFieldProps(),
		...props,
	};
	return (
		<FieldLabel
			{...mergedProps}
			className={cn(
				mergedProps.shape === "circular" && "first-letter:ms-[.525em]",
				mergedProps.required &&
					"before:content-['✺_'] before:sfc-text-danger-450d",
				className,
			)}
		>
			{children}
		</FieldLabel>
	);
};

export const Hint = ({ children, className, ...props }: HintButton.Props) => {
	const {
		incrementContent,
		decrementContent,
		controlsPosition,
		...mergedProps
	} = {
		...useNumberFieldProps(),
		...props,
	};
	return (
		<HintButton {...mergedProps} disabled={false} className={className}>
			{children}
		</HintButton>
	);
};

export const Message = ({
	children,
	className,
	...props
}: FieldMessage.Props) => {
	const {
		incrementContent,
		decrementContent,
		controlsPosition,
		...mergedProps
	} = { ...useNumberFieldProps(), ...props };
	return (
		<FieldMessage
			className={cn(
				"w-fit h-[3.5em] -mt-[2em] pt-[2em] w-full transition-all duration-500",
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

export const PopoverMessage = (props: Popover.Portal.Props) => {
	const { incrementContent, decrementContent, ...mergedProps } = {
		...useNumberFieldProps(),
		...props,
	};
	return <Popover.Portal {...mergedProps} />;
};

const FieldDecrement = ({
	content: Content,
	size,
	...props
}: NumberInput.ButtonProps) => (
	<BaseNumberField.Decrement
		className={cn(
			buttonVariants(props),
			props.controlsPosition === "end" && "rounded-0 -me-[0.075em]",
			"rounded-e-0",
		)}
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
const FieldIncrement = ({
	content: Content,
	size,
	...props
}: NumberInput.ButtonProps) => (
	<BaseNumberField.Increment
		className={cn(
			buttonVariants(props),
			props.controlsPosition === "start" && "rounded-0 -ms-[0.075em]",
			"rounded-s-0",
		)}
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

export const Input = ({ className, children, ...props }: NumberInput.Props) => {
	const {
		incrementContent,
		decrementContent,
		flat,
		solid,
		ringed,
		loading,
		outlined,
		controlsPosition,
		intent,
		width,
		emphasis,
		...mergedProps
	} = {
		...useNumberFieldProps(),
		...props,
	};
	const decrement = (
		<FieldDecrement
			{...mergedProps}
			content={decrementContent}
			controlsPosition={controlsPosition}
			solid={solid}
			outlined={outlined}
			flat={flat}
		/>
	);
	const increment = (
		<FieldIncrement
			{...mergedProps}
			content={incrementContent}
			controlsPosition={controlsPosition}
			solid={solid}
			outlined={outlined}
			flat={flat}
		/>
	);
	return (
		<BaseNumberField.Root
			className={cn(
				width !== "fill" && "w-fit inline-flex items-center justify-center",
				"group font-mono",
				mergedProps.disabled && "cursor-not-allowed",
				className,
			)}
			{...mergedProps}
		>
			{children}
			<BaseNumberField.Group
				className={cn(
					inputWrapperVariants({
						ringed,
						outlined,
						solid,
						...mergedProps,
					}),
					SharedVariants.interactiveIntentSurfaceVariants({ intent }),
					SharedVariants.emphasisSurfaceVariants({ emphasis }),
					SharedVariants.inputWidthVariants({ width }),
				)}
			>
				{controlsPosition !== "end" && decrement}
				{controlsPosition === "start" && increment}
				<BaseNumberField.Input
					className={cn(
						inputVariants({
							solid,
							outlined,
							flat,
							controlsPosition,
							loading,
							...mergedProps,
						}),
						intent && "sfc-intent-selection",
					)}
					placeholder={mergedProps.placeholder}
					disabled={mergedProps.disabled ?? undefined}
				/>
				{controlsPosition === "end" && decrement}
				{controlsPosition !== "start" && increment}
			</BaseNumberField.Group>
			{mergedProps.disabled && loading && (
				<SpinnerIcon className="animate-spin z-1 absolute pointer-events-none" />
			)}
		</BaseNumberField.Root>
	);
};
