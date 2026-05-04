import type { GetStaticRule } from "../types";

export const getRippleScaleKeyFrames = () => ({
	"ripple-scale": "{0% {scale: 0} 50% {scale: 1} 100% {scale: 1} }",
});

export const getRippleColorKeyFrames = () => ({
	"ripple-color":
		"{0% {background-color: var(--ripple-start-color)} 25% {background-color: var(--ripple-start-color)} 100% {background-color: var(--ripple-end-color)}}",
});

export const getRippleAnimationShortcut = () => ({
	"animate-ripple":
		"animate-[ripple-scale_var(--ripple-time,1.2s)_cubic-bezier(0,.8,.2,1)_1,ripple-color_var(--ripple-time,1.2s)_cubic-bezier(0,.8,.2,1)_1]",
});

export const getShimmerKeyFrames = () => ({
	"shimmer-position":
		"{0% {background-position: -400px 0%} 100% {background-position: 400px 0%}}",
});

export const getTextShimmerRules: GetStaticRule = () => [
	"shimmer-text",
	{
		background: "linear-gradient(105deg, var(--color), #FFF, var(--color))",
		"background-size": "800px 100%",
		"background-clip": "text",
		animation:
			"calc(var(--transition-time) * 10) linear infinite shimmer-position",
		"background-repeat": "no-repeat",
		"background-color": "var(--color)",
		color: "transparent",
	},
];

export const getShimmerRules: GetStaticRule = () => [
	"shimmer-bg",
	{
		background:
			"linear-gradient(to right, oklch(from var(--bg-color) calc(l - 0.1) c h) 38%, oklch(from var(--bg-color) calc(l + 0.1) c h) 50%, oklch(from var(--bg-color) calc(l - 0.1) c h) 62%)",
		"background-size": "800px",
		animation:
			"calc(var(--transition-time) * 10) linear infinite shimmer-position",
		color: "oklch(from var(--color) l c h / 0.67)",
	},
];
