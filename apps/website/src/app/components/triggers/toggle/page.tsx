"use client";

import { useState } from "react";
import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { DislikeIcon } from "@/components/ui/icons/dislike";
import { HeartIcon } from "@/components/ui/icons/heart";
import { LikeIcon } from "@/components/ui/icons/like";
import { SmartphoneIcon } from "@/components/ui/icons/smartphone";
import { Toggle, type ToggleProps } from "@/components/ui/triggers/toggle";
import { T } from "@/components/ui/typography";
import type { UnionsRecordIntoTuplesRecord } from "@/lib/types/helpers";

// TODO вынести повторяющиеся блоки страниц в отдельные переиспользуемые врапперы
export default function TogglePage() {
	const [pressed, setPressed] = useState(true);
	const handlePress = () => {
		setPressed(!pressed);
	};
	const variantsCfg: UnionsRecordIntoTuplesRecord<ToggleProps> = {
		shape: ["square", "rounded", "circular"],
		size: ["xs", "s", "m", "l", "xl"],
		intent: ["accent", "neutral", "info", "success", "warning", "danger"],
		emphasis: ["low", "medium", "high"],
	};
	return (
		<Sandbox>
			<div>
				<T.Title>Toggle</T.Title>
				<p>A user-activated, toggleable interactive component.</p>
			</div>
			<div>
				<T.Title size="xl" as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add toggle"
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
								<Toggle
									size={v}
									toggleEffect={"fill"}
									onPressedChange={(v) => console.log("toggled to", v)}
									className={"[&>button]:p-[0]"}
									solid
								>
									<HeartIcon />
								</Toggle>
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
							<Toggle
								shape={v}
								toggleEffect={"fill"}
								onPressedChange={(v) => console.log("toggled to", v)}
								className={"[&>button]:p-[0]"}
								solid
							>
								<HeartIcon />
							</Toggle>
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
					<div className="flex gap-10d items-center capitalize">
						<Toggle
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
						None
					</div>
					<div className="flex gap-10d items-center capitalize">
						<Toggle
							solid
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
						Solid
					</div>
					<div className="flex gap-10d items-center capitalize">
						<Toggle
							outlined
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
						Outlined
					</div>

					<div className="flex gap-10d items-center capitalize">
						<Toggle
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							solid
							outlined
						>
							<HeartIcon />
						</Toggle>
						Solid & Outlined
					</div>
				</div>
				<li className="ms-4 -mb-1 mt-2">
					<T.Title size="m" as="h4">
						Flat
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(4,max-content)] w-fit gap-16d">
					<div className="flex gap-10d items-center capitalize">
						<Toggle
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
						None
					</div>
					<div className="flex gap-10d items-center capitalize">
						<Toggle
							solid
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
						Solid
					</div>
					<div className="flex gap-10d items-center capitalize">
						<Toggle
							outlined
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
						Outlined
					</div>

					<div className="flex gap-10d items-center capitalize">
						<Toggle
							solid
							outlined
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
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
				<div className="grid grid-cols-[repeat(3,max-content)] w-fit gap-16d">
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
					<div className="flex justify-between gap-16d items-center">
						<div className="grow">No Intent:</div>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
							flat
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
							solid
							outlined
							flat
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
							flat
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
					</div>
					<div className="flex items-center gap-16d">
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							flat
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
							solid
							flat
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
							flat
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
					</div>
					<div className="flex items-center gap-16d">
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							flat
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							solid
							outlined
							flat
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
							flat
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							flat
						>
							<HeartIcon />
						</Toggle>
					</div>
					{variantsCfg.intent?.map((intent) =>
						variantsCfg.emphasis?.map((emphasis, i) => (
							<div
								key={`${intent}${emphasis}`}
								className="flex justify-between gap-16d items-center"
							>
								{i === 0 && <div className="capitalize grow">{intent}:</div>}
								<Toggle
									intent={intent}
									emphasis={emphasis}
									className="capitalize"
									toggleEffect={"fill"}
									solid
									flat
								>
									<HeartIcon />
								</Toggle>
								<Toggle
									intent={intent}
									emphasis={emphasis}
									outlined
									solid
									className="capitalize"
									toggleEffect={"fill"}
									flat
								>
									<HeartIcon />
								</Toggle>
								<Toggle
									intent={intent}
									emphasis={emphasis}
									solid
									outlined
									className="capitalize"
									toggleEffect={"fill"}
									flat
								>
									<HeartIcon />
								</Toggle>
								<Toggle
									intent={intent}
									emphasis={emphasis}
									className="capitalize"
									toggleEffect={"fill"}
									flat
								>
									<HeartIcon />
								</Toggle>
							</div>
						)),
					)}
				</div>
			</div>
			<div className="-mt-2">
				<li className="ms-4">
					<T.Title size="m" as="h4">
						Lifted
					</T.Title>
				</li>
				<div className="grid grid-cols-[repeat(3,max-content)] w-fit gap-16d">
					<div className="flex justify-between gap-16d items-center">
						<div className="grow">No Intent:</div>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							solid
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
							solid
							outlined
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"low"}
							className="capitalize"
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
					</div>
					<div className="flex items-center gap-16d">
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"medium"}
							className="capitalize"
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
					</div>
					<div className="flex items-center gap-16d">
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
							solid
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
							outlined
						>
							<HeartIcon />
						</Toggle>
						<Toggle
							emphasis={"high"}
							className="capitalize"
							toggleEffect={"fill"}
						>
							<HeartIcon />
						</Toggle>
					</div>
					{variantsCfg.intent?.map((intent) =>
						variantsCfg.emphasis?.map((emphasis, i) => (
							<div
								key={`${intent}${emphasis}`}
								className="flex justify-between gap-16d items-center"
							>
								{i === 0 && <div className="capitalize grow">{intent}:</div>}
								<Toggle
									intent={intent}
									emphasis={emphasis}
									className="capitalize"
									toggleEffect={"fill"}
									solid
								>
									<HeartIcon />
								</Toggle>
								<Toggle
									intent={intent}
									emphasis={emphasis}
									outlined
									solid
									className="capitalize"
									toggleEffect={"fill"}
								>
									<HeartIcon />
								</Toggle>
								<Toggle
									intent={intent}
									emphasis={emphasis}
									outlined
									className="capitalize"
									toggleEffect={"fill"}
								>
									<HeartIcon />
								</Toggle>
								<Toggle
									intent={intent}
									emphasis={emphasis}
									className="capitalize"
									toggleEffect={"fill"}
								>
									<HeartIcon />
								</Toggle>
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
						<Toggle
							size={"m"}
							onPressedChange={handlePress}
							toggleEffect={"none"}
							pressed={pressed}
							solid
						>
							{pressed ? <LikeIcon /> : <DislikeIcon />}
						</Toggle>
						None
					</div>
					<div className="flex gap-10d items-center">
						<div className="flex gap-12d">
							<Toggle
								size={"m"}
								onPressedChange={handlePress}
								toggleEffect={"background"}
								emphasis={"low"}
								pressed={pressed}
								solid
							>
								<SmartphoneIcon />
							</Toggle>
							<Toggle
								size={"m"}
								onPressedChange={handlePress}
								toggleEffect={"background"}
								emphasis={"medium"}
								pressed={pressed}
								solid
							>
								<SmartphoneIcon />
							</Toggle>
							<Toggle
								size={"m"}
								onPressedChange={handlePress}
								toggleEffect={"background"}
								emphasis={"high"}
								pressed={pressed}
								solid
							>
								<SmartphoneIcon />
							</Toggle>
						</div>
						Background
					</div>
					<div className="flex gap-10d items-center">
						<Toggle
							size={"m"}
							onPressedChange={handlePress}
							pressed={pressed}
							toggleEffect={"fill"}
							solid
						>
							<HeartIcon />
						</Toggle>
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
							<Toggle
								pressedIntent={v}
								className="capitalize"
								solid
								toggleEffect={"background"}
							>
								<HeartIcon />
							</Toggle>
							<Toggle
								pressedIntent={v}
								className="capitalize"
								outlined
								toggleEffect={"fill"}
							>
								<HeartIcon />
							</Toggle>
							<Toggle
								pressedIntent={v}
								className="capitalize"
								toggleEffect={"fill"}
							>
								<HeartIcon />
							</Toggle>
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
						<Toggle
							emphasis="high"
							intent={"neutral"}
							disabled
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							solid
						>
							<HeartIcon />
						</Toggle>
						Disabled
					</div>
					<div className="flex gap-10d items-center">
						<Toggle
							emphasis="high"
							intent={"neutral"}
							loading
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							solid
						>
							<HeartIcon />
						</Toggle>
						Loading
					</div>
					<div className="flex gap-10d items-center">
						<Toggle
							emphasis="high"
							intent={"neutral"}
							loading
							disabled
							onPressedChange={(v) => console.log("toggled to", v)}
							toggleEffect={"fill"}
							solid
						>
							<HeartIcon />
						</Toggle>
						Disabled & Loading
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
