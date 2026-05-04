import type { IconProps } from "./types";

export function PlusIcon({
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
			xmlns="http://www.w3.org/2000/svg"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			stroke="currentColor"
			{...props}
		>
			<path d="M12 19L12 5" />
			<path d="M19 12L5 12" />
		</svg>
	);
}
