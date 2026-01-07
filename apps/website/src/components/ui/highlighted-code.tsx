"use client";

import { useTheme } from "next-themes";
import { Highlight, type HighlightProps, themes } from "prism-react-renderer";
import { CopyButton } from "./buttons/copy";

export function HighlightedCode({
	code,
	language,
	lineNumbers = true,
}: Omit<HighlightProps, "children"> & { lineNumbers?: boolean }) {
	const { theme } = useTheme();
	return (
		<div className="max-w-full max-h-80 overflow-y-auto rounded-md relative">
			<CopyButton
				className="top-2 right-2"
				animationTimeout={1000}
				onClick={() => navigator.clipboard.writeText(code)}
			/>
			<Highlight
				theme={theme === "dark" ? themes.vsDark : themes.vsLight}
				code={code}
				language={language}
			>
				{({ style, tokens, getLineProps, getTokenProps }) => (
					<pre
						style={style}
						className="px-3 py-4 overflow-x-auto"
					>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								{lineNumbers && (
									<span className="w-9 inline-block opacity-50 select-none border-e mr-3 text-end pe-2">
										{i + 1}
									</span>
								)}
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</div>
	);
}
