import { Sandbox } from "@/components/sandbox/sandbox";
import { CheckboxField } from "@/components/ui/data-entry/fields/checkbox";
import { NumberField } from "@/components/ui/data-entry/fields/number";
import { SelectField } from "@/components/ui/data-entry/fields/select";
import { SliderField } from "@/components/ui/data-entry/fields/slider";
import { TextField } from "@/components/ui/data-entry/fields/text";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Button } from "@/components/ui/triggers/button";
import { T } from "@/components/ui/typography";

const items = [
	{ label: "Choose", value: null },
	{ label: "One", value: 1 },
	{ label: "Two", value: 2 },
	{ label: "Three", value: 3 },
	{ label: "Four", value: 4 },
	{ label: "Five", value: 5 },
];

export default function TitlePage() {
	return (
		<Sandbox>
			<div>
				<T.Title>Form</T.Title>
				<p>Form Description</p>
			</div>
			<div>
				<T.Title size="xl" as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add form"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<form className="flex flex-col gap-16d p-16d sfc-rounded-8 sfc-solid rel-elevation-4 zero-elevation-6 sfc-shadow w-fit">
				<TextField.Root solid id="text" emphasis={"high"}>
					<TextField.Label emphasis="low">Label</TextField.Label>
					<TextField.Control intent="accent" emphasis="low">
						<TextField.Input placeholder="Placeholder" />
						<TextField.Hint intent="danger" emphasis="low">
							Hint
						</TextField.Hint>
					</TextField.Control>
					<TextField.Message intent="warning" emphasis="low">
						Message
					</TextField.Message>
				</TextField.Root>
				<NumberField.Root
					id="number"
					solid
					controlsPosition={"end"}
					emphasis="high"
				>
					<NumberField.Label>Label</NumberField.Label>
					<NumberField.Input defaultValue={0} />
					<NumberField.Message>Message</NumberField.Message>
				</NumberField.Root>
				<SelectField.Root id="select" solid items={items} emphasis="high">
					<SelectField.Label>Label</SelectField.Label>
					<SelectField.Trigger></SelectField.Trigger>
					<SelectField.Message>Message</SelectField.Message>
				</SelectField.Root>
				<SliderField.Root id="slider" defaultValue={[50]} solid emphasis="high">
					<SliderField.Label>Label</SliderField.Label>
					<SliderField.Slider />
					<SliderField.Message>Message</SliderField.Message>
				</SliderField.Root>
				<CheckboxField.Root id="check" solid emphasis="high">
					<CheckboxField.Label>
						<CheckboxField.Checkbox />
						Label
					</CheckboxField.Label>
					<CheckboxField.Message>Message</CheckboxField.Message>
				</CheckboxField.Root>
				<Button solid width={"fill"} emphasis={"high"} type="button">
					Submit
				</Button>
			</form>
			<form className="flex flex-col gap-16d p-16d sfc-rounded-8 sfc-solid rel-elevation-4 zero-elevation-6 sfc-shadow w-fit">
				<TextField.Root outlined id="text2" emphasis={"high"}>
					<TextField.Label emphasis="low">Label</TextField.Label>
					<TextField.Control intent="accent" emphasis="low">
						<TextField.Input placeholder="Placeholder" />
						<TextField.Hint intent="danger" emphasis="low">
							Hint
						</TextField.Hint>
					</TextField.Control>
					<TextField.Message intent="warning" emphasis="low">
						Message
					</TextField.Message>
				</TextField.Root>
				<NumberField.Root
					id="number2"
					outlined
					controlsPosition={"end"}
					emphasis="high"
				>
					<NumberField.Label>Label</NumberField.Label>
					<NumberField.Input defaultValue={0} />
					<NumberField.Message>Message</NumberField.Message>
				</NumberField.Root>
				<SelectField.Root id="select2" outlined items={items} emphasis="high">
					<SelectField.Label>Label</SelectField.Label>
					<SelectField.Trigger></SelectField.Trigger>
					<SelectField.Message>Message</SelectField.Message>
				</SelectField.Root>
				<SliderField.Root
					id="slider"
					defaultValue={[50]}
					outlined
					emphasis="high"
				>
					<SliderField.Label>Label</SliderField.Label>
					<SliderField.Slider />
					<SliderField.Message>Message</SliderField.Message>
				</SliderField.Root>
				<CheckboxField.Root id="check2" outlined emphasis="high">
					<CheckboxField.Label>
						<CheckboxField.Checkbox />
						Label
					</CheckboxField.Label>
					<CheckboxField.Message>Message</CheckboxField.Message>
				</CheckboxField.Root>
				<Button outlined width={"fill"} emphasis={"high"} type="button">
					Submit
				</Button>
			</form>
		</Sandbox>
	);
}
