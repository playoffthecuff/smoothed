import type { IconProps } from "./types";
export function SmartphoneIcon({
	width = 24,
	height = 24,
	strokeWidth = 2,
}: IconProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			stroke="none"
			fill="none"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M18 18V4C18 2.89543 17.1046 2 16 2H8C6.89543 2 6 2.89543 6 4V18" stroke="currentColor"/>
			<circle cx="12" cy="5" r="1" />
			<path d="M19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5 21V18H19V21ZM10.5 20C10.2239 20 10 20.2239 10 20.5C10 20.7761 10.2239 21 10.5 21H13.5C13.7761 21 14 20.7761 14 20.5C14 20.2239 13.7761 20 13.5 20H10.5Z" fill="currentColor"/>
		</svg>
	);
}
