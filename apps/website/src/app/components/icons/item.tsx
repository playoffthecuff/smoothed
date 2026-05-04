"use client";

import type { ReactNode } from "react";
import { CopyButton } from "@/components/buttons/copy";
import { Popover } from "@/components/ui/overlays/popover";
import { T } from "@/components/ui/typography";

export const IconWrapper = ({
	children,
	code,
	title,
	description,
}: {
	children: ReactNode;
	code: string;
	title: string;
	description: string;
}) => (
	<Popover.Root>
		<Popover.Trigger>{children}</Popover.Trigger>
		<Popover.Portal>
			<T.Title>{title}</T.Title>
			<div>
				<div className="flex items-center justify-between">
					<p>{description}</p>
					<CopyButton onClick={() => navigator.clipboard.writeText(code)} />
				</div>
				<code className="font-mono block surface-2 px-12d py-4d rounded-6d">
					{code}
				</code>
			</div>
		</Popover.Portal>
	</Popover.Root>
);
