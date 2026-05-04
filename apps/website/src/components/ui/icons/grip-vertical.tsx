import type { IconProps } from "./types";

export function GripVerticalIcon({
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
			fill="currentColor"
			strokeWidth={strokeWidth}
			{...props}
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="9" cy="6" r="2" />
			<circle cx="15" cy="6" r="2" />
			<circle cx="9" cy="12" r="2" />
			<circle cx="15" cy="12" r="2" />
			<circle cx="9" cy="18" r="2" />
			<circle cx="15" cy="18" r="2" />
		</svg>
	);
}
