import type { IconProps } from "./types";

export function HelpOutlinedIcon({
	size = 1.25,
	width,
	height,
	fill,
	stroke = "currentColor",
	strokeWidth = 1.75,
	...props
}: IconProps) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			strokeLinecap="round"
			strokeWidth={strokeWidth}
			stroke={stroke}
			fill="none"
			{...props}
		>
			<circle cx="12" cy="12" r="9" />
			<circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" />
			<path d="M9.5 9L9.5347 8.8612C9.80816 7.76736 10.791 7 11.9185 7H11.9984C13.1534 7 14.1392 7.83506 14.3291 8.97439C14.4346 9.60765 14.1894 10.2485 13.6881 10.6495L12.7809 11.3753C12.2873 11.7701 12 12.3679 12 13" />
		</svg>
	);
}
