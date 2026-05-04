import { Sandbox } from "@/components/sandbox/sandbox";
import { TextField } from "@/components/ui/data-entry/fields/text/index";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { AirplaneIcon } from "@/components/ui/icons/airplane";
import { MagnifierIcon } from "@/components/ui/icons/magnifier";
import { intentToIcon } from "@/components/ui/intent-to-icon";
import { T } from "@/components/ui/typography";
import {
	emphases,
	intentColors,
} from "@/design-systems/material/material-theme";
import { capitalize } from "@/lib/utils/str";

export default function TextFieldPage() {
	const variantCfg = {
		shape: ["square", "rounded", "circular"],
		size: ["xs", "s", "m", "l", "xl"],
		width: ["narrow", "normal", "wide", "fill"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Text Field</T.Title>
				<p>
					Labeled control, with an optional message and hint. <br /> Accepts
					string data from the user.
				</p>
			</div>
			<div>
				<T.Title size="xl" as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add text-field"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<T.Title size="xl" as="h2">
				Variants:
			</T.Title>
			<div className="flex flex-col gap-16d items-start">
				<div>
					<T.Title size="l" as="h3">
						Options
					</T.Title>
					<div className="flex flex-col gap-16d">
						<TextField.Root>
							<TextField.Control>
								<TextField.Input defaultValue="Only Input" />
							</TextField.Control>
						</TextField.Root>
						<TextField.Root>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="With Label" />
								</TextField.Control>
							</TextField.Label>
						</TextField.Root>
						<TextField.Root>
							<TextField.Label>
								Type Password
								<TextField.Control>
									<TextField.Input defaultValue="Secret" type="password" />
								</TextField.Control>
							</TextField.Label>
						</TextField.Root>
						<TextField.Root>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.InputContent>
										<MagnifierIcon className="w-20d" />
									</TextField.InputContent>
									<TextField.Input defaultValue="With Content" />
									<TextField.InputContent>
										<AirplaneIcon className="w-20d" />
									</TextField.InputContent>
								</TextField.Control>
							</TextField.Label>
						</TextField.Root>
						<TextField.Root>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="Hint" />
									<TextField.Hint>Hint</TextField.Hint>
								</TextField.Control>
							</TextField.Label>
						</TextField.Root>
						<TextField.Root required>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="Required" />
								</TextField.Control>
							</TextField.Label>
						</TextField.Root>
						<TextField.Root>
							<TextField.Label>
								Label
								<TextField.Popover open>
									<TextField.Control>
										<TextField.Input defaultValue="With Popover Message" />
									</TextField.Control>
									<TextField.PopoverMessage>Message</TextField.PopoverMessage>
								</TextField.Popover>
							</TextField.Label>
						</TextField.Root>
						<TextField.Root>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="With Message" />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Message</TextField.Message>
						</TextField.Root>
					</div>
				</div>
				<div>
					<T.Title size="l" as="h3">
						Size
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.size?.map((v) => (
							<TextField.Root size={v} key={v}>
								<TextField.Control>
									<TextField.Input placeholder={v.toUpperCase()} />
								</TextField.Control>
							</TextField.Root>
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
					<div className="flex flex-col gap-8d">
						{variantCfg.width?.map((v) => (
							<TextField.Root width={v} key={v}>
								<TextField.Label>
									Label
									<TextField.Control>
										<TextField.Input placeholder={capitalize(v)} />
									</TextField.Control>
								</TextField.Label>
								<TextField.Message>{capitalize(v)}</TextField.Message>
							</TextField.Root>
						))}
					</div>
					<li className="ms-4 -mb-2">
						<T.Title size="m" as="h4">
							Block
						</T.Title>
					</li>
					<div>
						{variantCfg.width?.map((v) => (
							<TextField.Root width={v} key={v} className="not-last:me-4">
								<TextField.Label>
									Label
									<TextField.Control>
										<TextField.Input placeholder={capitalize(v)} />
									</TextField.Control>
								</TextField.Label>
								<TextField.Message>{capitalize(v)}</TextField.Message>
							</TextField.Root>
						))}
					</div>
				</div>
				<div>
					<T.Title size="l" as="h3">
						Shape
					</T.Title>
					<div className="flex flex-col gap-16d">
						{variantCfg.shape?.map((v) => (
							<TextField.Root key={v} shape={v}>
								<TextField.Label>
									{capitalize(v)}
									<TextField.Control>
										<TextField.Input placeholder={capitalize(v)} />
									</TextField.Control>
								</TextField.Label>
								<TextField.Message>{capitalize(v)}</TextField.Message>
							</TextField.Root>
						))}
					</div>
				</div>
				<div className="w-full">
					<T.Title size="l" as="h3">
						Appearance
					</T.Title>
					<li className="ms-4 -mb-1">
						<T.Title size="m" as="h4">
							Lowered
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<TextField.Root>
							<TextField.Label>
								None
								<TextField.Control>
									<TextField.Input placeholder={"None"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>None</TextField.Message>
						</TextField.Root>
						<TextField.Root outlined>
							<TextField.Label>
								Outlined
								<TextField.Control>
									<TextField.Input placeholder={"Outlined"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Outlined</TextField.Message>
						</TextField.Root>
						<TextField.Root solid outlined={false}>
							<TextField.Label>
								Solid
								<TextField.Control>
									<TextField.Input placeholder={"Solid"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Solid</TextField.Message>
						</TextField.Root>
						<TextField.Root outlined solid>
							<TextField.Label>
								Solid & Outlined
								<TextField.Control>
									<TextField.Input placeholder={"Solid & Outlined"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Solid & Outlined</TextField.Message>
						</TextField.Root>
					</div>
					<li className="ms-4 -mb-1 mt-2">
						<T.Title size="m" as="h4">
							Flat
						</T.Title>
					</li>
					<div className="flex flex-col gap-16d">
						<TextField.Root flat>
							<TextField.Label>
								None
								<TextField.Control>
									<TextField.Input placeholder={"None"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>None</TextField.Message>
						</TextField.Root>
						<TextField.Root outlined flat>
							<TextField.Label>
								Outlined
								<TextField.Control>
									<TextField.Input placeholder={"Outlined"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Outlined</TextField.Message>
						</TextField.Root>
						<TextField.Root solid outlined={false} flat>
							<TextField.Label>
								Solid
								<TextField.Control>
									<TextField.Input placeholder={"Solid"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Solid</TextField.Message>
						</TextField.Root>
						<TextField.Root outlined solid flat>
							<TextField.Label>
								Solid & Outlined
								<TextField.Control>
									<TextField.Input placeholder={"Solid & Outlined"} />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Solid & Outlined</TextField.Message>
						</TextField.Root>
					</div>
				</div>
				<div>
					<T.Title size="l" as="h3">
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
					<div className="flex flex-col gap-16d">
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<TextField.Root
									key={`${emphasis}-1`}
									width="narrow"
									emphasis={emphasis}
									shape={"rounded"}
									solid
								>
									<TextField.Label>
										Label
										<TextField.Control>
											<TextField.Input defaultValue={"No Intent"} />
										</TextField.Control>
									</TextField.Label>
									<TextField.Message>No Intent</TextField.Message>
								</TextField.Root>
							))}
						</div>
						{intentColors.map((intent) => {
							const Icon = intentToIcon("filled", intent);
							return (
								<div key={`${intent}-1`} className="flex gap-16d">
									{emphases.map((emphasis) => (
										<TextField.Root
											key={`${intent}-${emphasis}-1`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"rounded"}
											solid
										>
											<TextField.Label>
												Label
												<TextField.Control>
													<TextField.Input defaultValue={capitalize(intent)} />
												</TextField.Control>
											</TextField.Label>
											<TextField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</TextField.Message>
										</TextField.Root>
									))}
								</div>
							);
						})}

						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<TextField.Root
									key={`${emphasis}-1`}
									width="narrow"
									emphasis={emphasis}
									shape={"circular"}
									solid
									outlined
								>
									<TextField.Label className="first-letter:ms-[.525em]">
										Label
										<TextField.Control>
											<TextField.Input defaultValue={"No Intent"} />
										</TextField.Control>
									</TextField.Label>
									<TextField.Message>No Intent</TextField.Message>
								</TextField.Root>
							))}
						</div>
						{intentColors.map((intent) => (
							<div key={`${intent}-2`} className="flex gap-16d">
								{emphases.map((emphasis) => {
									const Icon = intentToIcon("filled", intent);
									return (
										<TextField.Root
											key={`${intent}-${emphasis}-2`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"circular"}
											outlined
											solid
										>
											<TextField.Label>
												Label
												<TextField.Control>
													<TextField.Input defaultValue={capitalize(intent)} />
												</TextField.Control>
											</TextField.Label>
											<TextField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</TextField.Message>
										</TextField.Root>
									);
								})}
							</div>
						))}
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<TextField.Root
									key={`${emphasis}-1`}
									width="narrow"
									emphasis={emphasis}
									shape={"square"}
									outlined
								>
									<TextField.Label>
										Label
										<TextField.Control>
											<TextField.Input defaultValue={"No Intent"} />
										</TextField.Control>
									</TextField.Label>
									<TextField.Message>No Intent</TextField.Message>
								</TextField.Root>
							))}
						</div>
						{intentColors.map((intent) => (
							<div key={`${intent}-3`} className="flex gap-16d">
								{emphases.map((emphasis) => {
									const Icon = intentToIcon("filled", intent);
									return (
										<TextField.Root
											key={`${intent}-${emphasis}-3`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
											shape={"square"}
											outlined
										>
											<TextField.Label>
												Label
												<TextField.Control>
													<TextField.Input defaultValue={capitalize(intent)} />
												</TextField.Control>
											</TextField.Label>
											<TextField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</TextField.Message>
										</TextField.Root>
									);
								})}
							</div>
						))}
						<div className="flex gap-16d">
							{emphases.map((emphasis) => (
								<TextField.Root
									key={`${emphasis}-1`}
									width="narrow"
									emphasis={emphasis}
									shape={"rounded"}
								>
									<TextField.Label>
										Label
										<TextField.Control>
											<TextField.Input defaultValue={"No Intent"} />
										</TextField.Control>
									</TextField.Label>
									<TextField.Message>No Intent</TextField.Message>
								</TextField.Root>
							))}
						</div>
						{intentColors.map((intent) => (
							<div key={`${intent}-4`} className="flex gap-16d">
								{emphases.map((emphasis) => {
									const Icon = intentToIcon("filled", intent);
									return (
										<TextField.Root
											key={`${intent}-${emphasis}-4`}
											width="narrow"
											intent={intent}
											emphasis={emphasis}
										>
											<TextField.Label>
												Label
												<TextField.Control>
													<TextField.Input defaultValue={capitalize(intent)} />
												</TextField.Control>
											</TextField.Label>
											<TextField.Message>
												{Icon && <Icon size={1} />}
												{capitalize(intent)}
											</TextField.Message>
										</TextField.Root>
									);
								})}
							</div>
						))}
					</div>
				</div>

				<div>
					<T.Title size="l" as="h3">
						State
					</T.Title>
					<div className="flex flex-col gap-16d">
						<TextField.Root ringed intent={"danger"}>
							<TextField.Label>
								<span>
									Ringed - use it with intent to show a status, such as
									(in)valid
								</span>
								<TextField.Control>
									<TextField.Input defaultValue="Ringed" />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Ringed</TextField.Message>
						</TextField.Root>

						<TextField.Root disabled>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="Disabled" />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Disabled</TextField.Message>
						</TextField.Root>

						<TextField.Root loading>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="Loading" />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Disabled</TextField.Message>
						</TextField.Root>

						<TextField.Root disabled loading>
							<TextField.Label>
								Label
								<TextField.Control>
									<TextField.Input defaultValue="Disable & Loading" />
								</TextField.Control>
							</TextField.Label>
							<TextField.Message>Disabled</TextField.Message>
						</TextField.Root>
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
