import { HighlightedCode } from "@/components/ui/highlighted-code";
import { TriangleDownSharpIcon } from "@/components/ui/icons/triangle-down-sharp";
import { TriangleUpSharpIcon } from "@/components/ui/icons/triangle-up-sharp";
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
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add number-input"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={5}>Variants:</Title>
			<div className="flex flex-col">
				<Title size={4}>Size</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} size={"xs"} />
						<span>Extra Small - XS</span>
					</div>
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
					<div className="flex gap-12d items-center">
						<NumberInput defaultValue={100} size={"xl"} />
						<span>Extra Large - XL</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>Width</Title>
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
					<div>
						<NumberInput placeholder="Fill" width={"fill"} />
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>Appearance</Title>
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
				<Title size={4}>Controls Content</Title>
				<div className="flex items-center gap-12d">
					<div className="flex flex-col gap-12d">
						<div className="flex gap-12d items-end">
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								size={"xs"}
								width="narrow"
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								size={"s"}
								width="narrow"
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								size={"m"}
								width="narrow"
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								size={"l"}
								width="narrow"
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								size={"xl"}
								width="narrow"
							/>
						</div>
						<div className="flex gap-12d items-start">
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								appearance={"outline"}
								width="narrow"
								size={"xs"}
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								appearance={"outline"}
								width="narrow"
								size={"s"}
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								appearance={"outline"}
								width="narrow"
								size={"m"}
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								appearance={"outline"}
								width="narrow"
								size={"l"}
							/>
							<NumberInput
								defaultValue={100}
								incrementContent={TriangleUpSharpIcon}
								decrementContent={TriangleDownSharpIcon}
								appearance={"outline"}
								width="narrow"
								size={"xl"}
							/>
						</div>
					</div>
					Icons
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>Intent</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} intent="neutral" />
						<NumberInput
							defaultValue={100}
							intent="neutral"
							appearance={"outline"}
						/>
						Neutral
					</div>
					<div className="flex items-center gap-12d">
						<NumberInput defaultValue={100} intent="secondary" />
						<NumberInput
							defaultValue={100}
							intent="secondary"
							appearance={"outline"}
						/>
						Secondary
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>Controls Position</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-12d items-center">
						<NumberInput
							defaultValue={100}
							controlsPosition={"start"}
							appearance={"outline"}
						/>
						<NumberInput
							defaultValue={100}
							controlsPosition={"start"}
							appearance={"solid"}
						/>
						Start
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput
							defaultValue={100}
							controlsPosition={"between"}
							appearance={"outline"}
						/>
						<NumberInput
							defaultValue={100}
							controlsPosition={"between"}
							appearance={"solid"}
						/>
						Between
					</div>
					<div className="flex gap-12d items-center">
						<NumberInput
							defaultValue={100}
							controlsPosition={"end"}
							appearance={"outline"}
						/>
						<NumberInput
							defaultValue={100}
							controlsPosition={"end"}
							appearance={"solid"}
						/>
						End
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>Shape</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex items-center gap-12d">
						<div className="flex flex-col gap-12d">
							<div className="flex gap-12d items-center">
								<NumberInput
									defaultValue={100}
									shape={"square"}
									appearance={"solid"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"square"}
									appearance={"solid"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"square"}
									appearance={"solid"}
									controlsPosition={"end"}
								/>
							</div>
							<div className="flex gap-12d items-center">
								<NumberInput
									defaultValue={100}
									shape={"square"}
									appearance={"outline"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"square"}
									appearance={"outline"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"square"}
									appearance={"outline"}
									controlsPosition={"end"}
								/>
							</div>
						</div>
						Square
					</div>
					<div className="flex items-center gap-12d">
						<div className="flex flex-col gap-12d">
							<div className="flex gap-12d items-center">
								<NumberInput
									defaultValue={100}
									shape={"rounded"}
									appearance={"solid"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"rounded"}
									appearance={"solid"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"rounded"}
									appearance={"solid"}
									controlsPosition={"end"}
								/>
							</div>
							<div className="flex gap-12d items-center">
								<NumberInput
									defaultValue={100}
									shape={"rounded"}
									appearance={"outline"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"rounded"}
									appearance={"outline"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"rounded"}
									appearance={"outline"}
									controlsPosition={"end"}
								/>
							</div>
						</div>
						Rounded
					</div>
					<div className="flex gap-12d items-center">
						<div className="flex flex-col gap-12d">
							<div className="flex gap-12d items-center">
								<NumberInput
									defaultValue={100}
									shape={"circular"}
									appearance={"solid"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"circular"}
									controlsPosition={"start"}
									appearance={"solid"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"circular"}
									controlsPosition={"end"}
									appearance={"solid"}
								/>
							</div>
							<div className="flex gap-12d items-center">
								<NumberInput
									defaultValue={100}
									shape={"circular"}
									appearance={"outline"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"circular"}
									controlsPosition={"start"}
									appearance={"outline"}
								/>
								<NumberInput
									defaultValue={100}
									shape={"circular"}
									controlsPosition={"end"}
									appearance={"outline"}
								/>
							</div>
						</div>
						Circular
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>Status</Title>
				<div className="flex flex-col gap-16d">
					<div className="flex items-center gap-12d">
						<div className="flex flex-col gap-12d">
							<div className="flex items-center gap-12d">
								<NumberInput
									defaultValue={100}
									status={"valid"}
									appearance={"solid"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									status={"valid"}
									appearance={"solid"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									status={"valid"}
									appearance={"solid"}
									controlsPosition={"end"}
								/>
							</div>
							<div className="flex items-center gap-12d">
								<NumberInput
									defaultValue={100}
									status={"valid"}
									appearance={"outline"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									status={"valid"}
									appearance={"outline"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									status={"valid"}
									appearance={"outline"}
									controlsPosition={"end"}
								/>
							</div>
						</div>
						Valid
					</div>
					<div className="flex items-center gap-12d">
						<div className="flex flex-col gap-12d">
							<div className="flex items-center gap-12d">
								<NumberInput
									defaultValue={100}
									status={"warning"}
									appearance={"solid"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									status={"warning"}
									appearance={"solid"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									status={"warning"}
									appearance={"solid"}
									controlsPosition={"end"}
								/>
							</div>
							<div className="flex items-center gap-12d">
								<NumberInput
									defaultValue={100}
									status={"warning"}
									appearance={"outline"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									status={"warning"}
									appearance={"outline"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									status={"warning"}
									appearance={"outline"}
									controlsPosition={"end"}
								/>
							</div>
						</div>
						Warning
					</div>
					<div className="flex items-center gap-12d">
						<div className="flex flex-col gap-12d">
							<div className="flex items-center gap-12d">
								<NumberInput
									defaultValue={100}
									status={"invalid"}
									appearance={"solid"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									status={"invalid"}
									appearance={"solid"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									status={"invalid"}
									appearance={"solid"}
									controlsPosition={"end"}
								/>
							</div>
							<div className="flex items-center gap-12d">
								<NumberInput
									defaultValue={100}
									status={"invalid"}
									appearance={"outline"}
									controlsPosition={"between"}
								/>
								<NumberInput
									defaultValue={100}
									status={"invalid"}
									appearance={"outline"}
									controlsPosition={"start"}
								/>
								<NumberInput
									defaultValue={100}
									status={"invalid"}
									appearance={"outline"}
									controlsPosition={"end"}
								/>
							</div>
						</div>
						Invalid
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<Title size={4}>State</Title>
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
