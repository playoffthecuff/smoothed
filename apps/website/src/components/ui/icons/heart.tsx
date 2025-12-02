import type { IconProps } from "./types";

export function HeartIcon({ width = "1.25em", height = "1.25em", strokeWidth = 2 }: IconProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M3.57695 12.8096L10.9229 20.3887C11.5122 20.9968 12.4878 20.9968 13.0771 20.3887L20.423 12.8096C22.4164 10.753 22.4164 7.48514 20.423 5.42854C18.3397 3.27901 14.8911 3.27901 12.8077 5.42854L12.1795 6.07669C12.0813 6.17803 11.9187 6.17803 11.8205 6.07669L11.1923 5.42854C9.10889 3.27901 5.66034 3.27901 3.57695 5.42854C1.58363 7.48514 1.58363 10.753 3.57695 12.8096Z"/>
		</svg>
	);
}