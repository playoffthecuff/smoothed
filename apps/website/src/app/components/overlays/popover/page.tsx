import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { T } from "@/components/ui/typography";

export default function PopoverPage() {
	return (
		<Sandbox>
			<div>
				<T.Title>Popover</T.Title>
				<p>A popup window anchored to its trigger</p>
			</div>
			<div>
				<T.Title size={"xl"} as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add popover"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
		</Sandbox>
	);
}
