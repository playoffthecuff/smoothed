import { Popover as BasePopover } from "../../overlays/popover";
import type { CompoundProps } from "../../types";

export const Popover = ({
	children,
	className,
	...props
}: BasePopover.Root.Props & CompoundProps) => {
	return (
		<BasePopover.Root {...props}>
			<BasePopover.Trigger className={className}>
				{children}
			</BasePopover.Trigger>
		</BasePopover.Root>
	);
};
