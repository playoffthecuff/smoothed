import type { JSX } from "react";
import { ErrorFilledIcon } from "../components/ui/icons/error-filled";
import { ErrorOutlinedIcon } from "../components/ui/icons/error-outlined";
import { InfoFilledIcon } from "../components/ui/icons/info-filled";
import { InfoOutlinedIcon } from "../components/ui/icons/info-outlined";
import { SuccessFilledIcon } from "../components/ui/icons/success-filled";
import { SuccessOutlinedIcon } from "../components/ui/icons/success-outlined";
import type { IconProps } from "../components/ui/icons/types";
import { WarningFilledIcon } from "../components/ui/icons/warning-filled";
import { WarningOutlinedIcon } from "../components/ui/icons/warning-outlined";
import type { Intent } from "../components/ui/types";

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
