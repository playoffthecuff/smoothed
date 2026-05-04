import type { IconProps } from "./types";

export function KeyIcon({
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
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			{...props}
		>
			<path d="M20 10.4999C15.9815 10.4999 13.7285 10.5 9.71001 10.5" />
			<path d="M12 13.4999L9.71 13.5001" />
			<path d="M22 12.5L20 10.5" />
			<path d="M14 15.5L12 13.5" />
			<path d="M18 15.5L16 13.5" />
			<path d="M16 13.5L14 15.5" />
			<path d="M22 12.5L18 15.5" />
			<circle cx="6" cy="12" r="1.5" stroke="none" />
			<path
				d="M9.70793 13.5004C9.35969 14.361 8.72294 15.0737 7.90684 15.5162C7.09073 15.9588 6.1461 16.1037 5.23486 15.9261C4.32362 15.7486 3.50253 15.2595 2.91234 14.5429C2.32214 13.8263 1.9996 12.9267 2 11.9983C2.0004 11.0699 2.32372 10.1706 2.91453 9.45444C3.50534 8.73832 4.32685 8.25001 5.23824 8.07321C6.14963 7.8964 7.09414 8.04213 7.90986 8.4854C8.72558 8.92867 9.36171 9.64187 9.70922 10.5028"
				fill="none"
			/>
		</svg>
	);
}
