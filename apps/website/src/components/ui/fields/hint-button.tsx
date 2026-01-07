import { cva } from "class-variance-authority";
import { Button } from "../button/button";
import { InfoIcon } from "../icons/info";
import { Popover, type PopoverProps } from "../popover/popover";

const hintButtonVariants = cva("[&&]-cursor-help", {
	variants: {
		size: {
			s: "text-3d p-6d",
			m: "text-4d p-7d",
			l: "text-5d p-8d",
		},
	},
	defaultVariants: {
		size: "m",
	},
});

type Props = Omit<PopoverProps, "children">;

export function HintButton({ size, ...props }: Props) {
	return (
		<Popover {...props} size={size}>
			<Button
				shape={"circular"}
				size="fit"
				width={"narrow"}
				animated={false}
				intent={"primary"}
				appearance={"ghost"}
				className={hintButtonVariants({ size })}
			>
				<InfoIcon fill={"currentColor"} size="1em" className="fill-primary-d" />
			</Button>
		</Popover>
	);
}
