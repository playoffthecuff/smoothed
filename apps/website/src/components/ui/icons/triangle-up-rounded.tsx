import type { IconProps } from "./types";

export function TriangleUpRoundedIcon({ size="1.25em", strokeWidth = 2, fill="none", ...props }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={fill}
			stroke="currentColor"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M17.1577 17H6.84227C6.46274 17 6.22158 16.5938 6.40332 16.2606L11.5611 6.80474C11.7506 6.45731 12.2494 6.45731 12.4389 6.80474L17.5967 16.2606C17.7784 16.5938 17.5373 17 17.1577 17Z"/>
		</svg>
	);
}