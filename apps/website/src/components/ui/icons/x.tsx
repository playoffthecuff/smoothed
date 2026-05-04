import type { IconProps } from "./types";

export function XIcon({
	size = 1.25,
	width,
	height,
	strokeWidth = 1.75,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M6 6L18 18" />
			<path d="M6 18L18 6" />
		</svg>
	);
}
