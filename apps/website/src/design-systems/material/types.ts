import type {
	CSSObject,
	DynamicRule,
	DynamicShortcut,
	StaticRule,
	StaticShortcut,
} from "unocss";
import type { Color, Emphasis, Mode, Options, State } from "./options";

export const states = [
	"idle",
	"hover",
	"active",
	"pressed",
	"unpressed",
] as const;

export interface SurfaceParams {
	opts: Options;
	emphasisStr?: Emphasis;
	color?: Color;
	isInteractive?: boolean;
	state?: State;
	elevation?: number;
	mode?: Mode;
}
export type SurfaceParamsHandler = (ctx: SurfaceParams) => number;

export type GetCssFromParams = (ctx: SurfaceParams) => CSSObject;
export type GetDynamicRule = (opts: Options) => DynamicRule;
export type GetDynamicShortcut = (opts: Options) => DynamicShortcut;
export type GetStaticShortcut = () => StaticShortcut;
export type GetStaticRule = () => StaticRule;
