import type { IconProps } from "./types";

export function WarningOutlinedIcon({
	size = 1.25,
	width,
	height,
	fill = "currentColor",
	stroke = "currentColor",
	strokeWidth = 1.75,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			stroke={stroke}
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M10.6584 2.68328L2.08541 19.8292C1.58673 20.8265 2.31198 22 3.42705 22H20.5729C21.688 22 22.4133 20.8265 21.9146 19.8292L13.3416 2.68328C12.7889 1.57771 11.2111 1.57771 10.6584 2.68328Z"
				fill="none"
				strokeWidth={strokeWidth}
			/>
			<circle cx="12" cy="17.25" r="1.75" stroke="none" />
			<path
				d="M10.2828 9.7299L10.8586 13.7601C10.9397 14.3281 11.4262 14.75 12 14.75C12.5738 14.75 13.0603 14.3281 13.1414 13.7601L13.7172 9.7299C13.8664 8.68492 13.0556 7.75 12 7.75C10.9444 7.75 10.1336 8.68492 10.2828 9.7299Z"
				stroke="none"
			/>
		</svg>
	);
}
