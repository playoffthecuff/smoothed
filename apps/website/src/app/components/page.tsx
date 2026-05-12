import { Link } from "@/components/ui/navigation/next-link";
import { T } from "@/components/ui/typography";

export default function ComponentsPage() {
	return (
		<div
			className="max-w-200 min-h-full surface-1 mx-auto p-18d flex gap-10d self-start flex-col overflow-x-auto grow rel-elevation-5 sfc-default sfc-shadow"
			style={{ width: "clamp(320px, 100%, 800px)" }}
		>
			<T.Title>Components</T.Title>
			<nav>
				<ul className="flex flex-col gap-12d">
					<li className="ml-18d">
						<ul>
							<T.Title size={"xl"} as="h2">
								Data Display
							</T.Title>
							<li className="ml-18d">
								<Link href={"/components/data-display/card"}>Card</Link>
							</li>
						</ul>
					</li>
					<li className="ml-18d">
						<T.Title size={"xl"} as="h2">
							Data Entry
						</T.Title>

						<ul>
							<li className="ml-18d">
								<Link href={"/components/data-entry/checkbox-field"}>
									Checkbox Field
								</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/data-entry/number-field"}>
									Number Field
								</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/data-entry/select-field"}>
									Select Field
								</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/data-entry/slider-field"}>
									Slider Field
								</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/data-entry/text-field"}>
									Text Field
								</Link>
							</li>
						</ul>
					</li>
					<li className="ml-18d">
						<ul>
							<T.Title size={"xl"} as="h2">
								Icons
							</T.Title>
							<li className="ml-18d">
								<Link href={"/components/icons"}>Icons</Link>
							</li>
						</ul>
					</li>
					<li className="ml-18d">
						<ul>
							<T.Title size={"xl"} as="h2">
								Navigation
							</T.Title>
							<ul>
								<li className="ml-18d">
									<Link href={"/components/navigation/link"}>Link</Link>
								</li>
							</ul>
						</ul>
					</li>
					<li className="ml-18d">
						<T.Title size={"xl"} as="h2">
							Triggers
						</T.Title>
						<ul>
							<li className="ml-18d">
								<Link href={"/components/triggers/button"}>Button</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/triggers/toggle"}>Toggle</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/triggers/toggle-group"}>
									Toggle Group
								</Link>
							</li>
						</ul>
					</li>

					<li className="ml-18d">
						<ul>
							<T.Title size={"xl"} as="h2">
								Feedback
							</T.Title>
						</ul>
					</li>
					<li className="ml-18d">
						<ul>
							<T.Title size={"xl"} as="h2">
								Overlays
							</T.Title>
							<li className="ml-18d">
								<Link href={"/components/overlays/popover"}>Popover</Link>
							</li>
							<li className="ml-18d">
								<Link href={"/components/overlays/dialog"}>Dialog</Link>
							</li>
						</ul>
					</li>

					<li className="ml-18d">
						<ul>
							<T.Title size={"xl"} as="h2">
								Typography
							</T.Title>
							<li className="ml-18d">
								<Link href={"/components/typography"}>Typography</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	);
}
