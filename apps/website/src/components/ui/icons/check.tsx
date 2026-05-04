import type { IconProps } from "./types";

export function CheckIcon({
	size = 1.25,
	width,
	height,
	strokeWidth = 2,
	fill,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			stroke="currentColor"
			{...props}
		>
			<path d="M4.5 12.5L9.5 17.5" />
			<path d="M9.5 17.5L19.5 7.5" />
		</svg>
	);
}
