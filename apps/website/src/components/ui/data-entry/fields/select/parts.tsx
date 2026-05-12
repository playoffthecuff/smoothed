"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { CheckIcon } from "@/components/ui/icons/check";
import { ChevronUpDownIcon } from "@/components/ui/icons/chevron-up-down";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import type { CompoundProps } from "@/components/ui/types";
import { Variants as SharedVariants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { FieldLabel } from "../label";
import { FieldMessage } from "../message";

export { Popover } from "../popover";

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
			loading: { true: null },
			disabled: { true: "pointer-events-none sfc-disabled" },
		},
		compoundVariants: [
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
export type Variants = FlattenIntersection<
	TriggerVariants &
		SharedVariants.IntentSurface &
		SharedVariants.EmphasisSurface &
		SharedVariants.Size &
		SharedVariants.InputWidth
>;
type CommonProps = {
	id?: string;
	name?: string;
	placeholder?: string;
	required?: boolean;
};
export type ContextProps = FlattenIntersection<Variants & CommonProps>;
export type Props<T> = FlattenIntersection<
	ContextProps & BaseSelect.Root.Props<T> & CompoundProps
>;

const SelectFieldContext = createContext<ContextProps | null>(null);

const useSelectFieldProps = () => {
	const ctx = useContext(SelectFieldContext);
	if (!ctx) throw new Error("Must be inside SelectFieldContext.Provider");
	return ctx;
};

export const Label = ({ children, className, ...props }: FieldLabel.Props) => {
	const mergedProps = { ...useSelectFieldProps(), ...props };
	return (
		<BaseSelect.Label
			className={cn(
				"leading-[1.25] sfc-text sfc-color-default-on-default",
				SharedVariants.emphasisSurfaceVariants(mergedProps),
				mergedProps.required &&
					"before:content-['✺_'] before:sfc-text-danger-450d",
				mergedProps.shape === "circular" && "ms-[0.525em]",
				className,
			)}
		>
			{children}
		</BaseSelect.Label>
	);
};

export const Root = <T,>({
	children,
	className,
	items,
	...props
}: Props<T>) => {
	return (
		<div
			className={cn(
				SharedVariants.fontSizeVariants(props),
				SharedVariants.semiBoldFontVariants(props),
				"flex-col",
				props.width === "fill" ? "flex" : "inline-flex w-min",
			)}
		>
			<BaseSelect.Root items={items} {...props}>
				<SelectFieldContext.Provider value={props}>
					{children}
				</SelectFieldContext.Provider>
				<BaseSelect.Portal>
					<BaseSelect.Positioner
						className="outline-none select-none z-10"
						sideOffset={8}
					>
						<BaseSelect.Popup
							className={cn(
								popupVariants(props),
								SharedVariants.intentSurfaceVariants(props),
								SharedVariants.emphasisSurfaceVariants(props),
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
								className={cn(
									arrowVariants(props),
									"bottom-0 [&&]-rounded-t-0d",
								)}
							/>
						</BaseSelect.Popup>
					</BaseSelect.Positioner>
				</BaseSelect.Portal>
			</BaseSelect.Root>
		</div>
	);
};

export const Trigger = ({
	className,
	children,
}: {
	className?: string;
	children?: BaseSelect.Value.Props["children"];
}) => {
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
					SharedVariants.interactiveIntentSurfaceVariants(props),
					SharedVariants.emphasisSurfaceVariants(props),
					SharedVariants.inputWidthVariants(props),
					SharedVariants.surfaceCursorVariants(props),
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
};

export const PopoverMessage = ({
	children,
	className,
	...props
}: Popover.Portal.Props) => {
	const mergedProps = { ...useSelectFieldProps(), ...props };
	return <Popover.Portal {...mergedProps}>{children}</Popover.Portal>;
};

export const Message = ({
	children,
	className,
	...props
}: FieldMessage.Props) => {
	const mergedProps = { ...useSelectFieldProps(), ...props };
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
