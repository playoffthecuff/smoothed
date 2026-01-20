import { TextField } from "@/components/ui/fields/text";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { AirplaneIcon } from "@/components/ui/icons/airplane";
import { SparkleIcon } from "@/components/ui/icons/sparkle";
import { Title } from "@/components/ui/typography/title";

export default function TextFieldPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Text Field</Title>
				<p>
					Labeled control, with an optional message and hint. Accepts string
					data from the user.
				</p>
			</div>
			<div>
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add text-field"
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
						<TextField label="Label" defaultValue="Only Label" id="ol" />
						<TextField
							label="Type Password"
							defaultValue="Secret"
							id="password"
							type="password"
						/>
						<TextField
							label="Label"
							defaultValue="Start Content"
							startContent={<SparkleIcon className="w-20d ps-11d" />}
							id="sc"
						/>
						<TextField
							label="Label"
							defaultValue="End Content"
							endContent={<AirplaneIcon className="w-20d h-20d p-11d" />}
							id="ec"
						/>
						<TextField
							label="Label"
							defaultValue="Hint"
							hint="Hint"
							id="hint"
						/>
						<TextField
							label="Label"
							defaultValue="Required"
							required
							id="required"
						/>
						<TextField
							label="Label"
							popoverMessage="Popover Message"
							defaultValue="Popover Message"
							id="pm"
						/>
						<TextField
							label="Label"
							message="message"
							defaultValue="With Message"
							id="wm"
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Size</Title>
					<div className="flex flex-col gap-16d">
						<TextField
							label="Label"
							message="message"
							size="s"
							placeholder="S - Small"
							hint="Small"
							id="small"
						/>
						<TextField
							label="Label"
							message="message"
							size="m"
							placeholder="M - Medium"
							hint="Medium"
							id="medium"
						/>
						<TextField
							label="Label"
							message="message"
							size="l"
							placeholder="L - Large"
							hint="Large"
							id="large"
						/>
					</div>
				</div>
				<div className="w-full">
					<Title size={4}>Width</Title>
					<div className="flex flex-col gap-16d">
						<TextField
							label="Label"
							message="message"
							width="narrow"
							placeholder="Narrow"
							hint="Narrow"
							id="narrow"
						/>
						<TextField
							label="Label"
							message="message"
							width="normal"
							placeholder="Normal"
							hint="Normal"
							id="normal"
						/>
						<TextField
							label="Label"
							message="message"
							width="wide"
							placeholder="Wide"
							hint="Wide"
							id="wide"
						/>
						<TextField
							label="Label"
							message="message"
							width="fill"
							placeholder="Fill"
							hint="Fill"
							id="fill"
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Status</Title>
					<div className="flex flex-col gap-16d">
						<TextField
							label="Label"
							message="valid message"
							defaultValue="Valid"
							hint="Valid"
							status={"valid"}
							id="valid"
						/>
						<TextField
							label="Label"
							message="warning message"
							defaultValue="Warning"
							status={"warning"}
							hint="Warning"
							id="warning"
						/>
						<TextField
							label="Label"
							message="invalid message"
							defaultValue="Invalid"
							hint="Invalid"
							status={"invalid"}
							id="invalid"
						/>
					</div>
				</div>
				<div>
					<Title size={4}>Shape</Title>
					<div className="flex flex-col gap-16d">
						<TextField
							label="Label"
							message="message"
							placeholder="Square"
							hint="Square"
							shape={"square"}
							id="square"
						/>
						<TextField
							label="Label"
							message="message"
							placeholder="Rounded"
							hint="Rounded"
							shape={"rounded"}
							id="rounded"
						/>
						<TextField
							label="Label"
							message="message"
							placeholder="Circular"
							hint="Circular"
							shape={"circular"}
							id="circular"
						/>
					</div>
				</div>
				<div>
					<Title size={4}>State</Title>
					<div className="flex flex-col gap-16d">
						<TextField
							label="Label"
							message="Disabled"
							placeholder="placeholder"
							disabled
							hint="Disabled"
							id="disabled"
						/>
						<TextField
							label="Label"
							message="Loading"
							defaultValue="Loading"
							hint="Loading"
							loading
							id="loading"
						/>
						<TextField
							label="Label"
							message="Disable & Loading"
							defaultValue="Disable & Loading"
							disabled
							hint="Disabled & Loading"
							loading
							id="dnl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
