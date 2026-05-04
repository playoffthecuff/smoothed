export type Size = "xs" | "s" | "m" | "l" | "xl";
export type Shape = "square" | "rounded" | "circular";
export type Width = "narrow" | "normal" | "wide" | "fill";
export type State = "disabled" | "loading";
export type Status = "valid" | "warning" | "invalid";
export type Appearance =
	| "solid"
	| "subtle"
	| "outline"
	| "dashed"
	| "ghost"
	| "text";
export type Intent =
	| "neutral"
	| "accent"
	| "info"
	| "success"
	| "warning"
	| "danger";

export interface ComponentAppearance {
	size: Size | null;
	shape: Shape | null;
	width: Width | null;
	intent: Intent | null;
}

export interface ComponentState {
	disabled: boolean | null;
	loading: boolean | null;
	status: Status | null;
}

export interface CompoundProps {
	children?: React.ReactNode;
	className?: string;
}
