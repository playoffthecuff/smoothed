import type { JSX } from "react";
import { ErrorFilledIcon } from "./icons/error-filled";
import { ErrorOutlinedIcon } from "./icons/error-outlined";
import { InfoFilledIcon } from "./icons/info-filled";
import { InfoOutlinedIcon } from "./icons/info-outlined";
import { SuccessFilledIcon } from "./icons/success-filled";
import { SuccessOutlinedIcon } from "./icons/success-outlined";
import type { IconProps } from "./icons/types";
import { WarningFilledIcon } from "./icons/warning-filled";
import { WarningOutlinedIcon } from "./icons/warning-outlined";
import type { Intent } from "./types";

type Kind = "filled" | "outlined";

const intentIconMap: Record<
	Kind,
	Partial<Record<Intent, (p: IconProps) => JSX.Element>>
> = {
	filled: {
		danger: ErrorFilledIcon,
		warning: WarningFilledIcon,
		success: SuccessFilledIcon,
		info: InfoFilledIcon,
	},
	outlined: {
		danger: ErrorOutlinedIcon,
		warning: WarningOutlinedIcon,
		success: SuccessOutlinedIcon,
		info: InfoOutlinedIcon,
	},
} as const;

export const intentToIcon = (kind: Kind, intent: Intent) => {
	if (!(intent in intentIconMap[kind])) return null;
	return intentIconMap[kind][intent];
};
