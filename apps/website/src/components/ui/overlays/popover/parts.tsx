import { Popover as BasePopover } from "@base-ui/react/popover";
import { cva, type VariantProps } from "class-variance-authority";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import type { CompoundProps } from "../../types";
import { Variants } from "../../variants";

//TODO try use corner-shape
const popupVariants = cva(
	"origin-[var(--transform-origin)] transition-all duration-500 transition-[transform,scale,opacity] data-[ending-style=true]:scale-90 data-[ending-style=true]:opacity-0 data-[starting-style=true]:scale-90 data-[starting-style=true]:opacity-0 outline-none sfc-px-.63 sfc-py-.08",
	{
		variants: {
			solid: {
				true: "sfc-solid",
				false: "sfc-outlined",
			},
			outlined: {
				true: "sfc-border",
			},
			shape: {
				rounded: "sfc-rounded",
				square: "rounded-none",
				circular: "rounded-full",
			},
			flat: {
				false: "drop-shadow rel-elevation-10",
			},
		},
		defaultVariants: {
			shape: "rounded",
			flat: false,
			solid: false,
			outlined: false,
		},
	},
);

const arrowVariants = cva(
	"relative before:absolute before:w-15d before:h-px before:bg-[var(--bg-color)] before:content-[''] before:top-[4.7px] before:left-[-2px]",
	{
		variants: {
			side: {
				top: "rotate-180 -bottom-[calc(3.76px+var(--flat-d,0px))]",
				right: "-rotate-90 -left-[calc(3.76px+var(--flat-d,0px))]",
				left: "rotate-90 -right-[calc(3.76px+var(--flat-d,0px))]",
				bottom: "-top-[calc(3.76px+var(--flat-d,0px))]",
			},
			flat: {
				false: "[--flat-d:1px]",
			},
		},
		defaultVariants: {
			side: "top",
			flat: false,
		},
	},
);

type PopupVariants = VariantProps<typeof popupVariants>;
type ArrowVariants = VariantProps<typeof arrowVariants>;
type PopupProps = Pick<
	BasePopover.Popup.Props,
	"initialFocus" | "finalFocus" | "render" | "children"
>;

export namespace Portal {
	export type Variants = FlattenIntersection<
		PopupVariants &
			ArrowVariants &
			PopupProps &
			Variants.EmphasisSurface &
			Variants.IntentSurface &
			Variants.Size
	>;
	export type Props = FlattenIntersection<
		Variants & Omit<BasePopover.Positioner.Props, "className"> & CompoundProps
	>;
}
export namespace Root {
	export type Props = BasePopover.Root.Props;
}

export const Root = (props: Root.Props) => <BasePopover.Root {...props} />;

const Arrow = (p: { outlined?: boolean | null }) => (
	<div
		className={cn(
			"w-13d h-13d rotate-45 bg-[var(--bg-color)]",
			p.outlined && "sfc-border",
		)}
		style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
	/>
);

// TODO рефактор заголовка и описания как функций от вариантов
export const Title = BasePopover.Title;
export const Description = BasePopover.Description;

export namespace Trigger {
	export type Props = BasePopover.Trigger.Props;
}

export const Trigger = (props: Trigger.Props) => (
	<BasePopover.Trigger
		nativeButton={false}
		render={<span tabIndex={-1} />}
		{...props}
		className={cn(
			"flex items-center justify-center leading-none",
			props.className,
		)}
	/>
);

export const Portal = ({
	children,
	alignOffset,
	finalFocus,
	initialFocus,
	render,
	className,
	...props
}: Portal.Props) => (
	<BasePopover.Portal className={className}>
		<BasePopover.Positioner
			sideOffset={props.sideOffset ?? 8}
			side={props.side ?? "top"}
			alignOffset={alignOffset}
		>
			<BasePopover.Popup
				className={cn(
					popupVariants(props),
					Variants.emphasisSurfaceVariants(props),
					Variants.intentSurfaceVariants(props),
					Variants.fontSizeVariants(props),
					Variants.mediumFontVariants(props),
					props.intent && "sfc-intent-selection",
				)}
				finalFocus={finalFocus}
				initialFocus={initialFocus}
			>
				<BasePopover.Arrow className={arrowVariants(props)}>
					<Arrow outlined={props.outlined} />
				</BasePopover.Arrow>
				{children}
			</BasePopover.Popup>
		</BasePopover.Positioner>
	</BasePopover.Portal>
);
