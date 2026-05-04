import type { IconProps } from "./types";

export function SuccessOutlinedIcon({
	size = 1.25,
	width,
	height,
	strokeWidth = 1.75,
	stroke = "currentColor",
	fill,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke={stroke}
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			{...props}
		>
			<path
				d="M7.25 12L10.7502 15.5002"
				strokeWidth={
					typeof strokeWidth === "number" ? strokeWidth * 1.25 : 2.25
				}
			/>
			<path
				d="M10.75 15.5013L16.2513 9.99999"
				strokeWidth={
					typeof strokeWidth === "number" ? strokeWidth * 1.25 : 2.25
				}
			/>
			<rect x="3" y="3" width="18" height="18" rx="3" fill="none" />
		</svg>
	);
}
