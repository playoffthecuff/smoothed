import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { ErrorIcon } from "../icons/error";
import { SuccessIcon } from "../icons/success";
import { WarningIcon } from "../icons/warning";
import { IntentMessage } from "../intent-message/intent-message";
import { Label } from "../label/label";
import { Popover, PopoverPortal, PopoverTrigger } from "../popover/popover";
import { Select, type SelectProps } from "../select/select";
import { HintButton } from "./hint-button";

export type SelectFieldProps = SelectProps & {
	label: string;
	message?: string;
	popoverMessage?: string;
	hint?: string;
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

export function SelectField({
	hint,
	label,
	message,
	popoverMessage,
	size,
	required,
	shape,
	width,
	id,
	...selectProps
}: SelectFieldProps) {
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
	const select = (
		<Select
			size={size}
			{...selectProps}
			required={required}
			shape={shape}
			width={width}
			id={id}
		/>
	);
	return (
		<div className={cn("flex flex-col", width !== "fill" && "w-min")}>
			<div className="flex items-center justify-between me-2d">
				<Label intent={intent} size={size} required={required} htmlFor={id}>
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
					<PopoverTrigger>{select}</PopoverTrigger>
					<PopoverPortal>{intentMessage}</PopoverPortal>
				</Popover>
			) : (
				select
			)}
			{message && (
				<span className={intentMessageWrapperVariants({ size })}>
					{intentMessage}
				</span>
			)}
		</div>
	);
}
