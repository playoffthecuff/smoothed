import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Label } from "@/components/ui/label/label";
import { Title } from "@/components/ui/typography/title";

export default function LabelPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Label</Title>
				<p>Control Label</p>
			</div>
			<div>
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add label"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={5}>Variants:</Title>
			<div className="flex flex-col gap-16d">
				<div className="flex flex-col gap-4d">
					<Title size={4}>Size</Title>
					<Label size={"xs"}>Size Extra Small - XS</Label>
					<Label size={"s"}>Size Small - S</Label>
					<Label size={"m"}>Size Medium - M</Label>
					<Label size={"l"}>Size Large - L</Label>
					<Label size={"xl"}>Size Extra Large - XL</Label>
				</div>
				<div className="flex flex-col gap-4d">
					<Title size={4}>Intent</Title>
					<Label>Neutral</Label>

					<Label intent="primary">Primary</Label>
					<Label intent={"secondary"}>Secondary</Label>
					<Label intent="warning">Warning</Label>

					<Label intent={"success"}>Success</Label>

					<Label intent={"error"}>Error</Label>
				</div>
				<div className="flex flex-col gap-4d">
					<Title size={4}>Required</Title>
					<Label required>Required Label</Label>
					<Label required intent={"secondary"}>
						Required Label
					</Label>
					<Label required intent={"primary"}>
						Required Label
					</Label>
					<Label required intent={"success"}>
						Required Label
					</Label>
					<Label required intent={"warning"}>
						Required Label
					</Label>
					<Label required intent={"error"}>
						Required Label
					</Label>
				</div>
			</div>
		</div>
	);
}
