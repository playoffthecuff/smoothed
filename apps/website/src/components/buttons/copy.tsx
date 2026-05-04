"use client";

import { useRef, useState } from "react";
import { CopyIcon } from "@/components/ui/icons/copy";
import { cn } from "@/lib/utils/cn";
import { Button } from "../ui/triggers/button";

interface Props {
	className?: string;
	animationTimeout?: number;
	onClick: () => void;
}

export function CopyButton({
	className,
	animationTimeout = 2000,
	onClick,
}: Props) {
	const [copied, setCopied] = useState(false);
	const timerIdRef = useRef<NodeJS.Timeout>(null);
	return (
		<Button
			solid={false}
			flat
			className={cn(
				className,
				copied && "pointer-events-none",
				"[&>button]:p-0",
			)}
			onClick={() => {
				setCopied(true);
				if (timerIdRef.current) clearTimeout(timerIdRef.current);
				timerIdRef.current = setTimeout(
					() => setCopied(false),
					animationTimeout,
				);
				onClick();
			}}
		>
			<CopyIcon copied={copied} />
		</Button>
	);
}
