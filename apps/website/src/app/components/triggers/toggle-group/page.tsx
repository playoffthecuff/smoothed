import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Link } from "@/components/ui/navigation/link/link";
import { ToggleGroup } from "@/components/ui/triggers/toggle-group";
import { T } from "@/components/ui/typography";

export default function ToggleGroupPage() {
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
			<div className="flex gap-16d">
				<ToggleGroup.Root
					intent={"neutral"}
					pressedIntent={"accent"}
					emphasis={"low"}
					shape={"circular"}
					toggleEffect="background"
					defaultValue={["left"]}
					outlined
					animated
				>
					<ToggleGroup.Toggle value="left">1</ToggleGroup.Toggle>
					<ToggleGroup.Toggle value="right">2</ToggleGroup.Toggle>
				</ToggleGroup.Root>
			</div>
		</Sandbox>
	);
}
