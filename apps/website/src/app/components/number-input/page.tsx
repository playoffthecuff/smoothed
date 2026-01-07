import { HighlightedCode } from "@/components/ui/highlighted-code";
import { NumberInput } from "@/components/ui/input/number";
import { Title } from "@/components/ui/typography/title";

export default function NumberInputPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Number Input</Title>
				<p>Control that accepts numeric data from the user.</p>
			</div>
			<div>
				<Title size={2}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/s3-line@latest add number-input"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={2}>Variants:</Title>
			<div className="flex flex-col">
				<Title size={3}>Size</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} size={"s"} />
						<span>Small - S</span>
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} size={"m"} />
						<span>Medium - M</span>
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} size={"l"} />
						<span>Large - L</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={3}>Appearance</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} appearance={"solid"} />
						<span>Solid</span>
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} appearance={"outline"} />
						<span>Outline</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={3}>Shape</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} shape={"square"} />
						<span>Square</span>
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} shape={"rounded"} />
						<span>Rounded</span>
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} shape={"circular"} />
						<span>Circular</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={3}>Width</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} width={"narrow"} />
						Narrow
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} width={"normal"} />
						Normal
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} width={"wide"} />
						Wide
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={3}>Color</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} color="neutral" />
						Neutral
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} color="primary" />
						Primary
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} color="secondary" />
						Secondary
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={3}>Status</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} status={"valid"} />
						Valid
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} status={"warning"} />
						Warning
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} status={"invalid"} />
						Invalid
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={3}>State</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} disabled />
						Disabled
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} loading />
						Loading
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} disabled loading />
						Disabled & Loading
					</div>
				</div>
			</div>
		</div>
	);
}
