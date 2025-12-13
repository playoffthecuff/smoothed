import { Button } from "@/components/ui/button/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="p-4 flex flex-col gap-4 max-w-200 mx-auto">
			<h1 className="text-8d font-11d">S Line</h1>
			<p>Copy-paste react UI components</p>
			<div className="flex flex-col gap-12d">
				<Link href="/get-started" className="text-primary underline">
					Get Started
				</Link>
				<Link href="/theme-editor" className="underline text-primary">
					Theme Editor
				</Link>
				<Link href="/components" className="underline text-primary">
					Components
				</Link>	
			</div>
			<div className="p-16d bg-neutral-1 rounded-12d shadow-4d flex gap-16d"> 
				<Button intent={"secondary"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"primary"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"destructive"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"success"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"warning"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"visited"} appearance={"subtle"} lifted>OK</Button>
			</div>
			<div className="p-16d bg-neutral rounded-12d flex gap-16d"> 
				<Button intent={"secondary"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"primary"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"destructive"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"success"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"warning"} appearance={"subtle"} lifted>OK</Button>
				<Button intent={"visited"} appearance={"subtle"} lifted>OK</Button>
			</div>
		</div>
	);
}
