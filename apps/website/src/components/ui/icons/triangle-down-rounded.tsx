import type { IconProps } from "./types";

export function TriangleDownRoundedIcon({ size="1.25em", strokeWidth = 2, fill="none", ...props }: IconProps) {
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
			<path d="M17.1577 7H6.84227C6.46274 7 6.22158 7.40624 6.40332 7.73943L11.5611 17.1953C11.7506 17.5427 12.2494 17.5427 12.4389 17.1953L17.5967 7.73943C17.7784 7.40624 17.5373 7 17.1577 7Z"/>
		</svg>
	);
}