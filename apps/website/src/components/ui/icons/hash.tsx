import type { IconProps } from "./types";

export function HashIcon({
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
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M4.33 9L20.33 9" />
			<path d="M3.67 15L19.67 15" />
			<path d="M9.98456 4.06006L8 19.9365" />
			<path d="M15.9846 4.06006L14 19.9365" />
		</svg>
	);
}
