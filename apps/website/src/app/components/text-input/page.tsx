import { HighlightedCode } from "@/components/ui/highlighted-code";
import { AirplaneIcon } from "@/components/ui/icons/airplane";
import { SparkleIcon } from "@/components/ui/icons/sparkle";
import { TextInput } from "@/components/ui/input/text";
import { Title } from "@/components/ui/typography/title";

export default function InputPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Text Input</Title>
				<p>Control that accepts string data from the user.</p>
			</div>
			<div>
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add text-input"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={5}>Variants:</Title>
			<div>
				<Title size={4}>Size</Title>
				<div className="flex flex-col gap-16d">
					<TextInput placeholder="Extra Small - XS" size={"xs"} id="xs" />
					<TextInput placeholder="Small - S" size={"s"} id="s" />
					<TextInput placeholder="Medium - M" size={"m"} id="m" />
					<TextInput placeholder="Large - L" size={"l"} id="l" />
					<TextInput placeholder="Extra Large - XL" size={"xl"} id="xl" />
				</div>
			</div>
			<div>
				<Title size={4}>Width</Title>
				<div className="flex flex-col gap-16d">
					<TextInput placeholder="Narrow" width="narrow" id="narrow" />
					<TextInput placeholder="Normal" width="normal" id="normal" />
					<TextInput placeholder="Wide" width="wide" id="wide" />
					<TextInput placeholder="Fill" width="fill" id="fill" />
				</div>
			</div>
			<div>
				<Title size={4}>Intent</Title>
				<div className="flex flex-col gap-16d">
					<TextInput placeholder="Neutral" intent={"neutral"} id="neutral" />
					<TextInput
						placeholder="Secondary"
						intent={"secondary"}
						id="secondary"
					/>
				</div>
			</div>
			<div>
				<Title size={4}>With Content</Title>
				<div className="flex flex-col gap-16d">
					<TextInput
						placeholder="Neutral"
						startContent={<SparkleIcon className="w-20d ps-11d" />}
						id="sc"
					/>
					<TextInput
						placeholder="Secondary"
						endContent={<AirplaneIcon className="w-20d h-20d p-11d" />}
						id="ec"
					/>
				</div>
			</div>
			<div>
				<Title size={4}>Shape</Title>
				<div className="flex flex-col gap-16d">
					<TextInput placeholder="Square" shape={"square"} id="square" />
					<TextInput placeholder="Rounded" shape={"rounded"} id="rounded" />
					<TextInput placeholder="Circular" shape={"circular"} id="circular" />
				</div>
			</div>
			<div>
				<Title size={4}>Password Type</Title>
				<div className="flex flex-col gap-16d">
					<TextInput defaultValue="secret" type="password" id="password" />
				</div>
			</div>
			<div>
				<Title size={4}>Status</Title>
				<div className="flex flex-col gap-16d">
					<TextInput
						defaultValue="Valid"
						type="text"
						status={"valid"}
						id="valid"
					/>
					<TextInput
						defaultValue="Warning"
						type="text"
						status={"warning"}
						id="warning"
					/>
					<TextInput
						defaultValue="Error"
						type="text"
						status={"invalid"}
						minLength={99999999}
						required
						data-invalid
						id="invalid"
					/>
				</div>
			</div>
			<div>
				<Title size={4}>State</Title>
				<div className="flex flex-col gap-16d">
					<TextInput placeholder="Disabled" disabled id="disabled" />
					<label htmlFor="">
						Loading
						<TextInput placeholder="Loading" loading id="loading" />
					</label>
					<label htmlFor="">
						Disabled & Loading
						<TextInput placeholder="Loading" loading disabled id="dnl" />
					</label>
				</div>
			</div>
		</div>
	);
}
