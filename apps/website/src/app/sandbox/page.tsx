import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Sandbox } from "@/components/sandbox/sandbox";
import { T } from "@/components/ui/typography";

export default function InputPage() {
	return (
		<Sandbox>
			<div className="flex flex-col gap-4 -base-elevation-10 zero-elevation-0">
				<T.Title>BUTTON</T.Title>
				<div className="flex gap-4">
					<ToggleGroup
						defaultValue={["left"]}
						className="flex gap-px rounded-md border border-gray-200 bg-gray-50 p-0.5"
					>
						<Toggle
							aria-label="Align left"
							value="left"
							className="flex size-8 items-center justify-center rounded-xs text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
						>
							L
						</Toggle>
						<Toggle
							aria-label="Align center"
							value="center"
							className="flex size-8 items-center justify-center rounded-xs text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
						>
							C
						</Toggle>
						<Toggle
							aria-label="Align right"
							value="right"
							className="flex size-8 items-center justify-center rounded-xs text-gray-600 select-none hover:bg-gray-100 focus-visible:bg-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900"
						>
							R
						</Toggle>
					</ToggleGroup>
				</div>
			</div>
		</Sandbox>
	);
}
