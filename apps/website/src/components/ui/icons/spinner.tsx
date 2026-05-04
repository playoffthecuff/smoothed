export function SpinnerIcon({ size = 1.25, className = "" }) {
	return (
		<div
			className={className}
			style={{
				width: `${size}em`,
				height: `${size}em`,
				background: "conic-gradient(from 0deg, transparent, currentColor)",
				borderRadius: "50%",
				mask: `radial-gradient(farthest-side, transparent calc(100% - ${size}em / 5), black calc(100% - ${size}em / 5 + 1px))`,
			}}
		/>
	);
}
