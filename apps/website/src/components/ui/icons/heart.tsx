import type { IconProps } from "./types";

export function HeartIcon({
	size = "1.25em",
	strokeWidth = 2,
	fill = "none",
	...props
}: IconProps) {
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
			<path d="M11.8147 7.5677L11.6575 7.2008C10.3846 4.23076 6.51455 3.48545 4.22967 5.77033C2.44597 7.55403 2.44597 10.446 4.22967 12.2297L8.59965 16.5997C9.53094 17.5309 10.368 18.5519 11.0985 19.6478L11.792 20.688C11.8909 20.8364 12.1091 20.8364 12.208 20.688L12.9015 19.6478C13.632 18.5519 14.4691 17.5309 15.4003 16.5997L19.7703 12.2297C21.554 10.446 21.554 7.55403 19.7703 5.77033C17.4855 3.48545 13.6154 4.23076 12.3425 7.2008L12.1853 7.5677C12.1155 7.73059 11.8845 7.73059 11.8147 7.5677Z" />
		</svg>
	);
}
