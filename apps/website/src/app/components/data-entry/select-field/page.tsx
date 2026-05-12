import { intentToIcon } from "@/app/intent-to-icon";
import { Sandbox } from "@/components/sandbox/sandbox";
import { SelectField } from "@/components/ui/data-entry/fields/select";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { T } from "@/components/ui/typography";
import { capitalize } from "@/lib/utils/str";

const items = [
	{ label: "Choose", value: null },
	{ label: "One", value: 1 },
	{ label: "Two", value: 2 },
	{ label: "Three", value: 3 },
	{ label: "Four", value: 4 },
	{ label: "Five", value: 5 },
];

export default function SelectFieldPage() {
	const variantCfg = {
		shape: ["square", "rounded", "circular"],
		intent: ["neutral", "accent", "success", "warning", "danger", "info"],
		emphasis: ["low", "medium", "high"],
		size: ["xs", "s", "m", "l", "xl"],
		width: ["narrow", "normal", "wide", "fill"],
		id: [""],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title size={"xxl"} as="h1">
					Select Field
				</T.Title>
				<p>
					Labeled control that provides a menu with items to choose from with an
					optional message and hint.
				</p>
			</div>
			<div>
				<T.Title size={"xl"} as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add select-field"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<T.Title size={"xl"} as="h2">
				Variants:
			</T.Title>
			<div className="flex flex-col gap-16d items-start">
				<div>
					<T.Title size={"l"} as="h3">
						Options
					</T.Title>
					<div className="flex flex-col gap-14d mt-8d">
						<SelectField.Root items={items} defaultValue={"Only Select"}>
							<SelectField.Trigger />
						</SelectField.Root>
						<SelectField.Root items={items} defaultValue={"With Label"}>
							<SelectField.Label>Label</SelectField.Label>
							<SelectField.Trigger />
						</SelectField.Root>
						<SelectField.Root items={items}>
							<SelectField.Label>Hint</SelectField.Label>
							<SelectField.Trigger />
						</SelectField.Root>
						<SelectField.Root items={items} defaultValue={"Required"} required>
							<SelectField.Label>Required</SelectField.Label>
							<SelectField.Trigger />
						</SelectField.Root>
						<SelectField.Root items={items}>
							<SelectField.Label>With Message</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Message</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root items={items}>
							<SelectField.Label>With Message</SelectField.Label>
							<SelectField.Popover open>
								<SelectField.Trigger />
								<SelectField.PopoverMessage>Message</SelectField.PopoverMessage>
							</SelectField.Popover>
						</SelectField.Root>
					</div>
				</div>
				<div>
					<T.Title size={"l"} as="h3">
						Size
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.size?.map((v) => (
							<SelectField.Root size={v} id={v} key={v} items={items}>
								<SelectField.Label>Label</SelectField.Label>
								<SelectField.Trigger />
							</SelectField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size={"l"} as="h3">
						Width
					</T.Title>
					<li className="ms-4">
						<T.Title size={"m"} as="h4">
							Flex
						</T.Title>
					</li>
					<div className="flex flex-col gap-12d">
						{variantCfg.width?.map((v) => (
							<SelectField.Root width={v} id={v} key={v} items={items}>
								<SelectField.Label>{capitalize(v)}</SelectField.Label>
								<SelectField.Trigger />
								<SelectField.Message>{capitalize(v)}</SelectField.Message>
							</SelectField.Root>
						))}
					</div>
					<li className="ms-4">
						<T.Title size={"m"} as="h4">
							Block
						</T.Title>
					</li>
					<div className="w-full">
						{variantCfg.width?.map((v) => (
							<SelectField.Root width={v} id={v} key={v} items={items}>
								<SelectField.Label>{capitalize(v)}</SelectField.Label>
								<SelectField.Trigger className="not-last:me-4" />
								<SelectField.Message>{capitalize(v)}</SelectField.Message>
							</SelectField.Root>
						))}
					</div>
				</div>
				<div>
					<T.Title size={"l"} as="h3">
						Shape
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.shape?.map((v) => (
							<SelectField.Root shape={v} id={v} key={v} items={items}>
								<SelectField.Label>{capitalize(v)}</SelectField.Label>
								<SelectField.Trigger />
								<SelectField.Message>{capitalize(v)}</SelectField.Message>
							</SelectField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size={"l"} as="h3">
						Appearance
					</T.Title>
					<li className="ms-4 -mb-1">
						<T.Title size={"m"} as="h4">
							Lowered
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<SelectField.Root id={"none-lowered"} items={items}>
							<SelectField.Label>None</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>None</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root id={"outlined-lowered"} outlined items={items}>
							<SelectField.Label>Outlined</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Outlined</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root id={"solid-lowered"} solid items={items}>
							<SelectField.Label>Solid</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Solid</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root
							id={"solid-n-outlined-lowered"}
							solid
							outlined
							items={items}
						>
							<SelectField.Label>Solid</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Solid</SelectField.Message>
						</SelectField.Root>
					</div>
					<li className="ms-4 -mb-1 mt-2">
						<T.Title size={"m"} as="h4">
							Flat
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<SelectField.Root id={"none-lowered"} flat items={items}>
							<SelectField.Label>None</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>None</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root
							id={"outlined-lowered"}
							outlined
							flat
							items={items}
						>
							<SelectField.Label>Outlined</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Outlined</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root id={"solid-lowered"} solid flat items={items}>
							<SelectField.Label>Solid</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Solid</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root
							id={"solid-n-outlined-lowered"}
							solid
							outlined
							flat
							items={items}
						>
							<SelectField.Label>Solid</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Solid</SelectField.Message>
						</SelectField.Root>
					</div>
				</div>
				<div>
					<T.Title size={"l"} as="h3">
						Emphasis / Intent
					</T.Title>
					<div className="flex flex-col gap-16d">
						<div className="flex gap-16d">
							{variantCfg.emphasis?.map((emphasis) => (
								<SelectField.Root
									solid
									key={`none-${emphasis}`}
									id={`none-${emphasis}`}
									width="narrow"
									emphasis={emphasis}
									shape={"rounded"}
									items={items}
								>
									<SelectField.Label>Solid</SelectField.Label>
									<SelectField.Trigger />
									<SelectField.Message>No Intent</SelectField.Message>
								</SelectField.Root>
							))}
						</div>
						{variantCfg.intent?.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-1`} className="flex gap-16d">
									{variantCfg.emphasis?.map((emphasis) => (
										<SelectField.Root
											solid
											key={`${intent}-${emphasis}-1`}
											id={`${intent}-${emphasis}-1`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"rounded"}
											items={items}
										>
											<SelectField.Label>Solid</SelectField.Label>
											<SelectField.Trigger />
											<SelectField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</SelectField.Message>
										</SelectField.Root>
									))}
								</div>
							);
						})}
						<div className="flex gap-16d">
							{variantCfg.emphasis?.map((emphasis) => (
								<SelectField.Root
									solid
									outlined
									key={`none-${emphasis}`}
									id={`none-${emphasis}`}
									width="narrow"
									emphasis={emphasis}
									shape={"circular"}
									items={items}
								>
									<SelectField.Label>Solid & Outlined</SelectField.Label>
									<SelectField.Trigger />
									<SelectField.Message>No Intent</SelectField.Message>
								</SelectField.Root>
							))}
						</div>
						{variantCfg.intent?.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-2`} className="flex gap-16d">
									{variantCfg.emphasis?.map((emphasis) => (
										<SelectField.Root
											solid
											outlined
											key={`${intent}-${emphasis}-2`}
											id={`${intent}-${emphasis}-2`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"circular"}
											items={items}
										>
											<SelectField.Label>Solid & Outlined</SelectField.Label>
											<SelectField.Trigger />
											<SelectField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</SelectField.Message>
										</SelectField.Root>
									))}
								</div>
							);
						})}
						<div className="flex gap-16d">
							{variantCfg.emphasis?.map((emphasis) => (
								<SelectField.Root
									outlined
									key={`none-${emphasis}`}
									id={`none-${emphasis}`}
									width="narrow"
									emphasis={emphasis}
									shape={"square"}
									items={items}
								>
									<SelectField.Label>Outlined</SelectField.Label>
									<SelectField.Trigger />
									<SelectField.Message>No Intent</SelectField.Message>
								</SelectField.Root>
							))}
						</div>
						{variantCfg.intent?.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-3`} className="flex gap-16d">
									{variantCfg.emphasis?.map((emphasis) => (
										<SelectField.Root
											outlined
											key={`${intent}-${emphasis}-3`}
											id={`${intent}-${emphasis}-3`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"square"}
											items={items}
										>
											<SelectField.Label>Outlined</SelectField.Label>
											<SelectField.Trigger />
											<SelectField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</SelectField.Message>
										</SelectField.Root>
									))}
								</div>
							);
						})}
						<div className="flex gap-16d">
							{variantCfg.emphasis?.map((emphasis) => (
								<SelectField.Root
									key={`none-${emphasis}`}
									id={`none-${emphasis}`}
									width="narrow"
									emphasis={emphasis}
									items={items}
								>
									<SelectField.Label>None</SelectField.Label>
									<SelectField.Trigger />
									<SelectField.Message>No Intent</SelectField.Message>
								</SelectField.Root>
							))}
						</div>
						{variantCfg.intent?.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-4`} className="flex gap-16d">
									{variantCfg.emphasis?.map((emphasis) => (
										<SelectField.Root
											key={`${intent}-${emphasis}-4`}
											id={`${intent}-${emphasis}-4`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											items={items}
										>
											<SelectField.Label>None</SelectField.Label>
											<SelectField.Trigger />
											<SelectField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</SelectField.Message>
										</SelectField.Root>
									))}
								</div>
							);
						})}
					</div>
				</div>
				<div>
					<T.Title size={"l"} as="h3">
						State
					</T.Title>
					<div className="flex flex-col gap-16d">
						<SelectField.Root ringed intent={"danger"} items={items}>
							<SelectField.Label>
								Ringed - use it with intent to show a status, such as (in)valid
							</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Ringed</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root disabled items={items}>
							<SelectField.Label>Disabled</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Disabled</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root loading items={items}>
							<SelectField.Label>Loading</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Loading</SelectField.Message>
						</SelectField.Root>
						<SelectField.Root disabled loading items={items}>
							<SelectField.Label>Disabled & Loading</SelectField.Label>
							<SelectField.Trigger />
							<SelectField.Message>Disabled & Loading</SelectField.Message>
						</SelectField.Root>
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
