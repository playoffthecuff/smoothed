import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import type { FlattenIntersection } from "@/lib/types/helpers";
import { cn } from "@/lib/utils/cn";
import { Variants } from "../../variants";

type Props = {
	children: ReactNode;
} & BaseDialog.Root.Props;
//TODO Add variants, refactor styles
export const Root = ({ children, ...props }: Props) => (
	<BaseDialog.Root {...props}>{children}</BaseDialog.Root>
);

export const Trigger = ({ children, ...props }: BaseDialog.Trigger.Props) => (
	<BaseDialog.Trigger
		{...props}
		className="flex items-center justify-center surface-secondary-outline"
		nativeButton={false}
		render={
			<span className="data-[popup-open]:pointer-events-none" tabIndex={-1}>
				{children}
			</span>
		}
	/>
);

export const Close = BaseDialog.Close;
export const Description = BaseDialog.Description;
export const Title = BaseDialog.Title;
export const Header = ({ children }: { children: ReactNode }) => (
	<div className="flex gap-16d justify-between">{children}</div>
);

export const popupVariants = cva(
	"fixed top-1/2 left-1/2 -mt-12d max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-12d shadow-lifted-4 transition-all data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 overflow-hidden outline-none [--padding:1em]",
	{
		variants: {
			solid: {
				true: "sfc-solid",
				false: "bg-background-1000d  dark:bg-foreground-0d",
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
				false: "sfc-shadow",
			},
		},
		compoundVariants: [
			{ outlined: true, solid: false, className: "sfc-outlined" },
		],
		defaultVariants: {
			shape: "rounded",
			flat: false,
			solid: false,
			outlined: true,
		},
	},
);

type PopupVariants = VariantProps<typeof popupVariants>;

export type DialogPortalProps = FlattenIntersection<
	PopupVariants &
		Variants.EmphasisSurface &
		Variants.IntentSurface &
		Variants.Size &
		Pick<
			BaseDialog.Popup.Props,
			"initialFocus" | "finalFocus" | "render" | "children" | "className"
		>
>;

export const Portal = ({
	className,
	initialFocus,
	finalFocus,
	render,
	children,
	...props
}: DialogPortalProps) => (
	<BaseDialog.Portal>
		<BaseDialog.Backdrop className="fixed inset-0 min-h-dvh bg-foreground-200d opacity-30 transition-all data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
		<BaseDialog.Popup
			className={cn(
				popupVariants(props),
				Variants.emphasisSurfaceVariants(props),
				Variants.intentSurfaceVariants(props),
				Variants.fontSizeVariants(props),
				Variants.mediumFontVariants(props),
				props.intent && "sfc-intent-selection",
				className,
			)}
			initialFocus={initialFocus}
			finalFocus={finalFocus}
			render={render}
		>
			{children}
		</BaseDialog.Popup>
	</BaseDialog.Portal>
);
