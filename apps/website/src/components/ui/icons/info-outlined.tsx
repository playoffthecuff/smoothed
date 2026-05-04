import type { IconProps } from "./types";

export function InfoOutlinedIcon({
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
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			strokeLinecap="round"
			strokeWidth={strokeWidth}
			{...props}
		>
			<circle cx="12" cy="12" r="9" fill="none" />
			<circle cx="12" cy="7.25" r="1.75" fill="currentColor" stroke="none" />
			<path
				d="M12 17.25V12.25"
				strokeWidth={
					typeof strokeWidth === "string" ? strokeWidth : strokeWidth * 1.2
				}
			/>
		</svg>
	);
}
