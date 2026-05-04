"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, type ReactNode, useContext } from "react";
import { CheckIcon } from "@/components/ui/icons/check";
import { ChevronUpDownIcon } from "@/components/ui/icons/chevron-up-down";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import { Variants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { LabelProps } from "../label";
import { FieldMessage } from "../message";

// TODO изменить дефолтный внешний вид всех компонентов на emphasis:medium outlined:true solid:false

const triggerVariants = cva(
	"transition-all after:transition-all justify-between after:pointer-events-none lowered-select flex ps-[0.5em] select-none outline-none focus:after:ring-6d",
	{
		variants: {
			type: {
				number: "font-mono",
			},
			shape: {
				square: null,
				rounded: "sfc-rounded",
				circular: "rounded-full after:rounded-full",
			},
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
			// TODO change prop name with the highlighted one - apply to all components and descriptions in all component pages
			ringed: {
				true: "after:ring-6d",
			},
			// TODO implement inline input
			loading: { true: "cursor-wait" },
			disabled: { true: "pointer-events-none sfc-disabled" },
		},
		compoundVariants: [
			{
				loading: false,
				disabled: false,
				className: "cursor-pointer",
			},
			{
				loading: true,
				disabled: false,
				className: "shimmer-bg",
			},
		],
		defaultVariants: {
			shape: "rounded",
			solid: false,
			outlined: false,
			flat: false,
			loading: false,
			disabled: false,
		},
	},
);
const itemVariants = cva(
	"disabled:pointer-events-none flex items-center justify-between select-none cursor-pointer h-[2em] data-[highlighted]:bg-[var(--color)] data-[highlighted]:text-[var(--bg-color)]",
	{
		variants: {
			type: {
				number: "font-mono",
			},
			outlined: { true: null },
			solid: { true: null },
		},
		compoundVariants: [
			{
				outlined: true,
				solid: false,
				className: "sfc-outlined bg-background-1000d dark:bg-foreground-0d",
			},
		],
		defaultVariants: {
			solid: false,
			outlined: false,
		},
	},
);
const popupVariants = cva(
	"group min-w-[calc(var(--anchor-width)+1.5em)] origin-[var(--transform-origin)] bg-clip-padding transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 outline-none transition-all overflow-hidden",
	{
		variants: {
			shape: {
				square: null,
				rounded: null,
				circular: "rounded-[1em]",
			},
			outlined: {
				true: "sfc-border",
			},
			solid: {
				true: "sfc-solid",
				false: "sfc-outlined bg-background-1000d dark:bg-foreground-0d",
			},
			flat: {
				false: "sfc-shadow rel-elevation-4",
			},
		},
		compoundVariants: [
			{
				outlined: true,
				shape: "rounded",
				className: "rounded-[calc(var(--radius)*0.325em)]",
			},
			{
				outlined: false,
				shape: "rounded",
				className: "sfc-rounded",
			},
			{
				outlined: false,
				solid: false,
				flat: true,
				className: "sfc-border",
			},
		],

		defaultVariants: {
			shape: "rounded",
			outlined: false,
			solid: false,
			flat: false,
		},
	},
);
// TODO переписать пресет убрав зависимость от wind4
const arrowVariants = cva(
	"left-0 flex h-[2em] w-full items-center justify-center text-center",
	{
		variants: {
			outlined: {
				true: "bg-background-1000d text-foreground-100d dark:bg-foreground-100d dark:text-background-900d",
			},
			solid: {
				true: "bg-[var(--bg-color)] text-[var(--color)]",
			},
			shape: {
				square: null,
				rounded: null,
				circular: "rounded-[1em]",
			},
		},
		compoundVariants: [
			{
				outlined: true,
				shape: "rounded",
				className: "rounded-[calc(var(--radius)*0.325em)]",
			},
			{
				outlined: false,
				shape: "rounded",
				className: "sfc-rounded",
			},
		],
		defaultVariants: {
			outlined: true,
			shape: "rounded",
			solid: false,
		},
	},
);

type TriggerVariants = VariantProps<typeof triggerVariants>;

type CommonProps = {
	id?: string;
	name?: string;
	placeholder?: string;
	required?: boolean;
};

type SelectProps = FlattenIntersection<
	TriggerVariants &
		Variants.IntentSurface &
		Variants.EmphasisSurface &
		Variants.Size &
		Variants.InputWidth &
		LabelProps &
		CommonProps
>;

export type SelectFieldProps = FlattenIntersection<
	SelectProps & { children?: ReactNode }
>;

const SelectFieldContext = createContext<SelectProps | null>(null);

function useSelectFieldProps() {
	const ctx = useContext(SelectFieldContext);
	if (!ctx) throw new Error("Must be inside SelectFieldContext.Provider");
	return ctx;
}

export function Root({ children, ...props }: SelectFieldProps) {
	return (
		<div
			className={cn(
				Variants.fontSizeVariants(props),
				Variants.semiBoldFontVariants(props),
				"flex-col",
				props.width === "fill" ? "flex" : "inline-flex w-min",
			)}
		>
			<SelectFieldContext.Provider value={props}>
				{children}
			</SelectFieldContext.Provider>
		</div>
	);
}
interface CompoundProps {
	children?: ReactNode;
	className?: string;
}
export function Label({ children, className }: CompoundProps) {
	const props = useSelectFieldProps();
	return (
		<BaseSelect.Label
			className={cn(
				props.required && "before:content-['✺_'] before:sfc-text-danger-450d",
				className,
				props.shape === "circular" && "ms-[0.525em]",
			)}
		>
			{children}
		</BaseSelect.Label>
	);
}

export const Select = <T,>({
	children,
	defaultValue,
	value,
	items,
}: CompoundProps & BaseSelect.Root.Props<T>) => {
	const props = useSelectFieldProps();
	return (
		<BaseSelect.Root
			items={items}
			disabled={props.disabled ?? undefined}
			id={props.id}
			name={props.name}
			defaultValue={defaultValue}
			value={value}
		>
			{children}
			<BaseSelect.Portal>
				<BaseSelect.Positioner
					className="outline-none select-none z-10"
					sideOffset={8}
				>
					<BaseSelect.Popup
						className={cn(
							popupVariants(props),
							Variants.intentSurfaceVariants(props),
							Variants.emphasisSurfaceVariants(props),
						)}
					>
						<BaseSelect.ScrollUpArrow
							className={cn(arrowVariants(props), "top-0 [&&]-rounded-b-0d")}
						/>
						<BaseSelect.List className="relative scroll-py-6 overflow-y-auto max-h-[var(--available-height)]">
							{Array.isArray(items) &&
								items.map(({ value }) => (
									<BaseSelect.Item
										key={value}
										value={value}
										className={cn(
											"grid grid-cols-[2em_1fr] items-center select-none data-[highlighted]:before:z-[-1] outline-none",
											itemVariants(props),
										)}
									>
										<BaseSelect.ItemIndicator className="col-start-1 justify-self-center">
											<CheckIcon size={1.125} strokeWidth={2.2} />
										</BaseSelect.ItemIndicator>
										<BaseSelect.ItemText className="col-start-2">
											{value}
										</BaseSelect.ItemText>
									</BaseSelect.Item>
								))}
						</BaseSelect.List>
						<BaseSelect.ScrollDownArrow
							className={cn(arrowVariants(props), "bottom-0 [&&]-rounded-t-0d")}
						/>
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
};

export function Trigger({
	className,
	children,
}: {
	className?: string;
	children?: BaseSelect.Value.Props["children"];
}) {
	const props = useSelectFieldProps();
	return (
		<div
			className={cn(
				"items-center justify-center relative",
				props.width !== "fill" ? "inline-flex w-fit" : "flex",
				props.disabled && "cursor-not-allowed",
				className,
			)}
		>
			{props.loading && (
				<SpinnerIcon className="absolute pointer-events-none animate-spin" />
			)}

			<BaseSelect.Trigger
				className={cn(
					props.type === "number" && "font-mono",
					Variants.interactiveIntentSurfaceVariants(props),
					Variants.emphasisSurfaceVariants(props),
					Variants.inputWidthVariants(props),
					triggerVariants(props),
				)}
			>
				<BaseSelect.Value
					placeholder={props.placeholder}
					className={"font-sans leading-none"}
				>
					{children}
				</BaseSelect.Value>
				<BaseSelect.Icon className="flex w-[2em] justify-center">
					<ChevronUpDownIcon className="stroke-3.5d" size={1} />
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
		</div>
	);
}

interface PopoverProps extends CompoundProps {
	open?: boolean;
	message?: string;
}

function PopoverRoot({ children, open, className }: PopoverProps) {
	return (
		<Popover.Root open={open}>
			<Popover.Trigger className={className}>{children}</Popover.Trigger>
		</Popover.Root>
	);
}

export { PopoverRoot as Popover };

export function PopoverMessage({ children }: CompoundProps) {
	const props = useSelectFieldProps();
	return <Popover.Portal {...props}>{children}</Popover.Portal>;
}

export const Message = ({ children, className }: CompoundProps) => {
	const props = useSelectFieldProps();
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
