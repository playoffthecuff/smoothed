import type { IconProps } from "./types";

export function TextIcon({
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
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
			stroke="currentColor"
		>
			<path d="M4 6L12 6" />
			<path d="M8 6L8 18" />
			<path d="M15 11L20 11" />
			<path d="M17 8L17 15.9775C17 17.0945 17.9055 18 19.0225 18C19.3365 18 19.6462 17.9269 19.9271 17.7865L20.5 17.5" />
		</svg>
	);
}
