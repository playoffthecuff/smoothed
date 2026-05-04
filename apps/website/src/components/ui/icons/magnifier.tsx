import type { IconProps } from "./types";

export function MagnifierIcon({
	size = 1.25,
	width,
	height,
	strokeWidth = 1.75,
	fill,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			{...props}
		>
			<path d="M21 21L15 15" />
			<circle cx="10" cy="10" r="7" fill="none" />
		</svg>
	);
}
