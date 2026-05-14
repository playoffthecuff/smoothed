"use client";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, useState } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import type { CompoundProps } from "@/components/ui/types";
import { Variants as SharedVariants } from "@/components/ui/variants";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { FieldLabel } from "../label";
import { FieldMessage } from "../message";

export { FieldPopover as Popover } from "../popover";

// TODO сделать спиннер видимым в отключенном состоянии
// TODO добавить градации emphasis через готовые или подобные интерполированные поверхности

const trackVariants = cva(
	"select-none sfc-color-background-on-background sfc-solid —rel-elevation-6 base-elevation-0 w-full data-[dragging]:h-1/2 group transition-all",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded [--rounding:.375em]",
				circular: "rounded-full",
			},
			flat: {
				false: "sfc-shadow",
			},
			outlined: {
				true: "sfc-border h-[.425em]",
				false: "h-[.375em]",
			},
			disabled: {
				false:
					"group-hover:[&:not(:has(*:hover))]:—rel-elevation-10 dark:group-hover:[&:not(:has(*:hover))]:—rel-elevation-2 group-hover:[&:not(:has(*:hover))]:base-elevation-14 group-hover:h-1/2 dark:group-hover:[&:not(:has(*:hover))]:—base-elevation-20",
			},
		},
		compoundVariants: [],
		defaultVariants: {
			shape: "rounded",
			flat: false,
			outlined: false,
			disabled: false,
		},
	},
);

const indicatorVariants = cva(
	"sfc-solid —rel-elevation-6 —base-elevation-6 hover:—rel-elevation-2 hover:—base-elevation-14",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded",
				circular: "rounded-full",
			},
			flat: {
				false: "sfc-shadow",
			},
		},
		defaultVariants: {
			shape: "rounded",
			flat: false,
		},
	},
);

const thumbVariants = cva(
	"[--bg-opacity:0] rounded-full checkbox-box rounded-full hover:[--bg-opacity:.4] active:[--bg-opacity:.5] lifted-trigger sfc-subtle before:scale-50 group active:h-[3em] active:w-[3em] group-data-[dragging]:[--bg-opacity:.5] group-data-[dragging]:h-[3em] group-data-[dragging]:w-[3em] has-focus:[--bg-opacity:.5]",
);

const thumbCoreVariants = cva(
	"flex items-center justify-center bg-[var(--bg-color)] rel-elevation-6 base-elevation-6",
	{
		variants: {
			shape: {
				square: "w-[1em] h-[1em]",
				rounded: "sfc-rounded w-[1em] h-[1em]",
				circular: "rounded-full w-[1.128em] h-[1.128em]",
			},
			solid: {
				true: "sfc-solid",
			},
			outlined: {
				true: "sfc-outlined sfc-border",
			},
			flat: {
				false: "sfc-shadow",
			},
			disabled: {
				false: "group-hover:rel-elevation-15",
			},
		},
		compoundVariants: [
			{
				outlined: true,
				solid: false,
				className: "sfc-outlined",
			},
		],
		defaultVariants: {
			shape: "rounded",
			outlined: false,
			solid: true,
			flat: false,
			disabled: false,
		},
	},
);

type IndicatorVariants = VariantProps<typeof indicatorVariants>;
type ThumbCoreVariants = VariantProps<typeof thumbCoreVariants>;
export type Variants = FlattenIntersection<
	FieldMessage.Variants &
		SharedVariants.InputWidth &
		SharedVariants.IntentSurface &
		SharedVariants.EmphasisSurface &
		SharedVariants.Size &
		SharedVariants.SurfaceCursor &
		ThumbCoreVariants &
		IndicatorVariants
>;

type ContextProps = FlattenIntersection<
	Variants &
		Pick<BaseSlider.Root.Props, "value" | "defaultValue"> &
		Omit<FieldLabel.Props, "className" | "children">
>;

export type Props = FlattenIntersection<CompoundProps & ContextProps>;

const SliderFieldContext = createContext<ContextProps | null>(null);

const useSliderFieldProps = () => {
	const ctx = useContext(SliderFieldContext);
	if (!ctx) throw new Error("Must be inside SliderFieldContext.Provider");
	return ctx;
};

export const Root = ({
	children,
	className,
	value,
	defaultValue,
	disabled,
	emphasis,
	flat,
	intent,
	loading,
	outlined,
	solid,
	shape,
	size,
	width,
	required,
	...props
}: Props & BaseSlider.Root.Props) => {
	const variantProps = {
		disabled,
		emphasis,
		flat,
		intent,
		loading,
		outlined,
		required,
		shape,
		solid,
		size,
		width,
		value,
		defaultValue,
	};

	return (
		<BaseSlider.Root
			className={cn(
				"flex-col justify-center",
				width === "fill" ? "flex" : "inline-flex w-min",
				SharedVariants.emphasisSurfaceVariants(variantProps),
				SharedVariants.fontSizeVariants(variantProps),
				SharedVariants.semiBoldFontVariants(variantProps),
				className,
			)}
			disabled={disabled}
			{...props}
			value={value}
			defaultValue={defaultValue}
		>
			{loading && disabled && (
				<SpinnerIcon className="absolute animate-spin self-center z-1 mt-[.25em]" />
			)}
			<div className={cn("flex flex-col", disabled && "sfc-disabled")}>
				<SliderFieldContext.Provider value={variantProps}>
					{children}
				</SliderFieldContext.Provider>
			</div>
		</BaseSlider.Root>
	);
};

export const Slider = (props: Variants) => {
	const mergedProps = { ...useSliderFieldProps(), ...props };
	const value = mergedProps.defaultValue || mergedProps.value;
	const [hovered, setHovered] = useState<boolean[]>(
		Array.isArray(value) ? value.map((_) => false) : [false],
	);
	return (
		<BaseSlider.Control
			className={cn(
				"pt-[.5em] h-[2.5em]",
				SharedVariants.inputWidthVariants(mergedProps),
				SharedVariants.surfaceCursorVariants(mergedProps),
			)}
		>
			<div className={cn("h-full w-full flex items-center group px-[.525em]")}>
				<BaseSlider.Track
					className={cn(
						trackVariants(mergedProps),
						SharedVariants.emphasisSurfaceVariants(mergedProps),
						mergedProps.disabled && "pointer-events-none",
					)}
				>
					<BaseSlider.Indicator
						className={cn(
							indicatorVariants(mergedProps),
							SharedVariants.interactiveIntentSurfaceVariants(mergedProps),
							SharedVariants.emphasisSurfaceVariants(mergedProps),
						)}
						style={{
							height: "100%",
						}}
					/>
					{hovered.map((_, i) => (
						<BaseSlider.Value
							key={i}
							render={(_, p) => (
								<BaseSlider.Thumb
									tabIndex={mergedProps.loading ? -1 : 0}
									className={cn(
										thumbVariants(),
										SharedVariants.interactiveIntentSurfaceVariants(
											mergedProps,
										),
										SharedVariants.emphasisSurfaceVariants(mergedProps),
									)}
								>
									<Popover.Root
										open={
											(p.dragging && p.activeThumbIndex === i) ||
											p.focused ||
											hovered[i]
										}
									>
										<Popover.Trigger
											delay={10}
											className="outline-none"
											onMouseEnter={() =>
												setHovered(
													hovered.map((v, idx) => (idx === i ? true : v)),
												)
											}
											onMouseLeave={() =>
												setHovered(
													hovered.map((v, idx) => (idx === i ? false : v)),
												)
											}
										>
											<div className="h-[2.5em] w-[2.5em] flex items-center justify-center">
												<div className={thumbCoreVariants(mergedProps)}></div>
											</div>
										</Popover.Trigger>
										<Popover.Portal sideOffset={12} {...mergedProps}>
											<output
												className={cn(
													"fw-mono",
													(mergedProps.disabled || mergedProps.loading) &&
														"select-none",
												)}
											>
												{p.values[i]}
											</output>
										</Popover.Portal>
									</Popover.Root>
								</BaseSlider.Thumb>
							)}
						/>
					))}
				</BaseSlider.Track>
			</div>
		</BaseSlider.Control>
	);
};

export const Message = ({
	children,
	className,
	...props
}: FieldMessage.Props) => {
	const mergedProps = { ...useSliderFieldProps(), ...props };
	return (
		<FieldMessage
			className={cn(
				"h-[4em] -mt-[2.5em] pt-[2.5em] w-full transition-all duration-500",
				(mergedProps.shape === "circular" ||
					mergedProps.solid ||
					mergedProps.outlined) &&
					"ps-[.525em] [--rounding:.75em]",
				!children && "bg-transparent",
				mergedProps.loading && !mergedProps.disabled && "shimmer-bg",
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
	const mergedProps = { ...useSliderFieldProps(), ...props };
	return (
		<Popover.Portal {...mergedProps} className={className}>
			{children}
		</Popover.Portal>
	);
};

export const Label = ({ children, className, ...props }: FieldLabel.Props) => {
	const mergedProps = { ...useSliderFieldProps(), ...props };
	return (
		<BaseSlider.Label
			className={cn(
				"leading-[1.25] sfc-text sfc-color-default-on-default",
				mergedProps.shape === "circular" && "first-letter:ms-[.525em]",
				SharedVariants.emphasisSurfaceVariants(mergedProps),
				mergedProps.required &&
					"before:content-['✺_'] before:sfc-text-danger-450d",
				className,
			)}
		>
			{children}
		</BaseSlider.Label>
	);
};
