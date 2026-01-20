import { SelectField } from "@/components/ui/fields/select";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Title } from "@/components/ui/typography/title";

const options = [
	{ label: "Choose", value: null },
	{ label: "One", value: 1 },
	{ label: "Two", value: 2 },
	{ label: "Three", value: 3 },
	{ label: "Four", value: 4 },
	{ label: "Five", value: 5 },
];

export default function SelectFieldPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Select Field</Title>
				<p>
					Labeled control that provides a menu with options to choose from with
					an optional message and hint.
				</p>
			</div>
			<div>
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add select-field"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={5}>Variants:</Title>
			<div className="flex flex-col gap-16d items-start">
				<div>
					<Title size={4}>Options</Title>
					<div className="flex flex-col gap-16d">
						<SelectField label="Only Label" options={options} />
						<SelectField label="Hint" options={options} hint="Hint" />
						<SelectField label="Required" required options={options} />
						<SelectField
							label="With message"
							message="message"
							options={options}
						/>
						<SelectField
							label="Popover Message"
							popoverMessage="Popover message"
							options={options}
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Size</Title>
					<div className="flex flex-col gap-16d">
						<SelectField
							label="Extra Small"
							message="XS - Extra Small"
							size="xs"
							options={options}
							hint="Extra Small"
						/>
						<SelectField
							label="Small"
							message="S - Small"
							size="s"
							options={options}
							hint="Small"
						/>
						<SelectField
							label="Medium"
							message="M - Medium"
							size="m"
							options={options}
							hint="Medium"
						/>
						<SelectField
							label="Large"
							message="L - Large"
							size="l"
							options={options}
							hint="Large"
						/>
						<SelectField
							label="Extra Large"
							message="XL - Extra Large"
							size="xl"
							options={options}
							hint="Large"
						/>
					</div>
				</div>
				<div className="w-full">
					<Title size={4}>Width</Title>
					<div className="flex flex-col gap-16d">
						<SelectField
							label="narrow"
							message="narrow"
							width={"narrow"}
							options={options}
							hint="narrow"
						/>
						<SelectField
							label="normal"
							message="normal"
							width={"normal"}
							size="m"
							options={options}
							hint="normal"
						/>
						<SelectField
							label="Wide"
							message="wide"
							width={"wide"}
							size="l"
							options={options}
							hint="Wide"
						/>
						<SelectField
							label="Fill"
							message="fill"
							width={"fill"}
							size="l"
							options={options}
							hint="Fill"
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Intent</Title>
					<div className="flex flex-col gap-16d">
						<SelectField
							label="Neutral"
							message="neutral"
							intent={"neutral"}
							options={options}
							hint="neutral"
						/>
						<SelectField
							label="Secondary"
							message="secondary"
							intent={"secondary"}
							options={options}
							hint="secondary"
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Status</Title>
					<div className="flex flex-col gap-16d">
						<SelectField
							label="Valid"
							message="valid"
							options={options}
							hint="Valid"
							status={"valid"}
						/>
						<SelectField
							label="Warning"
							message="warning"
							options={options}
							hint="Warning"
							status={"warning"}
						/>
						<SelectField
							label="Invalid"
							message="invalid"
							options={options}
							hint="Invalid"
							status={"invalid"}
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Shape</Title>
					<div className="flex flex-col gap-16d">
						<SelectField
							label="Square"
							message="square"
							options={options}
							hint="Square"
							shape={"square"}
						/>
						<SelectField
							label="Rounded"
							message="rounded"
							options={options}
							hint="Rounded"
							shape={"rounded"}
						/>
						<SelectField
							label="Circular"
							message="circular"
							options={options}
							hint="Circular"
							shape={"circular"}
						/>
					</div>
				</div>
				<div>
					<Title size={4}>State</Title>
					<div className="flex flex-col gap-16d">
						<SelectField
							label="Label"
							message="Disabled"
							options={options}
							disabled
							hint="Disabled"
						/>
						<SelectField
							label="Label"
							message="Loading"
							options={options}
							loading
							hint="Loading"
						/>
						<SelectField
							label="Label"
							message="Disable & Loading"
							options={options}
							disabled
							loading
							hint="Disabled & Loading"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
