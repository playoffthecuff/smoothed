import { Sandbox } from "@/components/sandbox/sandbox";
import type { SelectFieldProps } from "@/components/ui/data-entry/fields/select/parts";
import { SliderField } from "@/components/ui/data-entry/fields/slider";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { T } from "@/components/ui/typography";
import type { UnionsRecordIntoTuplesRecord } from "@/lib/types/helpers";
import { capitalize } from "@/lib/utils/str";

export default function SliderFieldPage() {
	const variantCfg: UnionsRecordIntoTuplesRecord<SelectFieldProps> = {
		shape: ["square", "rounded", "circular"],
		size: ["xs", "s", "m", "l", "xl"],
		width: ["narrow", "normal", "wide", "fill"],
		intent: ["neutral", "accent", "success", "warning", "danger", "info"],
		emphasis: ["low", "medium", "high"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Select Field</T.Title>
				<p>
					Labeled control that provides a menu with options to choose from with
					an optional message and hint.
				</p>
			</div>
			<div>
				<T.Title size={"xl"} as={"h2"}>
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add select-field"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<T.Title size="xl" as="h2">
				Variants:
			</T.Title>
			<div className="flex flex-col gap-16d items-start">
				<div className="w-full">
					<T.Title size="l" as="h3">
						Options
					</T.Title>
					<div className="flex flex-col gap-16d mt-4">
						<div className="flex items-center gap-16d">
							<SliderField.Root id="e" defaultValue={50} solid>
								<SliderField.Slider />
							</SliderField.Root>
							Only Slider
						</div>
						<SliderField.Root id="e" defaultValue={[25, 75]} solid>
							<SliderField.Slider />
							<SliderField.Message>Range</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root id="ol" defaultValue={50} solid>
							<SliderField.Label>With Label</SliderField.Label>
							<SliderField.Slider />
						</SliderField.Root>
						<SliderField.Root id="ol" defaultValue={50} solid required>
							<SliderField.Label>Required</SliderField.Label>
							<SliderField.Slider />
						</SliderField.Root>
						<SliderField.Root id="wm" defaultValue={50} solid>
							<SliderField.Label>With Message</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Message</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root id="pm" defaultValue={50} solid>
							<SliderField.Label>Popover Message</SliderField.Label>
							<SliderField.Popover open>
								<SliderField.Slider />
								<SliderField.PopoverMessage>Message</SliderField.PopoverMessage>
							</SliderField.Popover>
						</SliderField.Root>
					</div>
				</div>
				<div className="w-full">
					<T.Title size="l" as="h3">
						Size
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.size?.map((size) => (
							<SliderField.Root
								id={size}
								defaultValue={50}
								key={size}
								size={size}
								solid
							>
								<SliderField.Label>{capitalize(size)}</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>{capitalize(size)}</SliderField.Message>
							</SliderField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size="l" as="h3">
						Width
					</T.Title>
					<li className="ms-4">
						<T.Title size="m" as="h4">
							Flex
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						{variantCfg.width?.map((width) => (
							<SliderField.Root
								id={width}
								defaultValue={50}
								key={width}
								width={width}
								solid
							>
								<SliderField.Label>{capitalize(width)}</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>{capitalize(width)}</SliderField.Message>
							</SliderField.Root>
						))}
					</div>
					<li className="ms-4">
						<T.Title size="m" as="h4">
							Block
						</T.Title>
					</li>
					<div>
						{variantCfg.width?.map((width) => (
							<SliderField.Root
								id={width}
								defaultValue={50}
								key={width}
								width={width}
								className={"not-last:me-4 mb-4"}
								solid
							>
								<SliderField.Label>{capitalize(width)}</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>{capitalize(width)}</SliderField.Message>
							</SliderField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size="l" as="h3">
						Shape
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.shape?.map((shape) => (
							<SliderField.Root
								id={shape}
								defaultValue={50}
								key={shape}
								shape={shape}
								solid
							>
								<SliderField.Label>{capitalize(shape)}</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>{capitalize(shape)}</SliderField.Message>
							</SliderField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size="l" as="h3">
						Appearance
					</T.Title>
					<li className="ms-4">
						<T.Title size="m" as="h4">
							Flat
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<SliderField.Root defaultValue={50} flat>
							<SliderField.Label>None</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>None</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root defaultValue={50} outlined flat>
							<SliderField.Label>Outlined</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Outlined</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root defaultValue={50} solid flat>
							<SliderField.Label>Solid</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Solid</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root defaultValue={50} solid outlined flat>
							<SliderField.Label>Solid & Outlined</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Solid & Outlined</SliderField.Message>
						</SliderField.Root>
					</div>
					<li className="ms-4">
						<T.Title size="m" as="h4" className="mt-2">
							Lowered
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<SliderField.Root defaultValue={50}>
							<SliderField.Label>None</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>None</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root defaultValue={50} outlined>
							<SliderField.Label>Outlined</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Outlined</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root defaultValue={50} solid>
							<SliderField.Label>Solid</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Solid</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root defaultValue={50} solid outlined>
							<SliderField.Label>Solid & Outlined</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Solid & Outlined</SliderField.Message>
						</SliderField.Root>
					</div>
				</div>
				<div className="w-full">
					<T.Title size={"l"} as="h3">
						Intent / Emphasis
					</T.Title>
					<li className="ms-4">
						<T.Title size="m" as="h4">
							Flat
						</T.Title>
					</li>
					<div className="grid grid-cols-[repeat(3,max-content)] gap-12d w-fit">
						<div className="col-span-3 -mb-2 flex items-start">
							<div
								className="w-20 grid grid-cols-2"
								style={{
									background:
										"linear-gradient(20deg, transparent 48.5%, currentColor, transparent 51.5%)",
								}}
							>
								<div></div>
								<div>Emphasis</div>
								<div>Intent</div>
							</div>
							<div
								className="aspect-16 w-full ml-4"
								style={{
									background: `linear-gradient(
									to right,
									oklch(0.3 0 29 / 0),
									oklch(0.3 0.3 29 / 0.8)
								)`,
									clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 90%)",
								}}
							/>
						</div>
						{variantCfg.emphasis?.map((emphasis) => (
							<SliderField.Root
								id={emphasis}
								defaultValue={50}
								key={emphasis}
								width={"narrow"}
								emphasis={emphasis}
							>
								<SliderField.Label>No Intent</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>
									{capitalize(emphasis)}
								</SliderField.Message>
							</SliderField.Root>
						))}

						{variantCfg.intent?.map((intent) =>
							variantCfg.emphasis?.map((emphasis) => (
								<SliderField.Root
									id={`${intent}${emphasis}`}
									defaultValue={50}
									key={emphasis}
									emphasis={emphasis}
									intent={intent}
									width={"narrow"}
								>
									<SliderField.Label>{capitalize(intent)}</SliderField.Label>
									<SliderField.Slider />
									<SliderField.Message>
										{capitalize(emphasis)}
									</SliderField.Message>
								</SliderField.Root>
							)),
						)}
						{variantCfg.emphasis?.map((emphasis) => (
							<SliderField.Root
								id={emphasis}
								defaultValue={50}
								key={emphasis}
								width={"narrow"}
								emphasis={emphasis}
								outlined
							>
								<SliderField.Label>No Intent</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>
									{capitalize(emphasis)}
								</SliderField.Message>
							</SliderField.Root>
						))}

						{variantCfg.intent?.map((intent) =>
							variantCfg.emphasis?.map((emphasis) => (
								<SliderField.Root
									id={`${intent}${emphasis}`}
									defaultValue={50}
									key={emphasis}
									emphasis={emphasis}
									intent={intent}
									width={"narrow"}
									outlined
								>
									<SliderField.Label>{capitalize(intent)}</SliderField.Label>
									<SliderField.Slider />
									<SliderField.Message>
										{capitalize(emphasis)}
									</SliderField.Message>
								</SliderField.Root>
							)),
						)}
						{variantCfg.emphasis?.map((emphasis) => (
							<SliderField.Root
								id={emphasis}
								defaultValue={50}
								key={emphasis}
								width={"narrow"}
								emphasis={emphasis}
								solid
							>
								<SliderField.Label>No Intent</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>
									{capitalize(emphasis)}
								</SliderField.Message>
							</SliderField.Root>
						))}

						{variantCfg.intent?.map((intent) =>
							variantCfg.emphasis?.map((emphasis) => (
								<SliderField.Root
									id={`${intent}${emphasis}`}
									defaultValue={50}
									key={emphasis}
									emphasis={emphasis}
									intent={intent}
									width={"narrow"}
									solid
								>
									<SliderField.Label>{capitalize(intent)}</SliderField.Label>
									<SliderField.Slider />
									<SliderField.Message>
										{capitalize(emphasis)}
									</SliderField.Message>
								</SliderField.Root>
							)),
						)}
						{variantCfg.emphasis?.map((emphasis) => (
							<SliderField.Root
								id={emphasis}
								defaultValue={50}
								key={emphasis}
								width={"narrow"}
								emphasis={emphasis}
								solid
								outlined
							>
								<SliderField.Label>No Intent</SliderField.Label>
								<SliderField.Slider />
								<SliderField.Message>
									{capitalize(emphasis)}
								</SliderField.Message>
							</SliderField.Root>
						))}

						{variantCfg.intent?.map((intent) =>
							variantCfg.emphasis?.map((emphasis) => (
								<SliderField.Root
									id={`${intent}${emphasis}`}
									defaultValue={50}
									key={emphasis}
									emphasis={emphasis}
									intent={intent}
									width={"narrow"}
									solid
									outlined
								>
									<SliderField.Label>{capitalize(intent)}</SliderField.Label>
									<SliderField.Slider />
									<SliderField.Message>
										{capitalize(emphasis)}
									</SliderField.Message>
								</SliderField.Root>
							)),
						)}
					</div>
				</div>

				<div className="w-full">
					<T.Title size="l" as="h3">
						State
					</T.Title>
					<div className="flex flex-col gap-16d">
						<SliderField.Root id="disabled" defaultValue={50} disabled solid>
							<SliderField.Label>Disabled</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Disabled</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root id="loading" defaultValue={50} loading solid>
							<SliderField.Label>Loading</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Loading</SliderField.Message>
						</SliderField.Root>
						<SliderField.Root
							id="disabled_n_loading"
							defaultValue={50}
							disabled
							loading
							solid
						>
							<SliderField.Label>Disabled & Loading</SliderField.Label>
							<SliderField.Slider />
							<SliderField.Message>Disabled & Loading</SliderField.Message>
						</SliderField.Root>
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
