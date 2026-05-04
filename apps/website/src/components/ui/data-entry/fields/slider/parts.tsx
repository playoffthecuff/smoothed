"use client";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { Popover } from "@/components/ui/overlays/popover";
import type { CompoundProps } from "@/components/ui/types";
import { Variants } from "@/components/ui/variants";
import { emphasisSurfaceVariants } from "@/components/ui/variants/emphasis-surface";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { FieldLabel } from "../label";
import { FieldMessage, type FieldMessageVariants } from "../message";

// TODO сделать спиннер видимым в отключенном состоянии
// TODO добавить градации emphasis через готовые или подобные интерполированные поверхности

const rootVariants = cva(
	"inline-flex flex-col justify-center pe-[.5em] —base-elevation-8",
	{
		variants: {
			width: {
				narrow: "w-fit",
				normal: "w-fit",
				wide: "w-fit",
				fill: "w-full",
			},
			shape: {
				square: null,
				rounded: "sfc-rounded-6",
				circular: "rounded-full",
			},
			outlined: {
				true: "sfc-border",
			},
			solid: {
				true: "sfc-solid",
			},
		},
		defaultVariants: {
			shape: "rounded",
			width: "normal",
		},
	},
);

const controlVariants = cva(
	"flex touch-none items-center select-none h-[2em]",
	{
		variants: {
			width: {
				narrow: "w-[8em]",
				normal: "w-[11.31em]",
				wide: "w-[16em]",
				fill: "w-full",
			},
			disabled: {
				true: "pointer-events-none",
			},
		},
		defaultVariants: {
			width: "normal",
		},
	},
);

const trackVariants = cva(
	"select-none sfc-color-background-on-background sfc-solid —rel-elevation-5 base-elevation-0 w-full group-hover:h-1/2 data-[dragging]:h-1/2 group transition-all group-hover:[&:not(:has(*:hover))]:—rel-elevation-10 group-hover:[&:not(:has(*:hover))]:base-elevation-15",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded-2",
				circular: "rounded-full",
			},
			flat: {
				false: "sfc-shadow",
			},
			outlined: {
				true: "sfc-border h-[.425em]",
				false: "h-[0.375em]",
			},
			loading: {
				true: null,
			},
			disabled: {
				true: "cursor-not-allowed",
			},
		},
		compoundVariants: [
			{ disabled: false, loading: true, className: "cursor-wait" },
		],
		defaultVariants: {
			shape: "rounded",
			flat: false,
			loading: false,
			disabled: false,
			outlined: false,
		},
	},
);

const indicatorVariants = cva(
	"select-none sfc-solid sfc-ia transition-all —rel-elevation-5 —base-elevation-5 hover:—rel-elevation-2 hover:—base-elevation-14",
	{
		variants: {
			shape: {
				square: null,
				rounded: "sfc-rounded-2",
				circular: "rounded-full",
			},
			flat: {
				false: "sfc-shadow",
			},
			loading: {
				true: "null",
			},
			disabled: {
				true: "cursor-not-allowed",
			},
		},
		compoundVariants: [
			{
				loading: true,
				disabled: false,
				className: "cursor-wait",
			},
		],
		defaultVariants: {
			shape: "rounded",
			flat: false,
			loading: false,
			disabled: false,
		},
	},
);

const thumbVariants = cva(
	"not-hover:[--bg-opacity:0] rounded-full checkbox-box rounded-full [--bg-opacity:0.3] active:[--bg-opacity:0.4] lifted-trigger sfc-slider-thumb before:scale-50 group active:h-[3em] active:w-[3em] group-data-[dragging]:[--bg-opacity:0.4] group-data-[dragging]:h-[3em] group-data-[dragging]:w-[3em]",
);

const thumbCoreVariants = cva(
	"flex items-center justify-center bg-[var(--bg-color)] rel-elevation-6 base-elevation-6 group-hover:rel-elevation-15",
	{
		variants: {
			loading: {
				true: "text-transparent",
			},
			shape: {
				square: "w-[1em] h-[1em]",
				rounded: "sfc-rounded-2 w-[1em] h-[1em]",
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
		},
	},
);

type RootVariants = VariantProps<typeof rootVariants>;
type IndicatorVariants = VariantProps<typeof indicatorVariants>;
type ThumbCoreVariants = VariantProps<typeof thumbCoreVariants>;

export type SliderProps = FlattenIntersection<
	RootVariants &
		FieldMessageVariants &
		IndicatorVariants &
		Variants.IntentSurface &
		Variants.EmphasisSurface &
		Variants.Size &
		ThumbCoreVariants & {
			required?: boolean;
		}
>;

const SliderFieldContext = createContext<
	(SliderProps & { isRange: boolean; outputWidth: string }) | null
>(null);

const useSliderFieldProps = () => {
	const ctx = useContext(SliderFieldContext);
	if (!ctx) throw new Error("Must be inside SliderFieldContext.Provider");
	return ctx;
};

export const Root = ({
	children,
	className,
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
	...props
}: SliderProps & CompoundProps & BaseSlider.Root.Props) => {
	const variantProps = {
		disabled,
		emphasis,
		flat,
		intent,
		loading,
		outlined,
		shape,
		solid,
		size,
		width,
		isRange:
			(Array.isArray(props.defaultValue) && props.defaultValue.length === 2) ||
			(Array.isArray(props.value) && props.value.length === 2),
		outputWidth: `${`${props.max ?? 100}`.length}ch`,
	};

	return (
		<BaseSlider.Root
			className={cn(
				rootVariants(variantProps),
				Variants.fontSizeVariants(variantProps),
				Variants.semiBoldFontVariants(variantProps),
				variantProps.isRange ? "ps-[.5em]" : "ps-[1.5em]",
				className,
			)}
			disabled={disabled}
			{...props}
		>
			{loading && (
				<SpinnerIcon className="absolute animate-spin self-end me-[.5em]" />
			)}
			<div
				className={cn(
					"flex flex-col py-[.5em]",
					disabled && "sfc-disabled cursor-not-allowed",
				)}
			>
				<SliderFieldContext.Provider value={variantProps}>
					{children}
				</SliderFieldContext.Provider>
			</div>
		</BaseSlider.Root>
	);
};

export const Slider = () => {
	const props = useSliderFieldProps();
	return (
		<div
			className={cn(
				"flex items-center gap-[1em]",
				props.loading && !props.disabled && "cursor-wait",
				props.disabled && "cursor-not-allowed	",
			)}
		>
			{props.isRange && (
				<span
					className="relative flex items-center justify-end h-[1.6em]"
					style={{ width: props.outputWidth }}
				>
					<BaseSlider.Value
						render={(_, p) => {
							return (
								<output
									className={cn(
										"fw-mono",
										props.loading && "text-transparent",
										(props.disabled || props.loading) && "select-none",
									)}
								>
									{p.values[0]}
								</output>
							);
						}}
					/>
				</span>
			)}
			<BaseSlider.Control className={controlVariants(props)}>
				<div className="h-[2em] w-full flex items-center group sfc-ia">
					<BaseSlider.Track
						className={cn(
							trackVariants(props),
							Variants.intentSurfaceVariants(props),
						)}
					>
						<BaseSlider.Indicator
							className={cn(
								indicatorVariants(props),
								Variants.intentSurfaceVariants(props),
								Variants.emphasisSurfaceVariants(props),
							)}
							style={{
								height: "100%",
							}}
						/>
						<BaseSlider.Thumb
							tabIndex={props.loading ? -1 : 0}
							className={cn(
								thumbVariants(),
								Variants.interactiveIntentSurfaceVariants(props),
								Variants.emphasisSurfaceVariants(props),
							)}
							index={0}
						>
							<div className={thumbCoreVariants(props)}></div>
						</BaseSlider.Thumb>
						{props.isRange && (
							<BaseSlider.Thumb
								tabIndex={props.loading ? -1 : 0}
								className={cn(
									thumbVariants(),
									Variants.interactiveIntentSurfaceVariants(props),
									Variants.emphasisSurfaceVariants(props),
								)}
								index={1}
							>
								<div className={thumbCoreVariants(props)}></div>
							</BaseSlider.Thumb>
						)}
					</BaseSlider.Track>
				</div>
			</BaseSlider.Control>
			<span
				className="relative flex items-center h-[1.6em] justify-start"
				style={{ width: props.outputWidth }}
			>
				<BaseSlider.Value
					render={(_, p) => (
						<output
							className={cn(
								"fw-mono",
								props.loading && "text-transparent",
								(props.disabled || props.loading) && "select-none",
							)}
						>
							{p.values[+props.isRange]}
						</output>
					)}
				/>
			</span>
		</div>
	);
};

export const Message = ({ children, className }: CompoundProps) => {
	const { isRange, outputWidth, outlined, solid, ...props } =
		useSliderFieldProps();
	return (
		<FieldMessage
			className={cn(
				"transition-all duration-500",
				isRange && "ms-[2.75em]",
				props.width === "fill" ? "w-full" : "w-fit",
				!children && "bg-transparent",
				props.shape === "circular" && "ps-[.525em]",
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
	const { isRange, outputWidth, ...props } = useSliderFieldProps();
	return <Popover.Portal {...props}>{children}</Popover.Portal>;
};

export const Label = ({ className, children }: CompoundProps) => {
	const props = useSliderFieldProps();
	return (
		<BaseSlider.Label
			className={cn(
				"leading-[1.25] sfc-text sfc-color-default-on-default",
				props.shape === "circular" && "first-letter:ms-[.525em]",
				emphasisSurfaceVariants(props),
				props.required && "before:content-['✺_'] before:sfc-text-danger-450d",
				className,
			)}
		>
			{children}
		</BaseSlider.Label>
	);
};

export const Label2 = ({ children, className }: CompoundProps) => {
	const { emphasis, required } = useSliderFieldProps();
	return (
		<FieldLabel emphasis={emphasis} required={required} className={className}>
			{children}
		</FieldLabel>
	);
};
