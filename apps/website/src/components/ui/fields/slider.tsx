import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ErrorIcon } from "../icons/error";
import { SuccessIcon } from "../icons/success";
import { WarningIcon } from "../icons/warning";
import { IntentMessage } from "../intent-message/intent-message";
import { Label } from "../label/label";
import { Popover, PopoverPortal, PopoverTrigger } from "../popover/popover";
import { Slider, type SliderProps } from "../slider/slider";
import { HintButton } from "./hint-button";

export type SliderFieldProps = SliderProps & {
	label: string;
	message?: string;
	hint?: string;
	popoverMessage?: string;
};

const statusToIntent = {
	valid: "success",
	warning: "warning",
	invalid: "error",
} as const;

const intentToIcon = {
	success: SuccessIcon,
	warning: WarningIcon,
	error: ErrorIcon,
};
const intentMessageWrapperVariants = cva(null, {
	variants: {
		size: {
			xs: "mt-6d",
			s: "mt-7d",
			m: "mt-8d",
			l: "mt-9d",
			xl: "mt-10d",
		},
	},
	defaultVariants: {
		size: "m",
	},
});

export function SliderField({
	hint,
	label,
	message,
	popoverMessage,
	width,
	shape,
	size,
	id,
	...selectProps
}: SliderFieldProps) {
	const intent = selectProps.status
		? statusToIntent[selectProps.status]
		: undefined;
	const intentMessage = (
		<IntentMessage
			intent={intent}
			size={size}
			iconStart={intent ? intentToIcon[intent] : undefined}
		>
			{popoverMessage ? popoverMessage : message}
		</IntentMessage>
	);
	const slider = (
		<Slider {...selectProps} id={id} shape={shape} size={size} width={width} />
	);
	return (
		<div className={cn("flex flex-col", width !== "fill" && "w-min")}>
			<div className="flex items-center justify-between">
				<Label intent={intent} size={size} htmlFor={id}>
					{label}
				</Label>
				{hint && (
					<HintButton size={size} shape={shape}>
						{hint}
					</HintButton>
				)}
			</div>
			{popoverMessage ? (
				<Popover open>
					<PopoverTrigger>{slider}</PopoverTrigger>
					<PopoverPortal>{intentMessage}</PopoverPortal>
				</Popover>
			) : (
				slider
			)}
			{message && (
				<span className={intentMessageWrapperVariants({ size })}>
					{intentMessage}
				</span>
			)}
		</div>
	);
}
