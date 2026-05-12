import { intentToIcon } from "@/app/intent-to-icon";
import { Sandbox } from "@/components/sandbox/sandbox";
import { NumberField } from "@/components/ui/data-entry/fields/number/index";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { T } from "@/components/ui/typography";
import { emphases } from "@/design-systems/material/options";
import { capitalize } from "@/lib/utils/str";

export default function NumberFieldPage() {
	const variantsCfg = {
		shape: ["square", "rounded", "circular"],
		emphasis: ["low", "medium", "high"],
		intent: ["neutral", "accent", "success", "warning", "danger", "info"],
		size: ["xs", "s", "m", "l", "xl"],
		id: [""],
		width: ["narrow", "normal", "wide", "fill"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Number Field</T.Title>
				<p>
					Labeled control, with an optional message and hint. <br /> Accepts
					number data from the user.
				</p>
			</div>
			<div>
				<T.Title size={"xl"} as={"h2"}>
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add number-field"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<T.Title size={"xl"} as={"h2"}>
				Variants:
			</T.Title>
			<div className="flex flex-col gap-16d items-start">
				<div>
					<T.Title size={"l"} as={"h3"}>
						Options
					</T.Title>
					<div className="flex flex-col gap-16d">
						<NumberField.Root id="ol" defaultValue={100}>
							<NumberField.Label>Only Label</NumberField.Label>
							<NumberField.Input />
						</NumberField.Root>
						<NumberField.Root id="required" required defaultValue={100}>
							<NumberField.Label>Required</NumberField.Label>
							<NumberField.Input />
						</NumberField.Root>
						<NumberField.Root id="wm" defaultValue={100}>
							<NumberField.Label>With Message</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Message</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root
							id="cps"
							controlsPosition={"start"}
							defaultValue={100}
						>
							<NumberField.Label>Control Position Start</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Control Position Start</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root
							id="cpe"
							controlsPosition={"end"}
							defaultValue={100}
						>
							<NumberField.Label>Control Position End</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Control Position End</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root id="pm">
							<NumberField.Label>Popover Message</NumberField.Label>
							<NumberField.Popover open>
								<NumberField.Popover>
									<NumberField.Input defaultValue={200} />
									<NumberField.PopoverMessage className="leading-none">
										Message
									</NumberField.PopoverMessage>
								</NumberField.Popover>
							</NumberField.Popover>
						</NumberField.Root>
					</div>
				</div>
				<div>
					<T.Title size={"l"} as={"h3"}>
						Size
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantsCfg.size?.map((size) => (
							<NumberField.Root id={size} key={size} size={size}>
								<NumberField.Label>{capitalize(size)}</NumberField.Label>
								<NumberField.Input defaultValue={100} />
							</NumberField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size={"l"} as={"h3"}>
						Width
					</T.Title>
					<li className="ms-4">
						<T.Title size={"m"} as={"h4"}>
							Flex
						</T.Title>
					</li>
					<div className="flex flex-col gap-12d">
						{variantsCfg.width?.map((v) => (
							<NumberField.Root
								id={`${v}-flex`}
								key={v}
								width={v}
								defaultValue={100}
							>
								<NumberField.Label>{capitalize(v)}</NumberField.Label>
								<NumberField.Input />
								<NumberField.Message>{capitalize(v)}</NumberField.Message>
							</NumberField.Root>
						))}
					</div>
					<li className="ms-4 mt-2 -mb-1">
						<T.Title size={"m"} as={"h4"}>
							Block
						</T.Title>
					</li>
					<div>
						{variantsCfg.width?.map((v) => (
							<NumberField.Root
								id={`${v}-block`}
								key={v}
								width={v}
								defaultValue={100}
								className="not-last:me-4"
							>
								<NumberField.Label>{capitalize(v)}</NumberField.Label>
								<NumberField.Input />
								<NumberField.Message>{capitalize(v)}</NumberField.Message>
							</NumberField.Root>
						))}
					</div>
				</div>

				<div>
					<T.Title size={"l"} as={"h3"}>
						Shape
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantsCfg.shape?.map((v) => (
							<NumberField.Root id={v} key={v} shape={v} defaultValue={100}>
								<NumberField.Label>{capitalize(v)}</NumberField.Label>
								<NumberField.Input />
								<NumberField.Message>{capitalize(v)}</NumberField.Message>
							</NumberField.Root>
						))}
					</div>
				</div>
				<div>
					<T.Title size={"l"} as={"h3"}>
						Appearance
					</T.Title>
					<li className="ms-4 -mb-1">
						<T.Title size={"m"} as={"h4"}>
							Lowered
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<NumberField.Root id={"none"} defaultValue={100}>
							<NumberField.Label>None</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>None</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root id={"outlined"} outlined defaultValue={100}>
							<NumberField.Label>Outlined</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Outlined</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root
							id={"solid"}
							solid
							outlined={false}
							defaultValue={100}
						>
							<NumberField.Label>Solid</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Solid</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root
							id={"outlinednsolid"}
							outlined
							solid
							defaultValue={100}
						>
							<NumberField.Label>Solid & Outlined</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Solid & Outlined</NumberField.Message>
						</NumberField.Root>
					</div>
					<li className="ms-4 -mb-1 mt-2">
						<T.Title size={"m"} as={"h4"}>
							Flat
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<NumberField.Root id={"none"} flat defaultValue={100}>
							<NumberField.Label>None</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>None</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root id={"outlined"} outlined flat defaultValue={100}>
							<NumberField.Label>Outlined</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Outlined</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root
							id={"solid"}
							solid
							outlined={false}
							flat
							defaultValue={100}
						>
							<NumberField.Label>Solid</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Solid</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root
							id={"outlinednsolid"}
							outlined
							solid
							flat
							defaultValue={100}
						>
							<NumberField.Label>Solid & Outlined</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Solid & Outlined</NumberField.Message>
						</NumberField.Root>
					</div>
				</div>
				<div>
					<T.Title size={"l"} as={"h3"}>
						Emphasis / Intent
					</T.Title>
					<div className="flex flex-col gap-16d">
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<NumberField.Root
									key={`${emphasis}-1`}
									id={`${emphasis}-1`}
									width="narrow"
									emphasis={emphasis}
									shape={"rounded"}
									solid
									defaultValue={100}
								>
									<NumberField.Label>Label</NumberField.Label>
									<NumberField.Input />
									<NumberField.Message>No Intent</NumberField.Message>
								</NumberField.Root>
							))}
						</div>
						{variantsCfg.intent.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-1`} className="flex gap-16d">
									{emphases.map((emphasis) => (
										<NumberField.Root
											key={`${intent}-${emphasis}-1`}
											id={`${intent}-${emphasis}-1`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"rounded"}
											solid
											defaultValue={100}
										>
											<NumberField.Label>Label</NumberField.Label>
											<NumberField.Input />
											<NumberField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</NumberField.Message>
										</NumberField.Root>
									))}
								</div>
							);
						})}
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<NumberField.Root
									key={`${emphasis}-2`}
									id={`${emphasis}-2`}
									width="narrow"
									emphasis={emphasis}
									shape={"circular"}
									solid
									outlined
									defaultValue={100}
								>
									<NumberField.Label>Label</NumberField.Label>
									<NumberField.Input />
									<NumberField.Message>No Intent</NumberField.Message>
								</NumberField.Root>
							))}
						</div>
						{variantsCfg.intent.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-2`} className="flex gap-16d">
									{emphases.map((emphasis) => (
										<NumberField.Root
											key={`${intent}-${emphasis}-2`}
											id={`${intent}-${emphasis}-2`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"circular"}
											solid
											outlined
											defaultValue={100}
										>
											<NumberField.Label>Label</NumberField.Label>
											<NumberField.Input />
											<NumberField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</NumberField.Message>
										</NumberField.Root>
									))}
								</div>
							);
						})}
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<NumberField.Root
									key={`${emphasis}-3`}
									id={`${emphasis}-3`}
									width="narrow"
									emphasis={emphasis}
									shape={"square"}
									outlined
									defaultValue={100}
								>
									<NumberField.Label>Label</NumberField.Label>
									<NumberField.Input />
									<NumberField.Message>No Intent</NumberField.Message>
								</NumberField.Root>
							))}
						</div>
						{variantsCfg.intent.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-3`} className="flex gap-16d">
									{emphases.map((emphasis) => (
										<NumberField.Root
											key={`${intent}-${emphasis}-3`}
											id={`${intent}-${emphasis}-3`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"square"}
											outlined
											defaultValue={100}
										>
											<NumberField.Label>Label</NumberField.Label>
											<NumberField.Input />
											<NumberField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</NumberField.Message>
										</NumberField.Root>
									))}
								</div>
							);
						})}
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<NumberField.Root
									key={`${emphasis}-4`}
									id={`${emphasis}-4`}
									width="narrow"
									emphasis={emphasis}
									defaultValue={100}
								>
									<NumberField.Label>Label</NumberField.Label>
									<NumberField.Input />
									<NumberField.Message>No Intent</NumberField.Message>
								</NumberField.Root>
							))}
						</div>
						{variantsCfg.intent.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-4`} className="flex gap-16d">
									{emphases.map((emphasis) => (
										<NumberField.Root
											key={`${intent}-${emphasis}-4`}
											id={`${intent}-${emphasis}-4`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											defaultValue={100}
										>
											<NumberField.Label>Label</NumberField.Label>
											<NumberField.Input />
											<NumberField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</NumberField.Message>
										</NumberField.Root>
									))}
								</div>
							);
						})}
					</div>
				</div>
				<div>
					<T.Title size={"l"} as={"h3"}>
						State
					</T.Title>
					<div className="flex flex-col gap-16d">
						<NumberField.Root
							id="ringed"
							ringed
							intent={"danger"}
							defaultValue={100}
						>
							<NumberField.Label>
								Ringed - use it with intent to show a status, such as (in)valid
							</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Ringed</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root id="disabled" disabled defaultValue={100}>
							<NumberField.Label>Disabled</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Message</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root id="loading" loading defaultValue={100}>
							<NumberField.Label>Loading</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Message</NumberField.Message>
						</NumberField.Root>
						<NumberField.Root id="dnl" disabled loading defaultValue={100}>
							<NumberField.Label>Disabled & Loading</NumberField.Label>
							<NumberField.Input />
							<NumberField.Message>Message</NumberField.Message>
						</NumberField.Root>
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
