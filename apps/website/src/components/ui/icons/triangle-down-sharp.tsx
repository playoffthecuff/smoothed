import type { IconProps } from "./types";

export function TriangleDownSharpIcon({ size="1.25em", strokeWidth = 2, fill="none", ...props }: IconProps) {
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
			<path d="M17.1963 7H6.80371L12 16L17.1963 7Z"/>
		</svg>
	);
}