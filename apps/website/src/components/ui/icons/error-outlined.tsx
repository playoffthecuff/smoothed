import type { IconProps } from "./types";

export function ErrorOutlinedIcon({
	size = 1.25,
	width,
	height,
	strokeWidth = 1.75,
	stroke = "currentColor",
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			stroke={stroke}
			{...props}
		>
			<circle cx="12" cy="12" r="9" strokeWidth={strokeWidth} fill="none" />
			<path
				d="M8.5 15.5L15.5 8.5"
				strokeWidth={
					typeof strokeWidth === "string" ? strokeWidth : strokeWidth * 1.2
				}
			/>
			<path
				d="M15.5 15.5L8.5 8.5"
				strokeWidth={
					typeof strokeWidth === "string" ? strokeWidth : strokeWidth * 1.2
				}
			/>
		</svg>
	);
}
