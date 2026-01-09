"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { ChromaSlider } from "@/components/ui/sliders/chroma-slider";
import { LightnessSlider } from "@/components/ui/sliders/lightness-slider";
import NumberSlider from "@/components/ui/sliders/number-slider";
import { OklchSlider } from "@/components/ui/sliders/oklch-slider";
import type { ColorSpace } from "@/lib/utils/colors";
import { type Color, createUnoConfig } from "@/lib/utils/uno-config";
import { Card } from "./card";

//TODO refactor the page

const initialValues = {
	coldWarmK: 1,
	colorSpace: "srgb" as ColorSpace,
	maxBrightness: 1,
	minBrightness: 0,
	grayHue: 142,
	grayChroma: 0.5,
	blueHue: 264,
	blueChroma: 1,
	greenHue: 142,
	greenChroma: 1,
	yellowHue: 110,
	yellowChroma: 1,
	redHue: 29,
	redChroma: 1,
	purpleHue: 328,
	purpleChroma: 1,
	spacingSize: 1,
	radius: 1.25,
	textSize: 1,
};

const initialColors: Color[] = [
	{ purpose: "primary", hue: 264, chroma: 1, lightness: 0.5 },
	{ purpose: "secondary", hue: 264, chroma: 0.05, lightness: 0.5 },
	{ purpose: "success", hue: 142, chroma: 1, lightness: 0.7 },
	{ purpose: "error", hue: 29, chroma: 1, lightness: 0.55 },
	{ purpose: "warning", hue: 110, chroma: 1, lightness: 0.8 },
	{ purpose: "visited", hue: 328, chroma: 1, lightness: 0.525 },
	{ purpose: "background", hue: 90, chroma: 0.05, lightness: 1 },
	{ purpose: "foreground", hue: 270, chroma: 0.05, lightness: 0 },
];

export default function ThemeEditorPage() {
	const { theme } = useTheme();
	const [minBrightness, setMinBrightness] = useState(
		initialValues.minBrightness,
	);
	const [maxBrightness, setMaxBrightness] = useState(
		initialValues.maxBrightness,
	);
	const [spacingSize, setSpacingSize] = useState(initialValues.spacingSize);
	const [radius, setRadius] = useState(initialValues.radius);
	const [textSize, setTextSize] = useState(initialValues.textSize);
	const [key, setKey] = useState(0);

	const [colors, setColors] = useState(initialColors);

	return (
		<div
			className="font-8d flex gap-20d w-screen max-w-414 mx-auto grow"
			style={{
				backgroundColor: `oklch(${theme === "dark" ? 0.2 : 0.8} 0.05 0)`,
				fontSize: `calc(${spacingSize * 2 ** (0.25 * (textSize - 1))}rem)`,
			}}
			suppressHydrationWarning
		>
			<div
				className="flex flex-col gap-8d min-w-100 sticky top-12 overflow-x-hidden overflow-y-auto"
				style={{
					backgroundColor: `oklch(${theme === "dark" ? 0.3 : 0.95} 0.05 0)`,
					height: "calc(100dvh - 3rem)",
				}}
			>
				{colors.map(({ chroma, hue, purpose, lightness }, i) => (
					<div className="py-12d px-16d flex flex-col gap-10d" key={i}>
						<input
							value={purpose}
							className="outline-none capitalize"
							onChange={(e) =>
								setColors((prev) => [
									...prev.slice(0, i),
									{ ...prev[i], purpose: e.target.value },
									...prev.slice(i + 1),
								])
							}
						/>
						<OklchSlider
							initialValue={hue}
							onChange={(v) =>
								setColors((prev) => [
									...prev.slice(0, i),
									{ ...prev[i], hue: v },
									...prev.slice(i + 1),
								])
							}
							colorSpace={"srgb"}
							key={key}
						/>
						<ChromaSlider
							hue={hue}
							colorSpace={"srgb"}
							value={chroma * 100}
							onChange={(v) =>
								setColors((prev) => [
									...prev.slice(0, i),
									{ ...prev[i], chroma: v / 100 },
									...prev.slice(i + 1),
								])
							}
							initialValue={chroma * 100}
							step={chroma < 0.01 ? 0.1 : chroma < 0.1 ? 0.5 : 1}
						/>
						<LightnessSlider
							hue={hue}
							chroma={chroma}
							value={lightness * 100}
							onChange={(v) =>
								setColors((prev) => [
									...prev.slice(0, i),
									{ ...prev[i], lightness: v / 100 },
									...prev.slice(i + 1),
								])
							}
							initialValue={lightness * 100}
							step={lightness < 0.01 ? 0.1 : lightness < 0.1 ? 0.25 : 0.5}
						/>
					</div>
				))}
				<hr />
				<div className="py-12d px-16d flex flex-col gap-10d w-fit">
					{/** biome-ignore lint/a11y/noLabelWithoutControl: '' */}
					<label>Minimum Brightness</label>
					<NumberSlider
						initialValue={initialValues.minBrightness}
						onChange={(v) => setMinBrightness(+v)}
						min={0}
						max={0.25}
						step={0.025}
						key={key}
					/>
				</div>
				<div className="py-12d px-16d flex flex-col gap-10d w-fit">
					{/** biome-ignore lint/a11y/noLabelWithoutControl: '' */}
					<label>Maximum Brightness</label>
					<NumberSlider
						initialValue={initialValues.maxBrightness}
						onChange={(v) => setMaxBrightness(+v)}
						min={0.75}
						max={1}
						step={0.025}
						key={key}
					/>
				</div>
				<div className="py-12d px-16d flex flex-col gap-10d w-fit">
					{/** biome-ignore lint/a11y/noLabelWithoutControl: '' */}
					<label>Spacing</label>
					<NumberSlider
						initialValue={initialValues.spacingSize}
						onChange={(v) => setSpacingSize(+v)}
						min={0.5}
						max={2}
						step={0.1}
						key={key}
					/>
				</div>
				<div className="py-12d px-16d flex flex-col gap-10d w-fit">
					{/** biome-ignore lint/a11y/noLabelWithoutControl: '' */}
					<label>Radius</label>
					<NumberSlider
						initialValue={initialValues.radius}
						onChange={(v) => setRadius(+v)}
						min={0}
						max={2}
						step={0.1}
						key={key}
					/>
				</div>
				<div className="py-12d px-16d flex flex-col gap-10d w-fit">
					{/** biome-ignore lint/a11y/noLabelWithoutControl: '' */}
					<label>Font Size</label>
					<NumberSlider
						initialValue={initialValues.textSize}
						onChange={(v) => setTextSize(+v)}
						min={0.4}
						max={1.6}
						step={0.1}
						key={key}
					/>
				</div>
				<div className="py-12d px-16d flex flex-col gap-10d">
					<button
						type="button"
						className="inline-flex cursor-pointer items-center justify-center gap-12d rounded-6d transition-all leading-[1] px-13d py-12d"
						style={{
							backgroundColor: `oklch(${theme === "dark" ? 0 : 0.7} 0.05 0)`,
							color: "var(--colors-gray-850)",
							borderRadius: `calc(var(--spacing-size) * ${radius} * 4rem)`,
						}}
						onClick={() => {
							setMaxBrightness(initialValues.maxBrightness);
							setMinBrightness(initialValues.minBrightness);
							setSpacingSize(initialValues.spacingSize);
							setColors(initialColors);
							setKey((v) => v + 1);
						}}
					>
						Reset
					</button>
				</div>
			</div>
			<div
				className="self-start flex-grow overflow-y-auto"
				style={{ height: "calc(100vh - 48px)" }}
			>
				<div
					className="p-18d flex gap-16d flex-wrap max-w-200 justify-center"
					style={{
						backgroundColor: `oklch(${theme === "dark" ? 0.3 : 0.95} 0.05 0)`,
					}}
				>
					<div className="w-full flex flex-col gap-14d items-center">
						<div className="flex items-end w-90 justify-between">
							<h1
								className="text-8d font-11d leading-[1]"
								style={{ fontSize: spacingSize * textSize * 2 ** 2 * 8 }}
							>
								Heading 1
							</h1>
							<h6
								className="text-3d font-11d leading-[1.5]"
								style={{ fontSize: spacingSize * textSize * 2 ** 0.75 * 8 }}
							>
								Heading 6
							</h6>
						</div>
						<div className="flex items-end w-90 justify-between">
							<h2
								className="text-7d font-11d leading-[1]"
								style={{ fontSize: spacingSize * textSize * 2 ** 1.75 * 8 }}
							>
								Heading 2
							</h2>
							<h5
								className="text-5d font-11d leading-[1.225]"
								style={{ fontSize: spacingSize * textSize * 2 ** 1 * 8 }}
							>
								Heading 5
							</h5>
						</div>
						<div className="flex items-end w-90 justify-between">
							<h3
								className="text-7d font-11d leading-[1]"
								style={{ fontSize: spacingSize * textSize * 2 ** 1.5 * 8 }}
							>
								Heading 3
							</h3>
							<h4
								className="text-6d font-11d leading-[1.025]"
								style={{ fontSize: spacingSize * textSize * 2 ** 1.25 * 8 }}
							>
								Heading 4
							</h4>
						</div>
					</div>
					{colors.map((v, i) => (
						<Card
							key={i}
							chroma={v.chroma}
							hue={v.hue}
							borderRadius={radius * spacingSize * 2 ** 2.75}
							lightness={v.lightness}
						></Card>
					))}
					<div className="flex gap-16d flex-wrap flex-col max-w-200 px-18d pt-12d">
						<p>
							Replace the contents of the default configuration file{" "}
							<code className="bg px-8d">uno.config.ts</code>
						</p>
						<HighlightedCode
							code={createUnoConfig(spacingSize, radius, textSize, colors)}
							language="js"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
