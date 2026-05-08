import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { SparkleIcon } from "@/components/ui/icons/sparkle";
import { Button, type ButtonProps } from "@/components/ui/triggers/button";
import { T } from "@/components/ui/typography";
import {
	emphases,
	intentColors,
} from "@/design-systems/material/material-theme";
import type { UnionsRecordIntoTuplesRecord } from "@/lib/types/helpers";
import { capitalize } from "@/lib/utils/str";

export default function ButtonPage() {
	const variantsCfg: UnionsRecordIntoTuplesRecord<ButtonProps> = {
		shape: ["square", "rounded", "circular"],
		size: ["xs", "s", "m", "l", "xl"],
		width: ["fit", "narrow", "normal", "wide", "fill"],
	};
	return (
		<Sandbox>
			<div>
				<T.Title>Button</T.Title>
				<p>Interactive component activated by a user.</p>
			</div>
			<div>
				<T.Title size="xl" as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add button"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<T.Title size="xl" as="h2">
				Variants:
			</T.Title>
			<div>
				<T.Title size="l" as="h3">
					Size
				</T.Title>
				<div className="flex flex-col gap-16d">
					<div className="flex flex-wrap gap-16d items-center">
						{variantsCfg.size?.map((v) => (
							<Button size={v} key={v} className="uppercase" solid>
								{v}
							</Button>
						))}
					</div>
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					Width
				</T.Title>
				<li className="ms-4">
					<T.Title size="m" as="h4">
						Flex
					</T.Title>
				</li>
				<div className="flex flex-col gap-16d w-full items-start">
					{variantsCfg.width?.map((width) => (
						<Button
							width={width}
							size={"m"}
							solid={width !== "fit"}
							key={width}
						>
							<SparkleIcon />
							<span>{capitalize(width)}</span>
						</Button>
					))}
				</div>
				<li className="ms-4">
					<T.Title size="m" as="h4" className="mt-2">
						Block
					</T.Title>
				</li>
				<div>
					{variantsCfg.width?.map((width) => (
						<Button
							width={width}
							size={"m"}
							solid={width !== "fit"}
							className="not-last:me-4 mb-2"
							key={width}
						>
							<SparkleIcon />
							<span>{capitalize(width)}</span>
						</Button>
					))}
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					Shape
				</T.Title>
				<div className="flex flex-col gap-16d">
					<div className="flex gap-16d">
						{variantsCfg.shape?.map((v) => (
							<Button shape={v} key={v} className="[&>button]:capitalize" solid>
								{v}
							</Button>
						))}
					</div>
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					Appearance
				</T.Title>
				<li className="ms-4 -mb-1">
					<T.Title size="m" as="h4">
						Lowered
					</T.Title>
				</li>
				<div className="flex gap-16d flex-wrap items-center">
					<Button intent={"neutral"}>None</Button>
					<Button outlined intent={"neutral"}>
						Outlined
					</Button>
					<Button intent={"neutral"} solid>
						Solid
					</Button>
					<Button outlined intent={"neutral"} solid>
						Solid Outlined
					</Button>
				</div>
				<li className="ms-4 -mb-1 mt-2">
					<T.Title size="m" as="h4">
						Flat
					</T.Title>
				</li>
				<div className="flex gap-16d flex-wrap items-center">
					<Button intent={"neutral"} flat>
						None
					</Button>
					<Button outlined intent={"neutral"} flat>
						Outlined
					</Button>
					<Button intent={"neutral"} solid flat>
						Solid
					</Button>
					<Button outlined intent={"neutral"} solid flat>
						Solid Outlined
					</Button>
				</div>
			</div>
			<div className="list-disc">
				<T.Title size="l" as="h3">
					Intent / Emphasis
				</T.Title>

				<li className="ms-4">
					<T.Title size="l" as="h4">
						Flat
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(3,max-content)] w-fit gap-12d">
					<div className="col-span-3 -mb-2 flex items-start">
						<div
							className="w-20 grid grid-cols-2"
							style={{
								background:
									"linear-gradient(20deg, transparent 48.5%, currentColor, transparent 51.5%)",
							}}
						>
							<div></div>
							<div>Emphasis</div>
							<div>Intent</div>
						</div>
						<div
							className="aspect-16 w-full ml-4"
							style={{
								background: `linear-gradient(
									to right,
									oklch(0.3 0 29 / 0),
									oklch(0.3 0.3 29 / 0.8)
								)`,
								clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 90%)",
							}}
						/>
					</div>
					<div className="flex justify-between gap-12d items-center">
						<div className="grow fs-15d">No Intent:</div>
						<Button emphasis={"low"} size={"xs"} flat solid>
							Low
						</Button>
						<Button emphasis={"low"} outlined size={"xs"} solid flat>
							Low
						</Button>
						<Button emphasis={"low"} outlined size={"xs"} flat>
							Low
						</Button>
						<Button emphasis={"low"} size={"xs"} flat width={"fit"}>
							Low
						</Button>
					</div>
					<div className="flex gap-12d items-center">
						<Button emphasis={"medium"} size={"xs"} flat solid>
							Medium
						</Button>
						<Button emphasis={"medium"} outlined size={"xs"} flat solid>
							Medium
						</Button>
						<Button emphasis={"medium"} outlined size={"xs"} flat>
							Medium
						</Button>
						<Button emphasis={"medium"} size={"xs"} flat width={"fit"}>
							Medium
						</Button>
					</div>
					<div className="flex gap-12d items-center">
						<Button emphasis={"high"} size={"xs"} flat solid>
							High
						</Button>
						<Button emphasis={"high"} outlined size={"xs"} flat solid>
							High
						</Button>
						<Button emphasis={"high"} outlined size={"xs"} flat>
							High
						</Button>
						<Button emphasis={"high"} size={"xs"} flat width={"fit"}>
							High
						</Button>
					</div>
					{intentColors.map((intent) =>
						emphases.map((emphasis, i) => (
							<div
								key={`${intent}${emphasis}`}
								className="flex justify-between gap-12d items-center fs-15d"
							>
								{i === 0 && <div className="capitalize grow">{intent}:</div>}
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									size={"xs"}
									flat
									solid
								>
									{emphasis}
								</Button>
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									outlined
									size={"xs"}
									flat
									solid
								>
									{emphasis}
								</Button>
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									outlined
									size={"xs"}
									flat
								>
									{emphasis}
								</Button>
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									size={"xs"}
									flat
									width={"fit"}
								>
									{emphasis}
								</Button>
							</div>
						)),
					)}
				</div>
			</div>
			<div className="-mt-2">
				<li className="ms-4">
					<T.Title size="l" as="h4">
						Lifted
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(3,max-content)] w-fit gap-12d">
					<div className="flex justify-between gap-12d items-center">
						<div className="grow fs-15d">No Intent:</div>
						<Button emphasis={"low"} size={"xs"} solid>
							Low
						</Button>
						<Button emphasis={"low"} outlined size={"xs"} solid>
							Low
						</Button>
						<Button emphasis={"low"} outlined size={"xs"}>
							Low
						</Button>
						<Button emphasis={"low"} size={"xs"} width={"fit"}>
							Low
						</Button>
					</div>
					<div className="flex items-center gap-12d">
						<Button emphasis={"medium"} size={"xs"} solid>
							Medium
						</Button>
						<Button emphasis={"medium"} outlined size={"xs"} solid>
							Medium
						</Button>
						<Button emphasis={"medium"} outlined size={"xs"}>
							Medium
						</Button>
						<Button emphasis={"medium"} size={"xs"} width={"fit"}>
							Medium
						</Button>
					</div>
					<div className="flex items-center gap-12d">
						<Button emphasis={"high"} size={"xs"} solid>
							High
						</Button>
						<Button emphasis={"high"} outlined size={"xs"} solid>
							High
						</Button>
						<Button emphasis={"high"} outlined size={"xs"}>
							High
						</Button>
						<Button emphasis={"high"} size={"xs"} width={"fit"}>
							High
						</Button>
					</div>
					{intentColors.map((intent) =>
						emphases.map((emphasis, i) => (
							<div
								key={`${intent}${emphasis}`}
								className="flex justify-between gap-12d items-center fs-15d"
							>
								{i === 0 && <div className="capitalize grow">{intent}:</div>}
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									size={"xs"}
									solid
								>
									{emphasis}
								</Button>
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									size={"xs"}
									outlined
									solid
								>
									{emphasis}
								</Button>
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									size={"xs"}
									outlined
								>
									{emphasis}
								</Button>
								<Button
									intent={intent}
									emphasis={emphasis}
									className="[&>button]:capitalize"
									size={"xs"}
									width={"fit"}
								>
									{emphasis}
								</Button>
							</div>
						)),
					)}
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					State
				</T.Title>
				<div className="flex gap-16d mb-10 items-center">
					<div className="flex gap-8d items-center">
						<Button emphasis={"high"} className="w-fit" disabled solid>
							Disabled
						</Button>
					</div>
					<div className="flex gap-16d items-center">
						<div className="flex items-center gap-8d">
							<div className="flex gap-10d">
								<Button emphasis={"high"} className="w-fit" loading solid>
									Loading
								</Button>
								<Button
									emphasis={"high"}
									className="w-fit"
									loading
									solid
									width={"narrow"}
								>
									<SparkleIcon />
								</Button>
							</div>
							Loading
						</div>
						<div className="flex items-center gap-8d">
							<Button
								emphasis={"high"}
								className="w-fit"
								loading
								disabled
								solid
							/>
							Disabled & Loading
						</div>
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
