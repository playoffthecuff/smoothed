"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "../icons/check";
import { SpinnerIcon } from "../icons/spinner";
import { useWaveAnimate } from "../use-wave-animate";

const wrapperVariants = cva("flex items-center justify-center", {
	variants: {
		disabled: { true: "cursor-not-allowed" },
		loading: { true: "cursor-wait" },
	},
});

const checkboxVariants = cva(
	"flex rounded-full items-center justify-center before:content-[''] transition-all before:absolute outline-0 invalid:focus-visible:shadow-focus-error aria-[required]:aria-[checked=false]:before:border-error text-2",
	{
		variants: {
			status: {
				invalid:
					"focus-visible:shadow-focus-error surface-error-ghost-ia before:border-error before:border-error text-error",
				valid:
					"focus-visible:shadow-focus-success surface-success-ghost-ia before:border-success text-success",
				warning:
					"focus-visible:shadow-focus-warning surface-warning-ghost-ia before:border-warning text-warning",
			},
			shape: {
				square: null,
				rounded: null,
				circular: null,
			},
			intent: {
				neutral: null,
				secondary: null,
			},
			size: {
				xs: "text-3d h-[2.1em] w-[2.1em]",
				s: "text-3d",
				m: "text-4d",
				l: "text-5d",
				xl: "text-6d",
			},
			disabled: {
				true: "saturate-50 opacity-50 contrast-60 pointer-events-none",
			},
			loading: {
				true: "pointer-events-none",
			},
			filled: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{
				filled: false,
				intent: "neutral",
				className:
					"before:bg-3 hover:before:bg-1 active:before:bg-1 active:hover:before:bg-1",
			},
			{
				filled: false,
				intent: "secondary",
				className:
					"before:bg-2 hover:before:bg active:before:bg active:hover:before:bg",
			},

			{
				size: ["l", "m", "s", "xl"],
				shape: ["square", "rounded"],
				className:
					"before:w-[1.25em] before:h-[1.25em] before:border-[0.125em]",
			},
			{
				size: ["xs"],
				shape: ["square", "rounded"],
				className:
					"before:w-[1.05em] before:h-[1.05em] before:border-[0.125em]",
			},
			{
				size: ["l", "m", "s", "xl"],
				shape: ["circular"],
				className:
					"before:rounded-full before:w-[1.186em] before:h-[1.186em] before:border-[0.1186em]",
			},
			{
				size: ["xs"],
				shape: ["circular"],
				className:
					"before:rounded-full before:w-[1em] before:h-[1em] before:border-[0.1186em]",
			},
			{ size: ["l", "m", "s", "xl"], className: "h-[2.5em] w-[2.5em]" },
			{ disabled: undefined, loading: undefined, className: "cursor-pointer" },
			{ shape: "rounded", size: "xs", className: "before:rounded-4d" },
			{ shape: "rounded", size: "s", className: "before:rounded-5d" },
			{ shape: "rounded", size: "m", className: "before:rounded-7d" },
			{ shape: "rounded", size: "l", className: "before:rounded-9d" },
			{ shape: "rounded", size: "xl", className: "before:rounded-10d" },
			{ shape: "circular", size: "xs", className: "before:text-3d" },
			{ shape: "circular", size: "s", className: "before:text-4d" },
			{ shape: "circular", size: "m", className: "before:text-5d" },
			{ shape: "circular", size: "l", className: "before:text-6d" },
			{ shape: "circular", size: "xl", className: "before:text-7d" },
			{
				status: undefined,
				intent: "neutral",
				className:
					"focus-visible:shadow-focus-foreground surface-foreground-ghost-ia before:border-foreground",
			},
			{
				status: undefined,
				intent: "secondary",
				className:
					"focus-visible:shadow-focus-secondary surface-secondary-ghost-ia before:border-secondary",
			},
			{
				filled: true,
				status: "invalid",
				className: "data-[checked]:before:surface-error-solid",
			},
			{
				filled: false,
				status: "invalid",
				className: "data-[checked]:before:surface-error-ghost",
			},
			{
				filled: true,
				status: "warning",
				className: "data-[checked]:before:surface-warning-solid",
			},
			{
				filled: false,
				status: "warning",
				className: "data-[checked]:before:surface-warning-ghost",
			},
			{
				filled: true,
				status: "valid",
				className: "data-[checked]:before:surface-success-solid",
			},
			{
				filled: false,
				status: "valid",
				className: "data-[checked]:before:surface-success-ghost",
			},
			{
				filled: true,
				status: undefined,
				className: "data-[checked]:before:surface-foreground-solid",
			},
			{
				filled: false,
				status: undefined,
				className: "data-[checked]:before:surface-foreground-ghost",
			},
		],
		defaultVariants: {
			size: "m",
			shape: "rounded",
			filled: false,
			intent: "neutral",
		},
	},
);

const iconVariants = cva(null, {
	variants: {
		filled: {
			true: null,
		},
		loading: {
			true: "text-transparent",
		},
		status: {
			valid: null,
			warning: null,
			invalid: null,
		},
	},
	compoundVariants: [
		{
			status: "invalid",
			filled: true,
			className: "surface-error-solid",
		},
		{
			status: "invalid",
			filled: true,
			className: "surface-success-solid",
		},
		{
			status: "warning",
			filled: true,
			className: "surface-warning-solid",
		},
		{
			status: undefined,
			filled: true,
			className: "surface-foreground-solid",
		},
	],
});

export type CheckboxProps = React.ComponentProps<"span"> &
	VariantProps<typeof checkboxVariants> & {
		required?: boolean;
	} & BaseCheckbox.Root.Props;

export default function Checkbox({
	onMouseDown,
	onMouseUp,
	onKeyDown,
	onKeyUp,
	loading,
	disabled,
	size,
	status,
	intent,
	filled,
	shape,
	className,
	...props
}: CheckboxProps) {
	const effects = useWaveAnimate({
		animateClassName: `animate-wave-secondary`,
		disabled: false,
		onKeyDown,
		onKeyUp,
		onMouseDown,
		onMouseUp,
	});
	return (
		<span className={wrapperVariants({ loading, disabled })}>
			{loading && (
				<SpinnerIcon
					className="animate-spin absolute z-1 pointer-events-none"
					size="0.75em"
				/>
			)}
			<BaseCheckbox.Root
				ref={effects.ref}
				className={checkboxVariants({
					disabled,
					size,
					status,
					filled,
					intent,
					loading,
					shape,
					className,
				})}
				onKeyDown={effects.onKeyDown}
				onKeyUp={effects.onKeyUp}
				onMouseDown={effects.onMouseDown}
				onMouseUp={effects.onMouseUp}
				{...props}
			>
				<BaseCheckbox.Indicator className="flex data-[unchecked]:hidden relative z-1">
					<CheckIcon
						size="1em"
						strokeWidth={2.9}
						className={iconVariants({ filled, status, loading })}
					/>
				</BaseCheckbox.Indicator>
			</BaseCheckbox.Root>
		</span>
	);
}
