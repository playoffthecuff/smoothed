"use client";

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx/lite";
import { SpinnerIcon } from "@/components/ui/icons/spinner";
import { useWaveAnimate } from "@/components/ui/use-wave-animate";

const buttonVariants = cva(
	"inline-flex h-[2em] min-w-[2em] media-pointer_coarse:h-[2.25em] media-pointer_coarse:min-w-[2.25em] items-center justify-center whitespace-nowrap transition-all [&_svg]:pointer-events-none cursor-pointer relative select-none before:absolute before:inset-0 before:block before:outline-0 before:content-[''] outline-none",
	{
		variants: {
			intent: {
				primary: "focus-visible:shadow-focus-primary",
				destructive: "focus-visible:shadow-focus-error",
				visited: "focus-visible:shadow-focus-visited",
				secondary: "focus-visible:shadow-focus-neutral",
				success: "focus-visible:shadow-focus-success",
				warning: "focus-visible:shadow-focus-warning",
			},
			size: {
				s: "text-3d media-pointer_coarse:text-4d font-10d ",
				m: "text-4d media-pointer_coarse:text-5d font-9d",
				l: "text-5d media-pointer_coarse:text-6d font-8d",
			},
			lifted: {
				true: null,
				false: null,
			},
			aspect: {
				square: "px-[calc(0.375em-2px)] gap-x-[0.5em]",
				normal:
					"px-[0.75em] has-[>svg:last-child]:pe-[0.5625em] has-[>svg:first-child]:ps-[0.5625em] gap-x-[0.5em]",
				wide: "px-[1em] has-[>svg:last-child]:pe-[0.8125em] has-[>svg:first-child]:ps-[0.8125em] gap-x-[0.625em]",
			},
			shape: {
				rounded:
					"rounded-[calc(var(--radius)*0.25em)] before:rounded-[calc(var(--radius)*0.25em)]",
				square: "rounded-none before:rounded-none",
				circular: "rounded-full before:rounded-full",
			},
			appearance: {
				solid: null,
				subtle: null,
				outline:
					"before:outline-offset-1.6 border-1.6 focus-visible:border-none",
				ghost: null,
				link: "underline",
			},
			disabled: {
				false: null,
				true: "saturate-50 opacity-50 pointer-events-none",
			},
			loading: {
				false: null,
				true: "saturate-50 opacity-50 pointer-events-none",
			},
		},
		compoundVariants: [
			{
				appearance: ["outline", "solid", "subtle", "ghost"],
				lifted: true,
				className: "shadow-lifted",
			},
			{
				intent: "primary",
				appearance: "solid",
				className:
					"text-neutral-light bg-primary-500 hover:bg-primary-500|10l focus-visible:bg-primary-500|10l active:bg-primary-500|-5l",
			},
			{
				intent: "primary",
				appearance: "subtle",
				lifted: false,
				className: [
					"text-primary surface-primary",
					"hover:bg-primary-500/17d focus-visible:bg-primary-500/17d active:bg-primary-500/11d",
					"dark:hover:bg-primary-500/8d dark:focus-visible:bg-primary-500/8d dark:active:bg-primary-500/5d",
				],
			},
			{
				intent: "primary",
				appearance: "subtle",
				lifted: true,
				className: [
					"text-primary surface-primary",
					"hover:bg-primary-500/29d focus-visible:bg-primary-500/29d active:bg-primary-500/20d",
					"dark:hover:bg-primary-500/8d dark:focus-visible:bg-primary-500/8d dark:active:bg-primary-500/20d",
				],
			},
			
			{
				intent: "primary",
				appearance: "outline",
				lifted: false,
				className: [
					"text-primary",
					"hover:bg-primary-500/23d active:bg-primary-500/17d focus-visible:bg-primary-500/23d",
					"border-primary-600",
					"dark:hover:bg-primary-500/14d dark:active:bg-primary-500/8d dark:focus-visible:bg-primary-500/14d",
					"dark:border-primary-250 dark:hover:border-primary-250/50 dark:active:border-primary-250/25",
				],
			},
			{
				intent: "primary",
				appearance: "outline",
				lifted: true,
				className: [
					"text-primary",
					"hover:bg-primary-500/29d active:bg-primary-500/20d focus-visible:bg-primary-500/29d",
					"border-primary-600",
					"dark:hover:bg-primary-500/14d dark:active:bg-primary-500/20d dark:focus-visible:bg-primary-500/14d",
					"dark:border-primary-250 dark:hover:border-primary-250/50 dark:active:border-primary-250/25",
				],
			},
			{
				appearance: "ghost",
				intent: "primary",
				lifted: false,
				className: [
					"text-primary",
					"hover:bg-primary-500/23d active:bg-primary-500/17d focus-visible:bg-primary-500/23d",
					"dark:hover:bg-primary-500/14d dark:active:bg-primary-500/8d dark:focus-visible:bg-primary-500/14d",
				],
			},
			{
				appearance: "ghost",
				intent: "primary",
				lifted: true,
				className: [
					"text-primary",
					"hover:bg-primary-500/29d active:bg-primary-500/20d focus-visible:bg-primary-500/29d",
					"dark:hover:bg-primary-500/14d dark:active:bg-primary-500/20d dark:focus-visible:bg-primary-500/14d",
				],
			},
			{
				intent: "primary",
				appearance: "link",
				className: "text-primary text-primary-interactive",
			},

			{
				intent: "destructive",
				appearance: "solid",
				className:
					"text-neutral-light bg-error-500 hover:bg-error-500|10l focus-visible:bg-error-500|10l active:bg-error-500|-5l",
			},
			{
				intent: "destructive",
				appearance: "subtle",
				lifted: false,
				className: [
					"text-error surface-error",
					"hover:bg-error-500/17d focus-visible:bg-error-500/17d active:bg-error-500/11d",
					"dark:hover:bg-error-500/8d dark:focus-visible:bg-error-500/8d dark:active:bg-error-500/5d",
				],
			},
			{
				intent: "destructive",
				appearance: "subtle",
				lifted: true,
				className: [
					"text-error surface-error",
					"hover:bg-error-500/29d focus-visible:bg-error-500/29d active:bg-error-500/20d",
					"dark:hover:bg-error-500/14d dark:focus-visible:bg-error-500/14d dark:active:bg-error-500/20d",
				],
			},
			{
				intent: "destructive",
				appearance: "outline",
				lifted: false,
				className: [
					"text-error",
					"hover:bg-error-500/23d active:bg-error-500/17d focus-visible:bg-error-500/23d",
					"border-error-600",
					"dark:hover:bg-error-500/14d dark:active:bg-error-500/8d dark:focus-visible:bg-error-500/14d",
					"dark:border-error-250 dark:hover:border-error-250/50 active:hover:border-error-250/25",
				],
			},
			{
				intent: "destructive",
				appearance: "outline",
				lifted: true,
				className: [
					"text-error",
					"hover:bg-error-500/29d active:bg-error-500/20d focus-visible:bg-error-500/29d",
					"border-error-600",
					"dark:hover:bg-error-500/14d dark:active:bg-error-500/20d dark:focus-visible:bg-error-500/14d",
					"dark:border-error-250 dark:hover:border-error-250/50 active:hover:border-error-250/25",
				],
			},
			{
				intent: "destructive",
				appearance: "ghost",
				lifted: false,
				className: [
					"text-error",
					"hover:bg-error-500/23d active:bg-error-500/17d focus-visible:bg-error-500/23d",
					"dark:hover:bg-error-500/14d dark:active:bg-error-500/8d dark:focus-visible:bg-error-500/14d",
				],
			},
			{
				intent: "destructive",
				appearance: "ghost",
				lifted: true,
				className: [
					"text-error",
					"hover:bg-error-500/29d active:bg-error-500/20d focus-visible:bg-error-500/29d",
					"dark:hover:bg-error-500/14d dark:active:bg-error-500/20d dark:focus-visible:bg-error-500/14d",
				],
			},
			{
				intent: "destructive",
				appearance: "link",
				className: "text-error text-error-interactive",
			},

			{
				intent: "visited",
				appearance: "solid",
				className:
					"text-neutral-light bg-visited-500 hover:bg-visited-500|10l focus-visible:bg-visited-500|10l active:bg-visited-500|-5l",
			},
			{
				intent: "visited",
				appearance: "subtle",
				lifted: false,
				className: [
					[
						"text-visited surface-visited",
						"hover:bg-visited-500/17d focus-visible:bg-visited-500/17d active:bg-visited-500/11d",
						"dark:hover:bg-visited-500/8d dark:focus-visible:bg-visited-500/8d dark:active:bg-visited-500/5d",
					],
				],
			},
			{
				intent: "visited",
				appearance: "subtle",
				lifted: true,
				className: [
					[
						"text-visited surface-visited",
						"hover:bg-visited-500/29d focus-visible:bg-visited-500/29d active:bg-visited-500/20d",
						"dark:hover:bg-visited-500/8d dark:focus-visible:bg-visited-500/8d dark:active:bg-visited-500/20d",
					],
				],
			},
			{
				intent: "visited",
				appearance: "outline",
				lifted: false,
				className: [
					"text-visited",
					"hover:bg-visited-500/23d active:bg-visited-500/17d focus-visible:bg-visited-500/23d",
					"border-visited-600",
					"dark:hover:bg-visited-500/14d dark:active:bg-visited-500/8d dark:focus-visible:bg-visited-500/14d",
					"dark:border-visited-250 dark:hover:border-visited-250/50 active:hover:border-visited-250/25",
				],
			},
			{
				intent: "visited",
				appearance: "outline",
				lifted: true,
				className: [
					"text-visited",
					"hover:bg-visited-500/29d active:bg-visited-500/20d focus-visible:bg-visited-500/29d",
					"border-visited-600",
					"dark:hover:bg-visited-500/14d dark:active:bg-visited-500/20d dark:focus-visible:bg-visited-500/14d",
					"dark:border-visited-250 dark:hover:border-visited-250/50 active:hover:border-visited-250/25",
				],
			},
			{
				intent: "visited",
				appearance: "ghost",
				lifted: false,
				className: [
					"text-visited",
					"hover:bg-visited-500/23d active:bg-visited-500/17d focus-visible:bg-visited-500/23d",
					"dark:hover:bg-visited-500/14d dark:active:bg-visited-500/8d dark:focus-visible:bg-visited-500/14d",
				],
			},
			{
				intent: "visited",
				appearance: "ghost",
				lifted: true,
				className: [
					"text-visited",
					"hover:bg-visited-500/29d active:bg-visited-500/20d focus-visible:bg-visited-500/29d",
					"dark:hover:bg-visited-500/14d dark:active:bg-visited-500/20d dark:focus-visible:bg-visited-500/14d",
				],
			},
			{
				intent: "visited",
				appearance: "link",
				className: "text-visited text-visited-interactive",
			},

			{
				intent: "warning",
				appearance: "solid",
				className:
					"text-neutral-dark bg-warning-300 hover:bg-warning-300|10l focus-visible:bg-warning-300|10l active:bg-warning-300|-5l",
			},
			{
				intent: "warning",
				appearance: "subtle",
				lifted: false,
				className: [
					"text-warning surface-warning",
					"hover:bg-warning-500/17d focus-visible:bg-warning-500/17d active:bg-warning-500/11d",
					"dark:hover:bg-warning-500/8d dark:focus-visible:bg-warning-500/8d dark:active:bg-warning-500/5d",
				],
			},
			{
				intent: "warning",
				appearance: "subtle",
				lifted: true,
				className: [
					"text-warning surface-warning",
					"hover:bg-warning-500/29d focus-visible:bg-warning-500/29d active:bg-warning-500/20d",
					"dark:hover:bg-warning-500/8d dark:focus-visible:bg-warning-500/8d dark:active:bg-warning-500/20d",
				],
			},
			{
				intent: "warning",
				appearance: "outline",
				lifted: false,
				className: [
					"text-warning",
					"hover:bg-warning-500/23d active:bg-warning-500/17d focus-visible:bg-warning-500/23d",
					"border-warning-600",
					"dark:hover:bg-warning-500/14d dark:active:bg-warning-500/8d dark:focus-visible:bg-warning-500/14d",
					"dark:border-warning-250 dark:hover:border-warning-250/50 dark:active:border-warning-250/25",
				],
			},
			{
				intent: "warning",
				appearance: "outline",
				lifted: true,
				className: [
					"text-warning",
					"hover:bg-warning-500/29d active:bg-warning-500/20d focus-visible:bg-warning-500/29d",
					"border-warning-600",
					"dark:hover:bg-warning-500/14d dark:active:bg-warning-500/20d dark:focus-visible:bg-warning-500/14d",
					"dark:border-warning-250 dark:hover:border-warning-250/50 dark:active:border-warning-250/25",
				],
			},
			{
				intent: "warning",
				appearance: "ghost",
				lifted: false,
				className: [
					"text-warning",
					"hover:bg-warning-500/23d active:bg-warning-500/17d focus-visible:bg-warning-500/23d",
					"dark:hover:bg-warning-500/14d dark:active:bg-warning-500/8d dark:focus-visible:bg-warning-500/14d",
				],
			},
			{
				intent: "warning",
				appearance: "ghost",
				lifted: true,
				className: [
					"text-warning",
					"hover:bg-warning-500/29d active:bg-warning-500/20d focus-visible:bg-warning-500/29d",
					"dark:hover:bg-warning-500/14d dark:active:bg-warning-500/20d dark:focus-visible:bg-warning-500/14d",
				],
			},
			{
				intent: "warning",
				appearance: "link",
				className: "text-warning text-warning-interactive",
			},

			{
				intent: "success",
				appearance: "solid",
				className:
					"text-neutral-dark bg-success-350 hover:bg-success-350|10l focus-visible:bg-success-350|10l active:bg-success-350|-5l",
			},
			{
				intent: "success",
				appearance: "subtle",
				lifted: false,
				className: [
					"text-success surface-success",
					"hover:bg-success-500/17d focus-visible:bg-success-500/17d active:bg-success-500/11d",
					"dark:hover:bg-success-500/8d dark:focus-visible:bg-success-500/8d dark:active:bg-success-500/5d",
				],
			},
			{
				intent: "success",
				appearance: "subtle",
				lifted: true,
				className: [
					"text-success surface-success",
					"hover:bg-success-500/29d focus-visible:bg-success-500/29d active:bg-success-500/20d",
					"dark:hover:bg-success-500/8d dark:focus-visible:bg-success-500/8d dark:active:bg-success-500/20d",
				],
			},
			{
				intent: "success",
				appearance: "outline",
				lifted: false,
				className: [
					"text-success",
					"hover:bg-success-500/23d active:bg-success-500/17d focus-visible:bg-success-500/17d",
					"border-success-600",
					"dark:hover:bg-success-500/14d dark:active:bg-success-500/8d dark:focus-visible:bg-success-500/8d",
					"dark:border-success-250 dark:hover:border-success-250/50 dark:active:border-success-250/25",
				],
			},
			{
				intent: "success",
				appearance: "outline",
				lifted: true,
				className: [
					"text-success",
					"hover:bg-success-500/29d active:bg-success-500/20d focus-visible:bg-success-500/29d",
					"border-success-600",
					"dark:hover:bg-success-500/14d dark:active:bg-success-500/14d dark:focus-visible:bg-success-500/20d",
					"dark:border-success-250 dark:hover:border-success-250/50 dark:active:border-success-250/25",
				],
			},
			{
				intent: "success",
				appearance: "ghost",
				lifted: false,
				className: [
					"text-success",
					"hover:bg-success-500/23d active:bg-success-500/23d focus-visible:bg-success-500/17d",
					"dark:hover:bg-success-500/14d dark:active:bg-success-500/8d dark:focus-visible:bg-success-500/14d",
				],
			},
			{
				intent: "success",
				appearance: "ghost",
				lifted: true,
				className: [
					"text-success",
					"hover:bg-success-500/29d active:bg-success-500/29d focus-visible:bg-success-500/20d",
					"dark:hover:bg-success-500/14d dark:active:bg-success-500/20d dark:focus-visible:bg-success-500/14d",
				],
			},
			{
				intent: "success",
				appearance: "link",
				className: "text-success text-success-interactive",
			},

			{
				intent: "secondary",
				appearance: "solid",
				className:
					"text-neutral-light bg-neutral-500 hover:bg-neutral-500|10l focus-visible:bg-neutral-500|10l active:bg-neutral-500|-5l",
			},
			{
				intent: "secondary",
				appearance: "subtle",
				lifted: false,
				className: [
					"text-muted surface-neutral",
					"hover:bg-neutral-500/17d focus-visible:bg-neutral-500/17d active:bg-neutral-500/11d",
					"dark:hover:bg-neutral-500/8d dark:focus-visible:bg-neutral-500/8d dark:active:bg-neutral-500/5d",
				],
			},
			{
				intent: "secondary",
				appearance: "subtle",
				lifted: true,
				className: [
					"text-muted surface-neutral",
					"hover:bg-neutral-500/29d focus-visible:bg-neutral-500/29d active:bg-neutral-500/20d",
					"dark:hover:bg-neutral-500/8d dark:focus-visible:bg-neutral-500/8d dark:active:bg-neutral-500/20d",
				],
			},
			{
				intent: "secondary",
				appearance: "outline",
				lifted: false,
				className: [
					"text-muted",
					"hover:bg-neutral-500/23d active:bg-neutral-500/17d focus-visible:bg-neutral-500/17d",
					"border-neutral-600",
					"dark:hover:bg-neutral-500/14d dark:active:bg-neutral-500/8d dark:focus-visible:bg-neutral-500/5d",
					"dark:border-neutral-250 dark:hover:border-neutral-250/50 dark:active:border-neutral-250/25",
				],
			},
			{
				intent: "secondary",
				appearance: "outline",
				lifted: true,
				className: [
					"text-muted",
					"hover:bg-neutral-500/29d active:bg-neutral-500/20d focus-visible:bg-neutral-500/29d",
					"border-neutral-600",
					"dark:hover:bg-neutral-500/14d dark:active:bg-neutral-500/20d dark:focus-visible:bg-neutral-500/14d",
					"dark:border-neutral-250 dark:hover:border-neutral-250/50 dark:active:border-neutral-250/25",
				],
			},
			{
				intent: "secondary",
				appearance: "ghost",
				lifted: false,
				className: [
					"text-muted",
					"hover:bg-neutral-500/23d active:bg-neutral-500/17d focus-visible:bg-neutral-500/23d",
					"dark:hover:bg-neutral-500/14d dark:active:bg-neutral-500/8d dark:focus-visible:bg-neutral-500/14d",
				],
			},
			{
				intent: "secondary",
				appearance: "ghost",
				lifted: true,
				className: [
					"text-muted",
					"hover:bg-neutral-500/29d active:bg-neutral-500/20d focus-visible:bg-neutral-500/29d",
					"dark:hover:bg-neutral-500/14d dark:active:bg-neutral-500/14d dark:focus-visible:bg-neutral-500/20d",
				],
			},
			{
				intent: "secondary",
				appearance: "link",
				className: "text-muted text-muted-interactive",
			},
		],
		defaultVariants: {
			intent: "primary",
			size: "m",
			shape: "rounded",
			appearance: "solid",
			aspect: "normal",
			lifted: false,
			disabled: false,
			loading: false,
		},
	},
);

const intentColors = {
	primary: "primary",
	secondary: "neutral",
	destructive: "error",
	warning: "warning",
	success: "success",
	visited: "visited",
} as const;

export function Button({
	className,
	intent,
	size,
	aspect,
	shape,
	children,
	appearance,
	disabled,
	loading,
	lifted,
	onMouseDown,
	onMouseUp,
	onKeyDown,
	onKeyUp,
	...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
	const effects = useWaveAnimate({
		animateClassName: `before:animate-wave-${intentColors[intent ?? "primary"]}`,
		disabled: appearance === "link",
		onKeyDown,
		onKeyUp,
		onMouseDown,
		onMouseUp,
	});
	return (
		<button
			ref={effects.ref}
			data-slot="button"
			className={clsx(
				buttonVariants({
					intent,
					size,
					aspect: aspect,
					shape,
					appearance,
					disabled,
					loading,
					lifted: lifted,
				}),
				className,
			)}
			onKeyDown={effects.onKeyDown}
			onKeyUp={effects.onKeyUp}
			onMouseDown={effects.onMouseDown}
			onMouseUp={effects.onMouseUp}
			disabled={disabled || !!loading}
			{...props}
		>
			{loading && <SpinnerIcon className="animate-spin absolute" />}
			{loading ? (
				<span className="text-transparent">{children}</span>
			) : (
				children
			)}
		</button>
	);
}
