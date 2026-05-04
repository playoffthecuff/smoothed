import type { IconProps } from "./types";

export function ChevronUpDownIcon({
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
			{...props}
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			strokeLinecap="round"
			stroke="currentColor"
		>
			<path d="M6 15L12 21" />
			<path d="M12 21L18 15" />
			<path d="M6 9L12 3" />
			<path d="M12 3L18 9" />
		</svg>
	);
}
