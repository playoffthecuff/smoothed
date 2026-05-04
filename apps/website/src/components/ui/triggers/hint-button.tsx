"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { HelpFilledIcon } from "../icons/help-filled";
import { SpinnerIcon } from "../icons/spinner";
import { Popover } from "../overlays/popover";
import type {
	PopoverPortalProps,
	PopoverTriggerProps,
} from "../overlays/popover/parts";
import { Variants } from "../variants";

export const hintButtonVariants = cva("cursor-help h-full aspect-square", {
	variants: {
		disabled: { true: "sfc-disabled" },
		loading: { true: "cursor-wait" },
		shape: {
			square: null,
			rounded: "sfc-rounded",
			circular: "rounded-full before:rounded-full",
		},
		emphasis: {
			low: "sfc-emphasis-low-on-low",
			medium: "sfc-emphasis-medium-on-medium",
			high: "sfc-emphasis-high-on-high",
		},
	},
	defaultVariants: {},
});

type HintButtonVariants = VariantProps<typeof hintButtonVariants>;

export type HintButtonProps = FlattenIntersection<
	PopoverPortalProps &
		HintButtonVariants & {
			className?: string | undefined;
			children?: ReactNode;
			disabled?: boolean | null | undefined;
			loading?: boolean | null | undefined;
		} & Pick<PopoverTriggerProps, "openOnHover" | "delay">
>;

export function HintButton({
	children,
	className,
	openOnHover,
	delay,
	...props
}: HintButtonProps) {
	return (
		<Popover.Root>
			<Popover.Trigger
				className={cn(
					props.disabled && "cursor-not-allowed",
					"relative h-full",
				)}
				openOnHover={openOnHover}
				delay={delay}
			>
				<div
					className={cn(
						hintButtonVariants(props),
						Variants.fontSizeVariants(props),
						Variants.semiBoldFontVariants(props),
						className,
					)}
				>
					<button
						className={cn(
							"w-full h-full flex items-center justify-center transition-colors outline-none",
							props.loading ? "cursor-wait" : "cursor-help",
						)}
						type="button"
					>
						{props.loading ? (
							<SpinnerIcon className="animate-spin absolute pointer-events-none" />
						) : (
							<HelpFilledIcon size={1} />
						)}
					</button>
				</div>
			</Popover.Trigger>
			<Popover.Portal {...props}>{children}</Popover.Portal>
		</Popover.Root>
	);
}
