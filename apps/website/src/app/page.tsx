import { Sandbox } from "@/components/sandbox/sandbox";
import { Link } from "@/components/ui/navigation/link/link";
import { T } from "@/components/ui/typography";

export default function Home() {
	return (
		<Sandbox>
			<T.Title>Smoothed</T.Title>
			<p>Copy-paste react UI components</p>
			<div className="flex flex-col gap-8d mt-10d">
				<Link href="/get-started">Get Started</Link>
				<Link href="/theme-editor">Theme Editor</Link>
				<Link href="/components">Components</Link>
			</div>
		</Sandbox>
	);
}
