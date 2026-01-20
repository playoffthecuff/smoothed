import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { SpinnerIcon } from "../icons/spinner";

const sliderVariants = cva("flex grow items-center gap-14d px-[1ch] bg-3", {
	variants: {
		size: {
			xs: "text-3d font-10d",
			s: "text-3d font-10d",
			m: "text-4d font-9d",
			l: "text-5d font-8d",
			xl: "text-6d font-8d",
		},
		width: {
			narrow: "w-[17ch] grow-0",
			normal: "w-[24ch] grow-0",
			wide: "w-[33ch] grow-0",
			fill: "w-full",
		},
		status: {
			valid: "text-success",
			warning: "text-warning",
			invalid: "text-error",
		},
		shape: {
			square: null,
			rounded: "rounded-[0.325em]",
			circular: "rounded-full",
		},
		disabled: {
			true: "cursor-not-allowed",
			false: null,
		},
		loading: {
			true: "cursor-wait",
			false: null,
		},
	},
	compoundVariants: [
		{
			disabled: false,
			loading: false,
			className: "cursor-pointer",
		},
	],
	defaultVariants: {
		size: "m",
		disabled: false,
		loading: false,
		shape: "rounded",
		width: "normal",
	},
});

const controlVariants = cva("flex grow touch-none items-center select-none", {
	variants: {
		size: {
			xs: "h-[1.6em]",
			s: "h-[2em]",
			m: "h-[2em]",
			l: "h-[2em]",
			xl: "h-[2em]",
		},
		disabled: {
			true: "pointer-events-none saturate-50 opacity-50 contrast-60",
		},
		loading: {
			true: "pointer-events-none",
		},
	},
	defaultVariants: {
		size: "m",
	},
});

const trackVariants = cva(null, {
	variants: {
		status: {
			valid: "surface-success-solid-ia",
			warning: "surface-warning-solid-ia",
			invalid: "surface-error-solid-ia",
		},
		shape: {
			square: null,
			rounded: "rounded-[0.125em]",
			circular: "rounded-full",
		},
	},
	compoundVariants: [
		{
			status: undefined,
			className: "surface-foreground-solid-ia",
		},
	],
	defaultVariants: {
		shape: "circular",
	},
});
const thumbVariants = cva(
	"flex items-center justify-center select-none  before-content-[''] before:block rounded-full before:rounded-full",
	{
		variants: {
			status: {
				valid:
					"surface-success-ghost-ia before:surface-success-solid has-[:focus-visible]:before:shadow-focus-success",
				warning:
					"surface-warning-ghost-ia before:surface-warning-solid has-[:focus-visible]:before:shadow-focus-warning",
				invalid:
					"surface-error-ghost-ia before:surface-error-solid has-[:focus-visible]:before:shadow-focus-error",
			},
			size: {
				xs: "w-[1.6em] h-[1.6em] before:w-[0.8em] before:h-[0.8em]",
				s: "w-[2em] h-[2em] before:w-[1em] before:h-[1em]",
				m: "w-[2em] h-[2em] before:w-[1em] before:h-[1em]",
				l: "w-[2em] h-[2em] before:w-[1em] before:h-[1em]",
				xl: "w-[2em] h-[2em] before:w-[1em] before:h-[1em]",
			},
		},
		compoundVariants: [
			{
				status: undefined,
				className:
					"surface-foreground-ghost-ia before:surface-foreground-solid has-[:focus-visible]:before:shadow-focus-primary",
			},
		],
		defaultVariants: {
			size: "m",
		},
	},
);

export type SliderProps = BaseSlider.Root.Props &
	VariantProps<typeof sliderVariants>;

export function Slider({
	size,
	status,
	shape,
	disabled,
	width,
	loading,
	className,
	...props
}: SliderProps) {
	const isRange =
		(Array.isArray(props.defaultValue) && props.defaultValue.length) ||
		(Array.isArray(props.value) && props.value.length);
	return (
		<BaseSlider.Root
			{...props}
			className={cn(
				sliderVariants({ size, status, disabled, loading, shape, width }),
				className,
			)}
			disabled={disabled}
		>
			<BaseSlider.Control
				className={controlVariants({ disabled, loading, size })}
			>
				<BaseSlider.Track
					className={cn(
						"h-[0.375em] w-full surface-foreground-subtle-ia select-none",
						trackVariants({ shape }),
					)}
				>
					<BaseSlider.Indicator
						className={cn("select-none", trackVariants({ status, shape }))}
					/>
					{[...Array(1 + +isRange)].map((_, i) => (
						<BaseSlider.Thumb
							tabIndex={loading ? -1 : 0}
							className={thumbVariants({ status, size })}
							index={i}
							key={i}
						/>
					))}
				</BaseSlider.Track>
			</BaseSlider.Control>
			<span className="relative flex items-center justify-center min-w-[1.25em]">
				{loading && <SpinnerIcon className="absolute animate-spin" />}
				<BaseSlider.Value
					className={cn(
						"justify-self-start font-mono",
						loading && "text-transparent",
						(disabled || loading) && "select-none",
					)}
				/>
			</span>
		</BaseSlider.Root>
	);
}
