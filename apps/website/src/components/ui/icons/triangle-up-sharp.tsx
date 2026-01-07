import type { IconProps } from "./types";

export function TriangleUpSharpIcon({ size="1.25em", strokeWidth = 2, fill="none", ...props }: IconProps) {
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
			<path d="M17.1963 16H6.80371L12 7L17.1963 16Z"/>
		</svg>
	);
}