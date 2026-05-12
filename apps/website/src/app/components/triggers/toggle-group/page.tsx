"use client";

import { useState } from "react";
import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { DislikeIcon } from "@/components/ui/icons/dislike";
import { LikeIcon } from "@/components/ui/icons/like";
import { Link } from "@/components/ui/navigation/next-link";
import { ToggleGroup } from "@/components/ui/triggers/toggle-group";
import { T } from "@/components/ui/typography";

export default function ToggleGroupPage() {
	const [value, setValue] = useState(["left"]);
	const toggleValue = (v: string[]) => {
		setValue(v);
	};
	const variantsCfg = {
		shape: ["square", "rounded", "circular"],
		size: ["xs", "s", "m", "l", "xl"],
		intent: ["accent", "neutral", "info", "success", "warning", "danger"],
		emphasis: ["low", "medium", "high"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Toggle Group</T.Title>
				<p>
					Group of <Link href={"/components/triggers/toggle"}>Toggles</Link>
				</p>
			</div>
			<div>
				<T.Title size="xl" as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add toggle-group"
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
							<div
								className="flex gap-10d items-center uppercase leading-none"
								key={v}
							>
								<ToggleGroup.Root defaultValue={["left"]} size={v} solid>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								{v}
							</div>
						))}
					</div>
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					Shape
				</T.Title>
				<div className="flex flex-col gap-16d">
					{variantsCfg.shape?.map((v) => (
						<div
							className="flex gap-10d items-center capitalize leading-none"
							key={v}
						>
							<ToggleGroup.Root defaultValue={["left"]} shape={v} solid>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
							{v}
						</div>
					))}
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
				<div className="grid grid-cols-[repeat(4,max-content)] w-fit gap-16d">
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]}>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						None
					</div>
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} solid>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Solid
					</div>
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} outlined>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Outlined
					</div>
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} solid outlined>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Solid & Outlined
					</div>
				</div>
				<li className="ms-4 -mb-1">
					<T.Title size="m" as="h4">
						Flat
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(4,max-content)] w-fit gap-16d">
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} flat>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						None
					</div>
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} solid flat>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Solid
					</div>
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} outlined flat>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Outlined
					</div>
					<div className="flex gap-10d items-center capitalize leading-none">
						<ToggleGroup.Root defaultValue={["left"]} solid outlined flat>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Solid & Outlined
					</div>
				</div>
			</div>
			<div className="list-disc">
				<T.Title size="l" as="h3">
					Intent / Emphasis
				</T.Title>

				<li className="ms-4">
					<T.Title size="m" as="h4">
						Flat
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(3,max-content)] w-fit gap-13d">
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
							className="aspect-16 w-full ml-4 self-end mb-2"
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
					<div className="flex justify-between gap-13d items-center">
						<div className="grow fs-15d">No Intent:</div>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							solid
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							outlined
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							solid
							outlined
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
					</div>
					<div className="flex items-center gap-13d">
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							solid
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							outlined
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							solid
							outlined
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
					</div>
					<div className="flex items-center gap-13d">
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							solid
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							outlined
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							flat
							solid
							outlined
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
					</div>
					{variantsCfg.intent?.map((intent) =>
						variantsCfg.emphasis?.map((emphasis, i) => (
							<div
								key={`${intent}${emphasis}`}
								className="flex justify-between gap-13d items-center"
							>
								{i === 0 && (
									<div className="capitalize grow fs-15d">{intent}:</div>
								)}
								<ToggleGroup.Root
									defaultValue={["left"]}
									flat
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								<ToggleGroup.Root
									defaultValue={["left"]}
									flat
									solid
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								<ToggleGroup.Root
									defaultValue={["left"]}
									flat
									outlined
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								<ToggleGroup.Root
									defaultValue={["left"]}
									flat
									solid
									outlined
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
							</div>
						)),
					)}
				</div>
			</div>
			<div className="-mt-2">
				<li className="ms-4">
					<T.Title size="m" as="h4">
						Lowered
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(3,max-content)] w-fit gap-13d">
					<div className="flex justify-between gap-13d items-center">
						<div className="grow fs-15d">No Intent:</div>
						<ToggleGroup.Root
							defaultValue={["left"]}
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							solid
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							outlined
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							solid
							outlined
							emphasis={"low"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
					</div>
					<div className="flex items-center gap-13d">
						<ToggleGroup.Root
							defaultValue={["left"]}
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							solid
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							outlined
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							solid
							outlined
							emphasis={"medium"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
					</div>
					<div className="flex items-center gap-13d">
						<ToggleGroup.Root
							defaultValue={["left"]}
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							solid
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							outlined
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						<ToggleGroup.Root
							defaultValue={["left"]}
							solid
							outlined
							emphasis={"high"}
							size="xs"
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
					</div>
					{variantsCfg.intent?.map((intent) =>
						variantsCfg.emphasis?.map((emphasis, i) => (
							<div
								key={`${intent}${emphasis}`}
								className="flex justify-between gap-13d items-center"
							>
								{i === 0 && (
									<div className="capitalize grow fs-15d">{intent}:</div>
								)}
								<ToggleGroup.Root
									defaultValue={["left"]}
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								<ToggleGroup.Root
									defaultValue={["left"]}
									solid
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								<ToggleGroup.Root
									defaultValue={["left"]}
									outlined
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
								<ToggleGroup.Root
									defaultValue={["left"]}
									solid
									outlined
									emphasis={emphasis}
									intent={intent}
									size="xs"
								>
									<ToggleGroup.Toggle value="left">
										<LikeIcon />
									</ToggleGroup.Toggle>
									<ToggleGroup.Toggle value="right">
										<DislikeIcon />
									</ToggleGroup.Toggle>
								</ToggleGroup.Root>
							</div>
						)),
					)}
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					Toggle Effect
				</T.Title>
				<div className="flex flex-wrap gap-16d items-center">
					<div className="flex gap-10d items-center">
						<ToggleGroup.Root
							value={value}
							solid
							toggleEffect={"none"}
							onValueChange={toggleValue}
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						None
					</div>
					<div className="flex gap-10d items-center">
						<div className="flex gap-12d">
							<ToggleGroup.Root
								value={value}
								solid
								toggleEffect={"background"}
								onValueChange={toggleValue}
								emphasis={"low"}
							>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
							<ToggleGroup.Root
								value={value}
								solid
								toggleEffect={"background"}
								onValueChange={toggleValue}
								emphasis={"medium"}
							>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
							<ToggleGroup.Root
								value={value}
								solid
								toggleEffect={"background"}
								onValueChange={toggleValue}
								emphasis={"high"}
							>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
						</div>
						Background
					</div>
					<div className="flex gap-10d items-center">
						<ToggleGroup.Root
							value={value}
							solid
							toggleEffect={"fill"}
							onValueChange={toggleValue}
							emphasis={"high"}
						>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Fill
					</div>
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					Pressed Intent
				</T.Title>
				<div className="flex flex-col gap-14d">
					{variantsCfg.intent?.map((v) => (
						<div className="flex gap-12d capitalize" key={v}>
							<div className="w-16">{v}:</div>
							<ToggleGroup.Root
								defaultValue={["left"]}
								solid
								pressedIntent={v}
								toggleEffect={"background"}
							>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
							<ToggleGroup.Root
								defaultValue={["left"]}
								outlined
								pressedIntent={v}
								toggleEffect={"fill"}
							>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
							<ToggleGroup.Root
								defaultValue={["left"]}
								pressedIntent={v}
								toggleEffect={"fill"}
							>
								<ToggleGroup.Toggle value="left">
									<LikeIcon />
								</ToggleGroup.Toggle>
								<ToggleGroup.Toggle value="right">
									<DislikeIcon />
								</ToggleGroup.Toggle>
							</ToggleGroup.Root>
						</div>
					))}
				</div>
			</div>
			<div>
				<T.Title size="l" as="h3">
					State
				</T.Title>
				<div className="flex flex-wrap gap-16d items-start">
					<div className="flex gap-10d items-center">
						<ToggleGroup.Root defaultValue={["left"]} disabled solid>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Disabled
					</div>
					<div className="flex gap-10d items-center">
						<ToggleGroup.Root defaultValue={["left"]} loading solid>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Loading
					</div>
					<div className="flex gap-10d items-center">
						<ToggleGroup.Root defaultValue={["left"]} disabled loading solid>
							<ToggleGroup.Toggle value="left">
								<LikeIcon />
							</ToggleGroup.Toggle>
							<ToggleGroup.Toggle value="right">
								<DislikeIcon />
							</ToggleGroup.Toggle>
						</ToggleGroup.Root>
						Disabled & Loading
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
