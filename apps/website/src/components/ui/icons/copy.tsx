import type { IconProps } from "./types";
export function CopyIcon({
	size = 1.5,
	width,
	height,
	fill,
	copied,
	strokeWidth = 1.5,
	...props
}: IconProps & { copied?: boolean }) {
	return (
		<svg
			width={`${size}em` || width}
			height={`${size}em` || height}
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			fill="none"
			stroke="currentColor"
		>
			<path d="M6 20C3.79086 20 2 18.2091 2 16V6C2 3.79086 3.79086 2 6 2H16C18.2091 2 20 3.79086 20 6" />
			<path d="M19 6H9C7.34315 6 6 7.34315 6 9V19C6 20.6569 7.34315 22 9 22H19C20.6569 22 22 20.6569 22 19V9C22 7.34315 20.6569 6 19 6Z" />
			<g className={copied ? "" : "hidden"}>
				<path d="M10 13.5L13 16.5" strokeLinecap="round" />
				<path d="M13 16.5L18 11.5" strokeLinecap="round" />
			</g>
		</svg>
	);
}
