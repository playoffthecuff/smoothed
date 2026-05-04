import type { IconProps } from "./types";

export function TriangleUpSharpIcon({
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
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			fill="none"
			stroke="currentColor"
		>
			<path d="M17.1963 16H6.80371L12 7L17.1963 16Z" />
		</svg>
	);
}
