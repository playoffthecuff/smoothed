import { cva } from "class-variance-authority";

export type IntentSurface = {
	intent?: "neutral" | "accent" | "success" | "warning" | "danger" | "info";
};

type Config = {
	intent: Record<NonNullable<IntentSurface["intent"]>, string>;
};

export const intentSurfaceVariants = cva<Config>(null, {
	variants: {
		intent: {
			neutral: "sfc-color-neutral-on-neutral",
			accent: "sfc-color-accent-on-accent",
			success: "sfc-color-success-on-success",
			warning: "sfc-color-warning-on-warning",
			danger: "sfc-color-danger-on-danger",
			info: "sfc-color-info-on-info",
		},
	},
	compoundVariants: [
		{
			intent: undefined,
			className: "sfc-color-default-on-default",
		},
	],
});

export const interactiveIntentSurfaceVariants = cva<Config>(null, {
	variants: {
		intent: {
			neutral: "sfc-color-neutral-on-neutral-ia",
			accent: "sfc-color-accent-on-accent-ia",
			success: "sfc-color-success-on-success-ia",
			warning: "sfc-color-warning-on-warning-ia",
			danger: "sfc-color-danger-on-danger-ia",
			info: "sfc-color-info-on-info-ia",
		},
	},
	compoundVariants: [
		{
			intent: undefined,
			className: "sfc-color-default-on-default-ia",
		},
	],
});
