export interface SurfaceScGroups {
	color?: string;
	interactive?: string;
	mode?: "light" | "dark";
}
export const surfaceSc = {
	re: /^huy-(?<mode>light|dark)-surface(?:-(?<color>[a-z]+))?(?:-(?<interactive>ia))?$/,
	fn: ({ color, interactive, mode }: SurfaceScGroups) => {
		assertMaybeColor(color);

		const cssVars =
			mode === "dark"
				? uc.emphasis.map((emphasisStr) =>
						getDarkSurfaceBgCssVars(emphasisStr, color, interactive),
					)
				: uc.emphasis
						.flatMap((emphasisStr) =>
							getLightSurfaceBgCssVars(emphasisStr, color, interactive),
						)
						.join(" ");

		const surfaceDelta = uc.lightness.surface.step / 1000;

		return `[--bg-hue:${uc.color[color ?? "foreground"].h}] [--bg-color:oklch(calc(var(--bg-lightness)+var(--surface-level)*${surfaceDelta}*(1-var(--surface-emphasis)))_var(--bg-chroma) var(--bg-hue)_/_var(--surface-opacity, 1))] bg-(--bg-color) ${cssVars}`;
	},
};
