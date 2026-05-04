import type { IconProps } from "./types";

export function ChevronDownIcon({
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
			fill="none"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			stroke="currentColor"
			{...props}
		>
			<path d="M12 15.5L19 8.5" />
			<path d="M5 8.5L12 15.5" />
		</svg>
	);
}
