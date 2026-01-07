import { Button } from "@/components/ui/button/button";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { SparkleIcon } from "@/components/ui/icons/sparkle";
import { Title } from "@/components/ui/typography/title";

export default function ButtonPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Button</Title>
				<p>Interactive component activated by a user.</p>
			</div>
			<div>
				<Title size={2}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/s3-line@latest add button"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={2}>Variants:</Title>
			<div>
				<Title size={3}>Size</Title>
				<div className="flex flex-wrap gap-16d items-center">
					<Button size="s">Small - S</Button>
					<Button>Default - M</Button>
					<Button size="l">Large - L</Button>
				</div>
			</div>
			<div>
				<Title size={3}>Width</Title>
				<div className="flex flex-wrap gap-16d items-center">
					<div className="flex gap-10d items-center">
						<Button width={"narrow"}>
							<SparkleIcon />
						</Button>
						<Button width={"narrow"}>Square</Button>
					</div>
					<div className="flex gap-10d items-center">
						<Button width={"normal"}>
							<SparkleIcon />
							<span>Normal</span>
						</Button>
					</div>
					<div className="flex gap-10d items-center">
						<Button width={"wide"}>
							<SparkleIcon />
							<span>Wide</span>
						</Button>
					</div>
				</div>
			</div>
			<div>
				<Title size={3}>Intent</Title>
				<div className="flex flex-wrap gap-16d items-start">
					<Button intent={"neutral"}>Neutral</Button>
					<Button intent={"primary"}>Primary</Button>
					<Button intent={"secondary"}>Secondary</Button>
					<Button intent={"visited"}>Visited</Button>
					<Button intent={"destructive"}>Destructive</Button>
					<Button intent={"warning"}>Warning</Button>
					<Button intent={"success"}>Success</Button>
				</div>
			</div>
			<div>
				<Title size={3}>Appearance</Title>
				<div className="grid grid-cols-[repeat(5,max-content)] w-fit gap-16d">
					<Button appearance={"solid"}>Solid</Button>
					<Button appearance={"subtle"}>Subtle</Button>
					<Button appearance={"outline"}>Outline</Button>
					<Button appearance={"ghost"}>Ghost</Button>
					<Button appearance={"link"}>Link</Button>
					<Button appearance={"solid"} intent={"primary"}>
						Solid
					</Button>
					<Button appearance={"subtle"} intent={"primary"}>
						Subtle
					</Button>
					<Button appearance={"outline"} intent={"primary"}>
						Outline
					</Button>
					<Button appearance={"ghost"} intent={"primary"}>
						Ghost
					</Button>
					<Button appearance={"link"} intent={"primary"}>
						Link
					</Button>
					<Button appearance={"solid"} intent={"destructive"}>
						Solid
					</Button>
					<Button appearance={"subtle"} intent={"destructive"}>
						Subtle
					</Button>
					<Button appearance={"outline"} intent={"destructive"}>
						Outline
					</Button>
					<Button appearance={"ghost"} intent={"destructive"}>
						Ghost
					</Button>
					<Button appearance={"link"} intent={"destructive"}>
						Link
					</Button>
					<Button appearance={"solid"} intent={"secondary"}>
						Solid
					</Button>
					<Button appearance={"subtle"} intent={"secondary"}>
						Subtle
					</Button>
					<Button appearance={"outline"} intent={"secondary"}>
						Outline
					</Button>
					<Button appearance={"ghost"} intent={"secondary"}>
						Ghost
					</Button>
					<Button appearance={"link"} intent={"secondary"}>
						Link
					</Button>
					<Button appearance={"solid"} intent={"visited"}>
						Solid
					</Button>
					<Button appearance={"subtle"} intent={"visited"}>
						Subtle
					</Button>
					<Button appearance={"outline"} intent={"visited"}>
						Outline
					</Button>
					<Button appearance={"ghost"} intent={"visited"}>
						Ghost
					</Button>
					<Button appearance={"link"} intent={"visited"}>
						Link
					</Button>
					<Button appearance={"solid"} intent={"warning"}>
						Solid
					</Button>
					<Button appearance={"subtle"} intent={"warning"}>
						Subtle
					</Button>
					<Button appearance={"outline"} intent={"warning"}>
						Outline
					</Button>
					<Button appearance={"ghost"} intent={"warning"}>
						Ghost
					</Button>
					<Button appearance={"link"} intent={"warning"}>
						Link
					</Button>
					<Button appearance={"solid"} intent={"success"}>
						Solid
					</Button>
					<Button appearance={"subtle"} intent={"success"}>
						Subtle
					</Button>
					<Button appearance={"outline"} intent={"success"}>
						Outline
					</Button>
					<Button appearance={"ghost"} intent={"success"}>
						Ghost
					</Button>
					<Button appearance={"link"} intent={"success"}>
						Link
					</Button>
				</div>
			</div>
			<div>
				<Title size={3}>Lifted</Title>
				<div className="grid grid-cols-[repeat(4,max-content)] w-fit gap-16d">
					<Button appearance={"solid"} lifted>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted>
						Ghost
					</Button>
					<Button appearance={"solid"} lifted intent={"primary"}>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted intent={"primary"}>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted intent={"primary"}>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted intent={"primary"}>
						Ghost
					</Button>
					<Button appearance={"solid"} lifted intent={"destructive"}>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted intent={"destructive"}>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted intent={"destructive"}>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted intent={"destructive"}>
						Ghost
					</Button>
					<Button appearance={"solid"} lifted intent={"secondary"}>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted intent={"secondary"}>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted intent={"secondary"}>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted intent={"secondary"}>
						Ghost
					</Button>
					<Button appearance={"solid"} lifted intent={"visited"}>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted intent={"visited"}>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted intent={"visited"}>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted intent={"visited"}>
						Ghost
					</Button>
					<Button appearance={"solid"} lifted intent={"warning"}>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted intent={"warning"}>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted intent={"warning"}>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted intent={"warning"}>
						Ghost
					</Button>
					<Button appearance={"solid"} lifted intent={"success"}>
						Solid
					</Button>
					<Button appearance={"subtle"} lifted intent={"success"}>
						Subtle
					</Button>
					<Button appearance={"outline"} lifted intent={"success"}>
						Outline
					</Button>
					<Button appearance={"ghost"} lifted intent={"success"}>
						Ghost
					</Button>
				</div>
			</div>
			<div>
				<Title size={3}>Shape</Title>
				<div className="flex flex-wrap gap-16d items-start">
					<Button shape={"square"}>Square</Button>
					<Button shape={"rounded"} className="before:font-11d">
						Rounded
					</Button>
					<Button shape={"circular"}>Circular</Button>
				</div>
			</div>
			<div>
				<Title size={3}>State</Title>
				<div className="flex gap-16d mb-10 items-center">
					<div className="flex gap-8d items-center">
						<Button appearance={"solid"} className="w-fit" disabled>
							Disabled
						</Button>
					</div>
					<div className="flex gap-16d items-center">
						<div className="flex items-center gap-8d">
							<Button appearance={"solid"} className="w-fit" loading >
								Loading
							</Button>
							<Button appearance={"solid"} className="w-fit" loading />
							Loading
						</div>
						<div className="flex items-center gap-8d">
							<Button appearance={"solid"} className="w-fit" loading disabled />
							Disabled & Loading
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
