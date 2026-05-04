"use client";

import { getOkLCHMaxChroma } from "colorizr";
import { useTheme } from "next-themes";
import { HelpIcon } from "@/components/ui/icons/help";

interface Props {
	lightness: number;
	borderRadius: number;
	chroma: number;
	hue: number;
}

export function Card({ hue, chroma, borderRadius, lightness }: Props) {
	const { theme } = useTheme();
	return (
		<div
			className="flex flex-col border border-gray-500 overflow-hidden shadow-5d"
			style={{
				borderRadius,
			}}
		>
			<div className="flex overflow-hidden">
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="h-26d w-18d"
						style={{
							backgroundColor: `oklch(${(i + 2) / 10} ${getOkLCHMaxChroma({ c: 0, h: hue, l: (i + 2) / 10 }) * chroma * 0.8} ${hue}`,
						}}
					></div>
				))}
			</div>
			<div className="flex flex-col gap-15d p-15d">
				<div className="flex justify-between">
					<p
						className="flex gap-8d items-center"
						style={{
							color: `oklch(${lightness ** 0.5 / 1.4} ${0.25 * chroma} ${hue})`,
						}}
					>
						<HelpIcon />
						<span>Message</span>
					</p>
					<a
						href="./"
						className="underline cursor-pointer"
						style={{
							color: `oklch(${lightness ** 0.5 / 1.4} ${0.25 * chroma} ${hue})`,
						}}
					>
						Link
					</a>
				</div>
				<button
					type="button"
					className="inline-flex items-center justify-center gap-11d rounded-6d transition-all leading-[1] px-14d py-12d"
					style={{
						backgroundColor: `oklch(${lightness ** 0.5 / 1.4} ${0.25 * chroma} ${hue})`,
						color: `oklch(${lightness ** 0.5 / 1.4 < 0.55 ? 1 : 0} 0 0)`,
						borderRadius: borderRadius / 1.5,
					}}
				>
					Button
				</button>
			</div>
			<div
				className="flex flex-col gap-14d p-14d"
				style={{
					backgroundColor: `oklch(${theme === "dark" ? 0.3 : 0.9} 0.04 ${hue})`,
				}}
			>
				<p
					className="flex gap-16d items-center leading-none"
					style={{
						color: `oklch(${theme === "dark" ? 0.9 : 0.15} 0.05 0)`,
					}}
				>
					<span>Text</span>
				</p>
				<p className="flex gap-16d items-center leading-none">
					<span
						style={{
							color: `oklch(${theme === "dark" ? 0.6 : 0.4} 0.05 0)`,
						}}
					>
						Muted text
					</span>
				</p>
			</div>
		</div>
	);
}
