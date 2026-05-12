import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../ui/types";

export function Sandbox({ children, className }: CompoundProps) {
	return (
		<div
			className={cn(
				"max-w-200 min-h-full mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20 sfc-default rel-elevation-5 sfc-shadow",
				className,
			)}
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			{children}
		</div>
	);
}
