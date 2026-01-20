import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Slider } from "@/components/ui/slider/slider";
import { Title } from "@/components/ui/typography/title";

export default function SliderPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Slider</Title>
				<p>
					An interactive control that accepts range's number(s) from the user.
				</p>
			</div>
			<div>
				<Title size={5}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add slider"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={5}>Variants:</Title>
			<div className="flex flex-col gap-16d items-start">
				<div className="flex flex-col gap-12d">
					<Title size={4}>Type</Title>
					<div className="grid grid-cols-[repeat(2,max-content)] gap-16d items-center">
						<Slider defaultValue={50} /> Single
						<Slider defaultValue={[25, 75]} /> Range
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>Size</Title>
					<div className="grid grid-cols-[repeat(2,max-content)] gap-16d items-center">
						<Slider defaultValue={50} size={"xs"} /> XS - Extra Small
						<Slider defaultValue={50} size={"s"} /> S - Small
						<Slider defaultValue={50} size={"m"} /> M - Medium
						<Slider defaultValue={50} size={"l"} /> L - Large
						<Slider defaultValue={50} size={"xl"} /> XL - Extra Large
					</div>
				</div>
				<div className="flex flex-col gap-12d w-full">
					<Title size={4}>Width</Title>
					<div className="flex flex-col gap-16d w-full">
						<div className="flex items-center gap-12d">
							<Slider defaultValue={50} width={"narrow"} /> Narrow
						</div>
						<div className="flex items-center gap-12d">
							<Slider defaultValue={50} width={"normal"} /> Normal
						</div>
						<div className="flex items-center gap-12d">
							<Slider defaultValue={50} width={"wide"} /> Wide
						</div>
						<div>
							Fill
							<div className="flex items-center gap-12d">
								<Slider defaultValue={50} width={"fill"} />
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>Shape</Title>
					<div className="grid grid-cols-[repeat(2,max-content)] gap-16d items-center">
						<Slider defaultValue={50} shape={"square"} /> Square
						<Slider defaultValue={50} shape={"rounded"} /> Rounded
						<Slider defaultValue={50} shape={"circular"} /> L - Large
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>Status</Title>
					<div className="grid grid-cols-[repeat(2,max-content)] gap-16d items-center">
						<Slider defaultValue={50} status={"valid"} /> Valid
						<Slider defaultValue={50} status={"warning"} /> Warning
						<Slider defaultValue={50} status={"invalid"} /> Invalid
					</div>
				</div>
				<div className="flex flex-col gap-12d">
					<Title size={4}>State</Title>
					<div className="grid grid-cols-[repeat(2,max-content)] gap-16d items-center">
						<Slider defaultValue={50} disabled /> Disabled
						<Slider defaultValue={50} loading /> Loading
						<Slider defaultValue={50} disabled loading /> Disabled & Loading
					</div>
				</div>
			</div>
		</div>
	);
}
