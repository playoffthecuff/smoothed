import type { IconProps } from "./types";

export function TriangleDownSharpIcon({
	size = 1.25,
	width,
	height,
	fill,
	strokeWidth = 1.75,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			stroke="currentColor"
			fill="none"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M17.1963 7H6.80371L12 16L17.1963 7Z" />
		</svg>
	);
}
