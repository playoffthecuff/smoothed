"use client";

import { useState } from "react";
import { ToggleGroup } from "../ui/triggers/toggle-group";

export function Sandbox({ children }: { children: React.ReactNode }) {
	const [surface, setSurface] = useState("1");
	return (
		<div
			className={`max-w-200 min-h-full mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20 sfc-default rel-elevation-5 sfc-shadow`}
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<ToggleGroup.Root
				className={"fixed top-18 z-1 self-end surface-2 before:border"}
				intent={"accent"}
				emphasis={"low"}
				toggleEffect="background"
				value={[surface]}
				onValueChange={([v]) => {
					console.log(v);
					typeof v === "string" ? setSurface(v) : undefined;
				}}
				shape={"rounded"}
				animated={false}
			>
				{[0, 1, 2].map((v) => (
					<ToggleGroup.Toggle
						value={`${v}`}
						className={"[&>button]:text-foreground-100"}
						key={v}
					>
						{v}
					</ToggleGroup.Toggle>
				))}
			</ToggleGroup.Root>
			{children}
		</div>
	);
}
