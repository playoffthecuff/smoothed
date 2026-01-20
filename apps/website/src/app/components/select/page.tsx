import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Select } from "@/components/ui/select/select";
import { Title } from "@/components/ui/typography/title";

const options = [
	{ label: "Choose", value: null },
	{ label: "One", value: "One" },
	{ label: "Two", value: "Two" },
	{ label: "Three", value: "Three" },
	{ label: "Four", value: "Four" },
	{ label: "Five", value: "Five" },
];

export default function SelectPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Select</Title>
				<p>Control that provides a menu with options to choose from.</p>
			</div>
			<div>
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add select"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={5}>Variants:</Title>
			<div className="flex flex-col gap-16d items-start">
				<div className="flex flex-col gap-12d">
					<Title size={4}>Size</Title>
					<div>
						Extra Small - XS
						<Select options={options} size={"xs"} />
					</div>
					<div>
						Small - S
						<Select options={options} size={"s"} />
					</div>
					<div>
						Medium - M
						<Select options={options} size={"m"} />
					</div>
					<div>
						Large - L
						<Select options={options} size={"l"} />
					</div>
					<div>
						Extra Large - XL
						<Select options={options} size={"xl"} />
					</div>
				</div>
				<div className="flex flex-col gap-12d w-full">
					<Title size={4}>Width</Title>
					<div>
						Narrow
						<Select options={options} width={"narrow"} />
					</div>
					<div>
						Normal
						<Select options={options} width={"normal"} />
					</div>
					<div>
						Wide
						<Select options={options} width={"wide"} />
					</div>
					<div>
						Fill
						<Select options={options} width={"fill"} />
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>Intent</Title>
					<div>
						Neutral
						<Select options={options} intent={"neutral"} />
					</div>
					<div>
						Secondary
						<Select options={options} intent={"secondary"} />
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>Shape</Title>
					<div>
						Square
						<Select options={options} shape={"square"} />
					</div>
					<div>
						Rounded
						<Select options={options} shape={"rounded"} />
					</div>
					<div>
						Circular
						<Select options={options} shape={"circular"} />
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>Status</Title>
					<div>
						Valid
						<Select options={options} status={"valid"} />
					</div>
					<div>
						Warning
						<Select options={options} status={"warning"} />
					</div>
					<div>
						Invalid
						<Select options={options} status={"invalid"} />
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>State</Title>
					<div>
						Disabled
						<Select options={options} disabled />
					</div>
					<div>
						Loading
						<Select options={options} loading />
					</div>
					<div>
						Disabled & Loading
						<Select options={options} disabled loading />
					</div>
				</div>
			</div>
		</div>
	);
}
