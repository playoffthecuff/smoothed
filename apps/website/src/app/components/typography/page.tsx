import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { T } from "@/components/ui/typography";

export default function TitlePage() {
	return (
		<Sandbox>
			<div>
				<T.Title>Typography</T.Title>
				<p>Typography Description</p>
			</div>
			<div>
				<T.Title size="xl" as="h2">
					Installation
				</T.Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add dialog"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<div>
				<T.Title size="xl" as="h2">
					Variants:
				</T.Title>
				<div>
					<T.Title size="l" as="h3">
						Size
					</T.Title>
					<li>
						<T.Title size="m" as="h4">
							Title
						</T.Title>
					</li>
					<div className="flex flex-col">
						<div className="flex gap-16d items-center">
							<T.Title size={"xxs"} as="span">
								XXS
							</T.Title>
							<T.Title size={"xs"} as="span">
								XS
							</T.Title>
							<T.Title size={"s"} as="span">
								S
							</T.Title>
							<T.Title size={"m"} as="span">
								M
							</T.Title>
							<T.Title size={"l"} as="span">
								L
							</T.Title>
							<T.Title size={"xl"} as="span">
								XL
							</T.Title>
							<T.Title size={"xxl"} as="span">
								XXL
							</T.Title>
						</div>
						<li>
							<T.Title size="m" as="h4">
								Text
							</T.Title>
						</li>
						<div className="flex items-center gap-16d flex-wrap">
							<T.Text size={"xxxs"} as="span">
								XXXS
							</T.Text>
							<T.Text size={"xxs"} as="span">
								XXS
							</T.Text>
							<T.Text size={"xs"} as="span">
								XS
							</T.Text>
							<T.Text size={"s"} as="span">
								S
							</T.Text>
							<T.Text size={"m"} as="span">
								M
							</T.Text>
							<T.Text size={"l"} as="span">
								L
							</T.Text>
							<T.Text size={"xl"} as="span">
								XL
							</T.Text>
							<T.Text size={"xxl"} as="span">
								XXL
							</T.Text>
							<T.Text size={"xxxl"} as="span">
								XXXL
							</T.Text>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-16d">
					<div className="flex flex-col gap-4d">
						<T.Title size="m" as="h4">
							Document Hierarchy
						</T.Title>
						<div className="grid grid-cols-[repeat(2,max-content)] gap-x-20d items-center">
							<span>"as" prop value</span>
							<span>rendered element</span>
							<span className="justify-self-end">h2</span>
							<T.Title size={"m"} as="h2">
								{"<h2>"} children {"</h2>"}
							</T.Title>
							<span className="justify-self-end">p</span>
							<T.Text size={"m"} as="p">
								{"<p>"} children {"</p>"}
							</T.Text>
							<span className="justify-self-end">span</span>
							<T.Text size={"m"} as="span">
								{"<span>"} children {"</span>"}
							</T.Text>
							<span className="justify-self-end">...</span>
							<T.Text size={"m"} as="span">
								{"<...>"} children {"</...>"}
							</T.Text>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-16d">
					<div className="flex flex-col gap-4d">
						<T.Title size="l" as="h3">
							Emphasis
						</T.Title>
						<div className="flex items-center gap-16d flex-wrap">
							<T.Title size="m" as="h4" emphasis={"low"}>
								Low
							</T.Title>
							<T.Title size="m" as="h4" emphasis={"medium"}>
								Medium
							</T.Title>
							<T.Title size="m" as="h4" emphasis={"high"}>
								High
							</T.Title>
						</div>
					</div>
				</div>
			</div>
		</Sandbox>
	);
}
