"use client";
import { Slider } from "@base-ui-components/react/slider";
import { getOkLCHMaxChroma } from "colorizr";
import { useState } from "react";
import { NumberField } from "../fields/s/number";

interface Props {
	hue: number;
	chroma: number;
	initialValue: number;
	onChange?: (v: number) => void;
	value?: number;
	step?: number;
}

export function LightnessSlider({
	hue,
	chroma,
	initialValue,
	onChange,
	value,
	step = 0.01,
}: Props) {
	const [innerValue, setValue] = useState(initialValue);
	console.log(chroma);
	const computedChroma =
		getOkLCHMaxChroma(
			{
				c: 0,
				h: hue,
				l: (value || innerValue) / 100,
			},
			4,
		) * chroma;
	const handleChange = (v: number) => {
		setValue(v);
		if (onChange) onChange(v);
	};
	return (
		<div className="flex gap-18d items-center">
			<Slider.Root
				min={0}
				max={100}
				step={step}
				value={value || innerValue}
				onValueChange={(v) => handleChange(+v)}
			>
				<Slider.Control className="flex w-56 touch-none items-center py-2 select-none cursor-pointer">
					<Slider.Track
						className="h-2 w-full rounded select-none outline outline-1 outline-gray-fg"
						style={{
							background: `linear-gradient(
									to right,
									${[...Array(11)].map((_, i) => `oklch(${i / 10} ${computedChroma} ${hue})`).join(", ")}
								)`,
						}}
					>
						<Slider.Thumb
							className="size-4 rounded-full bg-transparent outline outline-1 outline-gray-fg select-none has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
							style={{
								backgroundColor: `oklch(${(value || innerValue) / 100} ${computedChroma} ${hue})`,
							}}
						/>
					</Slider.Track>
				</Slider.Control>
			</Slider.Root>
			<NumberField
				onValueChange={(v) => handleChange(v ?? 0)}
				min={0}
				max={100}
				value={Math.round((value || innerValue) / step) * step}
				step={step}
			/>
		</div>
	);
}
