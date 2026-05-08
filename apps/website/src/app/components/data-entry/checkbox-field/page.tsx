import React from "react";
import { Sandbox } from "@/components/sandbox/sandbox";
import { CheckboxField } from "@/components/ui/data-entry/fields/checkbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { intentToIcon } from "@/components/ui/intent-to-icon";
import { T } from "@/components/ui/typography";
import { capitalize } from "@/lib/utils/str";

export default function CheckboxFieldPage() {
	const variantCfg = {
		shape: ["square", "rounded", "circular"],
		size: ["xs", "s", "m", "l", "xl"],
		width: ["narrow", "normal", "wide", "fill"],
		intent: ["neutral", "accent", "success", "warning", "danger", "info"],
		emphasis: ["low", "medium", "high"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Checkbox Field</T.Title>
				<p>
					Labeled control, with an optional message and hint. Accepts boolean
					data from the user.
				</p>
			</div>
			<div>
				<T.Title size={"xl"} as={"h2"}>
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add checkbox-field"
					language="yaml"
					lineNumbers={false}
				/>
			</div>

			<hr className="mt-16d mb-12d" />

			<T.Title size={"xl"} as={"h2"}>
				Variants:
			</T.Title>

			<div className="flex flex-col gap-16d items-start w-60">
				<T.Title size={"l"} as={"h3"}>
					Options
				</T.Title>
				<div className="flex flex-col gap-16d">
					<CheckboxField.Root>
						<CheckboxField.Checkbox />
					</CheckboxField.Root>
					<CheckboxField.Root>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Only Label
						</CheckboxField.Label>
					</CheckboxField.Root>
					<CheckboxField.Root>
						<CheckboxField.Label>
							<CheckboxField.Checkbox indeterminate />
							Indeterminate
						</CheckboxField.Label>
					</CheckboxField.Root>
					<CheckboxField.Root required>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Required
						</CheckboxField.Label>
					</CheckboxField.Root>
					<CheckboxField.Root>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							With Message
						</CheckboxField.Label>
						<CheckboxField.Message>Message</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root className="mt-18d">
						<CheckboxField.Label>
							<CheckboxField.Popover open>
								<CheckboxField.Checkbox defaultChecked />
								Popover Message
								<CheckboxField.PopoverMessage>
									Message
								</CheckboxField.PopoverMessage>
							</CheckboxField.Popover>
						</CheckboxField.Label>
					</CheckboxField.Root>
				</div>

				<div>
					<T.Title size={"l"} as={"h3"}>
						Size
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.size?.map((v) => (
							<CheckboxField.Root size={v} key={v}>
								<CheckboxField.Label>
									<CheckboxField.Checkbox defaultChecked />
									{capitalize(v)}
								</CheckboxField.Label>
							</CheckboxField.Root>
						))}
					</div>
				</div>
			</div>

			<div>
				<T.Title size={"l"} as={"h3"}>
					Shape
				</T.Title>
				<div className="flex flex-col gap-16d">
					{variantCfg.shape?.map((v) => (
						<CheckboxField.Root shape={v} key={v}>
							<CheckboxField.Label>
								<CheckboxField.Checkbox />
								{capitalize(v)}
							</CheckboxField.Label>
						</CheckboxField.Root>
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
					<CheckboxField.Root>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							None
						</CheckboxField.Label>
						<CheckboxField.Message>None</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root outlined>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Outlined
						</CheckboxField.Label>
						<CheckboxField.Message>Outlined</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root solid>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Solid
						</CheckboxField.Label>
						<CheckboxField.Message>Solid</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root solid outlined>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Solid & Outlined
						</CheckboxField.Label>
						<CheckboxField.Message>Solid & Outlined</CheckboxField.Message>
					</CheckboxField.Root>
				</div>
				<li className="ms-4 -mb-1 mt-2">
					<T.Title size={"m"} as={"h4"}>
						Flat
					</T.Title>
				</li>
				<div className="flex flex-col gap-16d">
					<CheckboxField.Root flat>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							None
						</CheckboxField.Label>
						<CheckboxField.Message>None</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root outlined flat>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Outlined
						</CheckboxField.Label>
						<CheckboxField.Message>Outlined</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root solid flat>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Solid
						</CheckboxField.Label>
						<CheckboxField.Message>Solid</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root solid outlined flat>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Solid & Outlined
						</CheckboxField.Label>
						<CheckboxField.Message>Solid & Outlined</CheckboxField.Message>
					</CheckboxField.Root>
				</div>
			</div>

			<div className="w-fit">
				<T.Title size={"l"} as={"h3"}>
					Emphasis / Intent
				</T.Title>
				<div
					className="aspect-16 w-full mb-2 self-end"
					style={{
						background: `linear-gradient(
												to right,
												oklch(0.3 0 29 / 0),
												oklch(0.3 0.3 29 / 0.8)
											)`,
						clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 90%)",
					}}
				/>
				<div className="grid grid-cols-[repeat(3,max-content)] gap-16d">
					{variantCfg.emphasis?.map((emphasis) => (
						<CheckboxField.Root solid key={`${emphasis}1`}>
							<CheckboxField.Label>
								<CheckboxField.Checkbox defaultChecked />
								Label
							</CheckboxField.Label>
							<CheckboxField.Message>No Intent</CheckboxField.Message>
						</CheckboxField.Root>
					))}

					{variantCfg.intent?.map((intent) => {
						const Icon = intentToIcon("filled", intent);
						return (
							<React.Fragment key={`${intent}1`}>
								{variantCfg.emphasis?.map((emphasis) => (
									<CheckboxField.Root
										solid
										key={`${intent}${emphasis}1`}
										intent={intent}
									>
										<CheckboxField.Label>
											<CheckboxField.Checkbox defaultChecked />
											Label
										</CheckboxField.Label>
										<CheckboxField.Message>
											{capitalize(intent)}
											{Icon && <Icon size={1} />}
										</CheckboxField.Message>
									</CheckboxField.Root>
								))}
							</React.Fragment>
						);
					})}

					{variantCfg.emphasis?.map((emphasis) => (
						<CheckboxField.Root
							solid
							outlined
							key={`${emphasis}2`}
							shape={"circular"}
						>
							<CheckboxField.Label>
								<CheckboxField.Checkbox defaultChecked />
								Label
							</CheckboxField.Label>
							<CheckboxField.Message>No Intent</CheckboxField.Message>
						</CheckboxField.Root>
					))}
					{variantCfg.intent?.map((intent) => {
						const Icon = intentToIcon("filled", intent);
						return (
							<React.Fragment key={`${intent}2`}>
								{variantCfg.emphasis?.map((emphasis) => (
									<CheckboxField.Root
										solid
										outlined
										key={`${intent}${emphasis}2`}
										shape={"circular"}
										intent={intent}
									>
										<CheckboxField.Label>
											<CheckboxField.Checkbox defaultChecked />
											Label
										</CheckboxField.Label>
										<CheckboxField.Message>
											{capitalize(intent)}
											{Icon && <Icon size={1} />}
										</CheckboxField.Message>
									</CheckboxField.Root>
								))}
							</React.Fragment>
						);
					})}

					{variantCfg.emphasis?.map((emphasis) => (
						<CheckboxField.Root outlined key={`${emphasis}3`} shape={"square"}>
							<CheckboxField.Label>
								<CheckboxField.Checkbox defaultChecked />
								Label
							</CheckboxField.Label>
							<CheckboxField.Message>No Intent</CheckboxField.Message>
						</CheckboxField.Root>
					))}

					{variantCfg.intent?.map((intent) => {
						const Icon = intentToIcon("filled", intent);
						return (
							<React.Fragment key={`${intent}3`}>
								{variantCfg.emphasis?.map((emphasis) => (
									<CheckboxField.Root
										outlined
										key={`${intent}${emphasis}3`}
										shape={"square"}
										intent={intent}
									>
										<CheckboxField.Label>
											<CheckboxField.Checkbox defaultChecked />
											Label
										</CheckboxField.Label>
										<CheckboxField.Message>
											{capitalize(intent)}
											{Icon && <Icon size={1} />}
										</CheckboxField.Message>
									</CheckboxField.Root>
								))}
							</React.Fragment>
						);
					})}

					{variantCfg.emphasis?.map((emphasis) => (
						<CheckboxField.Root key={`${emphasis}4`}>
							<CheckboxField.Label>
								<CheckboxField.Checkbox defaultChecked />
								Label
							</CheckboxField.Label>
							<CheckboxField.Message>No Intent</CheckboxField.Message>
						</CheckboxField.Root>
					))}
					{variantCfg.intent?.map((intent) => {
						const Icon = intentToIcon("filled", intent);
						return (
							<>
								{variantCfg.emphasis?.map((emphasis) => (
									<CheckboxField.Root
										key={`${intent}${emphasis}4`}
										intent={intent}
									>
										<CheckboxField.Label>
											<CheckboxField.Checkbox defaultChecked />
											Label
										</CheckboxField.Label>
										<CheckboxField.Message>
											{capitalize(intent)}
											{Icon && <Icon size={1} />}
										</CheckboxField.Message>
									</CheckboxField.Root>
								))}
							</>
						);
					})}
				</div>
			</div>

			<div>
				<T.Title size={"l"} as={"h3"}>
					State
				</T.Title>
				<div className="flex flex-col gap-16d">
					<CheckboxField.Root disabled>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Disabled
						</CheckboxField.Label>
						<CheckboxField.Message>Disabled</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root loading>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Loading
						</CheckboxField.Label>
						<CheckboxField.Message>Loading</CheckboxField.Message>
					</CheckboxField.Root>
					<CheckboxField.Root loading disabled>
						<CheckboxField.Label>
							<CheckboxField.Checkbox defaultChecked />
							Disabled & Loading
						</CheckboxField.Label>
						<CheckboxField.Message>Disabled & Loading</CheckboxField.Message>
					</CheckboxField.Root>
				</div>
			</div>
		</Sandbox>
	);
}
