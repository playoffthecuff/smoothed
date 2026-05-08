export function Sandbox({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={`max-w-200 min-h-full mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20 sfc-default rel-elevation-5 sfc-shadow`}
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			{children}
		</div>
	);
}
