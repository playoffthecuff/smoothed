import { Card } from "@/components/ui/card/card";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Title } from "@/components/ui/typography/title";

export default function CardPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Card</Title>
				<p>A visually distinct area with content</p>
			</div>
			<div>
				<Title size={2}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add card"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={2}>Variants:</Title>
			<div className="max-w-60">
				<Card>
					<Title size={3}>Title</Title>
					<p className="text-muted font-10d">Description</p>
					<hr className="text-muted opacity-64 my-12d" />
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
						officia cupiditate similique quam ipsa aliquid, commodi
						necessitatibus explicabo enim ipsam tempora adipisci facilis ad
						eligendi soluta repudiandae dolorum est fuga!
					</p>
				</Card>
			</div>
		</div>
	);
}
