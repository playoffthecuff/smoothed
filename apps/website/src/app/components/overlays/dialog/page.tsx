import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Dialog } from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/triggers/button";
import { T } from "@/components/ui/typography";

export default function DialogPage() {
	const variantsCfg = {
		shape: ["square", "rounded", "circular"],
		emphasis: ["low", "medium", "high"],
		intent: ["neutral", "accent", "success", "warning", "danger", "info"],
		size: ["xs", "s", "m", "l", "xl"],
		id: [""],
		width: ["narrow", "normal", "wide", "fill"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Dialog</T.Title>
				<p>Modal window component</p>
			</div>
			<div>
				<T.Title size={"xl"} as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add dialog"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<div className="grid grid-cols-[repeat(3,max-content)] gap-16d">
				{variantsCfg.intent.map((intent) =>
					variantsCfg.emphasis.map((emphasis, i) => (
						<div
							key={`${intent}${emphasis}`}
							className="flex justify-between gap-16d items-center"
						>
							{!i && <div className="grow capitalize">{intent}:</div>}
							<Dialog.Root>
								<Dialog.Trigger>
									<Button
										intent={intent}
										emphasis={emphasis}
										outlined
										solid={false}
										flat
										animated={false}
									>
										{emphasis}
									</Button>
								</Dialog.Trigger>
								<Dialog.Portal intent={intent} emphasis={emphasis}>
									<Dialog.Header>Header</Dialog.Header>
									<Dialog.Title>Title</Dialog.Title>
									<Dialog.Description>Description</Dialog.Description>
									<Dialog.Close>Close</Dialog.Close>
								</Dialog.Portal>
							</Dialog.Root>
						</div>
					)),
				)}
			</div>
			<div className="grid grid-cols-[repeat(3,max-content)] gap-16d">
				{variantsCfg.intent.map((intent) =>
					variantsCfg.emphasis.map((emphasis, i) => (
						<div
							key={`${intent}${emphasis}-2`}
							className="flex justify-between gap-16d items-center"
						>
							{!i && <div className="grow capitalize">{intent}:</div>}
							<Dialog.Root>
								<Dialog.Trigger>
									<Button
										intent={intent}
										emphasis={emphasis}
										solid
										flat
										animated={false}
									>
										{emphasis}
									</Button>
								</Dialog.Trigger>
								<Dialog.Portal
									intent={intent}
									emphasis={emphasis}
									solid
									outlined={false}
								>
									<Dialog.Header>Header</Dialog.Header>
									<Dialog.Title>Title</Dialog.Title>
									<Dialog.Description>Description</Dialog.Description>
									<Dialog.Close>Close</Dialog.Close>
								</Dialog.Portal>
							</Dialog.Root>
						</div>
					)),
				)}
			</div>
		</Sandbox>
	);
}
