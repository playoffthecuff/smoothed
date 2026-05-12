import { Sandbox } from "@/components/sandbox/sandbox";
import { HighlightedCode } from "@/components/ui/highlighted-code";
import { Link } from "@/components/ui/navigation/next-link";
import { T } from "@/components/ui/typography";

export default function Page() {
	return (
		<Sandbox>
			<T.Title>Get Started</T.Title>
			<div>
				<p>Install the necessary dependencies by running:</p>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest init"
					language="yaml"
					lineNumbers={false}
				/>
			</div>

			<div>
				<p>
					Follow the Uno CSS integration{" "}
					<a
						href="https://unocss.dev/integrations/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-accent-ia underline visited:text-visited-ia w-fit"
					>
						instructions
					</a>
				</p>
			</div>
			<div>
				<p>
					Configure <code className="bg px-8d">tsconfig.json</code>:
				</p>
				<HighlightedCode
					code={`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
					language="json"
				/>
			</div>
			<div>
				<p>
					You can <Link href="theme-editor">customize the theme</Link>
					{". "}
					Then replace the contents of the default configuration file{" "}
					<code className="bg px-8d">uno.config.ts</code>
				</p>
			</div>
		</Sandbox>
	);
}
