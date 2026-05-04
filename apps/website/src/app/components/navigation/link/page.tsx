import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Link, type LinkVariants } from "@/components/ui/navigation/link/link";
import { T } from "@/components/ui/typography";
import type { UnionsRecordIntoTuplesRecord } from "@/lib/types/helpers";

export default function TitlePage() {
	const variantCfg: UnionsRecordIntoTuplesRecord<LinkVariants> = {
		size: ["xs", "s", "m", "l", "xl"],
		emphasis: ["low", "medium", "high"],
		intent: ["neutral", "accent", "success", "warning", "danger", "info"],
	} as const;
	return (
		<Sandbox>
			<div>
				<T.Title>Link</T.Title>
				<p>
					Use link variants and link props to get classes with design system
					styles to apply to any of your link components
				</p>
			</div>
			<div>
				<T.Title size={"xl"} as={"h2"}>
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add link-variants"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<T.Title size={"xl"} as={"h2"}>
				Variants:
			</T.Title>
			<div className="flex flex-col gap-16d">
				<div className="flex flex-col">
					<T.Title size={"l"} as={"h3"}>
						Size
					</T.Title>
					{variantCfg.size?.map((size) => (
						<Link
							href={"/components/navigation/link"}
							size={size}
							intent="accent"
							key={size}
							className="uppercase"
						>
							{size}
						</Link>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-16d">
				<div className="flex flex-col">
					<T.Title size={"l"} as={"h3"}>
						Intent
					</T.Title>
					<Link href={"/components/navigation/link"} className="capitalize">
						No Intent
					</Link>
					{variantCfg.intent?.map((intent) => (
						<Link
							href={"/components/navigation/link"}
							intent={intent}
							key={intent}
							className="capitalize"
						>
							{intent}
						</Link>
					))}
				</div>
			</div>
			<div className="flex flex-col gap-16d">
				<div className="flex flex-col">
					<T.Title size={"l"} as={"h3"}>
						Emphasis
					</T.Title>
					{variantCfg.emphasis?.map((emphasis) => (
						<Link
							href={"/components/navigation/link"}
							emphasis={emphasis}
							key={emphasis}
							className="capitalize"
							intent="accent"
						>
							{emphasis}
						</Link>
					))}
				</div>
			</div>
		</Sandbox>
	);
}
