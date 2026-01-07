"use client";
import { Slider } from "@base-ui-components/react/slider";
import { useState } from "react";
import { NumberField } from "../fields/s/number";

interface Props {
	initialValue: number;
	min?: number;
	max?: number;
	step?: number;
	onChange?: (v: number) => void;
}

export default function NumberSlider({
	max,
	min,
	step,
	initialValue,
	onChange,
}: Props) {
	const [value, setValue] = useState(initialValue);
	const handleChange = (v: number) => {
		setValue(v);
		if (onChange) onChange(v);
	};
	return (
		<div className="flex items-center gap-18d">
			<Slider.Root
				min={min}
				max={max}
				step={step}
				value={value}
				onValueChange={handleChange}
			>
				<Slider.Control className="flex w-56 touch-none items-center py-2 select-none cursor-pointer">
					<Slider.Track className="h-2 w-full rounded bg-secondary outline outline-2 outline-gray-fg select-none">
						<Slider.Indicator className="rounded bg-secondary-fg-1 select-none" />
						<Slider.Thumb className="size-4 rounded-full bg-secondary-3 outline outline-2 outline-gray-fg select-none has-[:focus-visible]:outline" />
					</Slider.Track>
				</Slider.Control>
			</Slider.Root>
			<NumberField
				onValueChange={(v) => handleChange(v ?? 0)}
				min={0}
				max={100}
				value={value}
			/>
		</div>
	);
}
