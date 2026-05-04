type WidthVariants = "fit" | "narrow" | "normal" | "wide" | "fill";

export type InputWidth = {
	width?: Exclude<WidthVariants, "fit"> | null;
};
