import { assert, hasOwn } from "../ds-utils";

//TODO Change chroma from rel to abs values
export const options = {
	lightness: {
		range: {
			max: 1,
			mid: 0.5,
			min: 0,
			spread: 1, // maxRangeLim - minRangeLim = (1000 - 0)
		},
		scale: {
			max: 1,
			min: 0.2,
			mid: 0.6,
			spread: 0.8, // maxRangeLim - minRangeLim = (1000 - 200)
		},
		semanticColor: {
			max: 0.85, // scale.max - surface.spread - hover = 0.85,
			mid: 0.6,
			min: 0.35, // scale.min + surface.spread + active = 0.35,
			spread: 0.5,
			minDiff: { light: 0.01, dark: 0.01 },
		},
		surface: {
			step: 0.05,
			quantity: 3,
			spread: 0.1, // step * (quantity - 1)
			interactiveDelta: 0.1,
		},
	},
	color: {
		background: {
			// без возможности удаления пользователем
			l: 0.9,
			h: {
				max: 90,
				mid: 90,
				min: 90,
			},
			c: 0.05,
		},
		foreground: {
			// без возможности удаления пользователем
			l: 0.2,
			h: {
				max: 270,
				mid: 270,
				min: 270,
			},
			c: 0.1,
		},
		neutral: {
			l: 0.5,
			h: {
				max: 225,
				mid: 225,
				min: 225,
			},
			c: 0.05,
		},
		accent: {
			l: 0.45,
			h: {
				max: 270,
				mid: 264,
				min: 259,
			},
			c: 1,
		},
		success: {
			l: 0.6,
			h: {
				max: 143,
				mid: 142,
				min: 140,
			},
			c: 1,
		},
		warning: {
			l: 0.75,
			h: {
				max: 125,
				mid: 110,
				min: 70,
			},
			c: 1,
		},
		danger: {
			l: 0.55,
			h: {
				max: 25,
				mid: 29,
				min: 35,
			},
			c: 1,
		},
		info: {
			l: 0.7,
			h: {
				max: 200,
				mid: 195,
				min: 180,
			},
			c: 1,
		},
		visited: {
			l: 0.65,
			h: {
				max: 326,
				mid: 328,
				min: 332,
			},
			c: 1,
		},
	},
	size: {
		radius: 1.25,
		spacing: 0.0625,
		text: 1,
		borderWidth: 0.075,
		textWeight: 1,
	},
	animation: {
		transitionTime: "0.15s",
	},
	sun: {
		x: -2,
		y: 2,
		z: 30,
	},
	semanticColors: [
		"neutral",
		"accent",
		"info",
		"success",
		"warning",
		"danger",
		"visited",
	],
	intentColors: ["accent", "info", "success", "warning", "danger"],
	baseColors: ["foreground", "background"],
	allColors: [
		"neutral",
		"accent",
		"info",
		"success",
		"warning",
		"danger",
		"foreground",
		"background",
		"visited",
	],
	emphasis: ["low", "medium", "high"],
	modes: ["light", "dark"],
	states: ["idle", "hover", "active", "pressed", "unpressed"],
} as const;

export type Options = typeof options;
export type ThemeHue = {
	max: number;
	mid: number;
	min: number;
};

export const semanticColors = [...options.semanticColors] as const;
export const intentColors = [...options.intentColors] as const;
export const baseColors = [...options.baseColors] as const;
export const allColors = [...semanticColors, ...baseColors, "default"] as const;
export const emphases = [...options.emphasis] as const;
export const widths = ["narrow", "normal", "wide", "fill"] as const;
export const shapes = ["square", "squircle", "rounded", "circular"] as const;
export const modes = [...options.modes] as const;
export const states = [...options.states] as const;

export type State = (typeof states)[number];
export type Mode = (typeof modes)[number];
export type SemanticColor = (typeof semanticColors)[number];
export type BaseColor = (typeof baseColors)[number];
export type Color = (typeof allColors)[number];
export type Emphasis = (typeof emphases)[number];
export type Width = (typeof widths)[number];
export type Shape = (typeof shapes)[number];

export function assertMaybeColor(
	color: string | undefined,
): asserts color is Color | undefined {
	assert(
		color === undefined || hasOwn(options.color, color),
		`No such color ${color} in the preset options`,
	);
}
export function assertState(state: string): asserts state is State {
	assert(
		states.includes(state as State),
		`No such state ${state} in the preset options`,
	);
}
export function assertEmphasis(emphasis: string): asserts emphasis is Emphasis {
	assert(
		emphases.includes(emphasis as Emphasis),
		`No such emphasis ${emphasis} in the preset options`,
	);
}
export function assertMode(mode: string): asserts mode is Mode {
	assert(
		modes.includes(mode as Mode),
		`No such mode ${mode} in the preset options`,
	);
}
