import { Link } from "@/components/ui/link/link";
import { Title } from "@/components/ui/typography/title";

export default function Home() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-8d grow"
			style={{ width: "clamp(320px, 100%, 800px)" }}
		>
			<Title>Smoothed</Title>
			<p>Copy-paste react UI components</p>
			<div className="flex flex-col gap-8d mt-10d">
				<Link href="/get-started">Get Started</Link>
				<Link href="/theme-editor">Theme Editor</Link>
				<Link href="/components">Components</Link>
			</div>
		</div>
	);
}
