import { Link } from "@/components/ui/navigation/link/link";
import { T } from "@/components/ui/typography";

export default function ThemeEditorPage() {
	return (
		<div
			className="max-w-200 min-h-full surface-1 mx-auto p-18d flex gap-10d self-start flex-col overflow-x-auto grow"
			style={{ width: "clamp(320px, 100%, 800px)" }}
		>
			<T.Title>Select Theme to edit</T.Title>
			<ul className="list-disc">
				<li className="ms-4">
					<Link href={"./material"}>Material</Link>
				</li>
			</ul>
		</div>
	);
}
