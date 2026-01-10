import { HighlightedCode } from "@/components/ui/highlighted-code";
import { ErrorIcon } from "@/components/ui/icons/error";
import { HelpIcon } from "@/components/ui/icons/help";
import { InfoIcon } from "@/components/ui/icons/info";
import { SparkleIcon } from "@/components/ui/icons/sparkle";
import { SuccessIcon } from "@/components/ui/icons/success";
import { WarningIcon } from "@/components/ui/icons/warning";
import { IntentMessage } from "@/components/ui/intent-message/intent-message";
import { Title } from "@/components/ui/typography/title";

export default function InputPage() {
	return (
		<div
			className="max-w-200 min-h-full bg-1 mx-auto p-18d flex flex-col gap-16d grow [&&]-pb-20"
			style={{
				width: "clamp(320px, 100%, 800px)",
			}}
		>
			<div>
				<Title>Intent Message</Title>
				<p>Component for displaying messages to the user.</p>
			</div>
			<div>
				<Title size={2}>Installation</Title>
				<HighlightedCode
					code="bunx @playoffthecuff/smoothed@latest add intent-message"
					language="yaml"
					lineNumbers={false}
				/>
			</div>
			<hr className="mt-16d mb-12d" />
			<Title size={2}>Variants:</Title>
			<div className="flex flex-col gap-16d">
				<div className="flex flex-col gap-4d">
					<Title size={3}>Size</Title>
					<IntentMessage size={"s"}>Size S</IntentMessage>
					<IntentMessage size={"m"}>Size M</IntentMessage>
					<IntentMessage size={"l"}>Size L</IntentMessage>
				</div>
				<div className="flex flex-col gap-4d">
					<Title size={3}>Intent</Title>
					<IntentMessage>Secondary Message</IntentMessage>

					<IntentMessage intent="primary">Primary Message</IntentMessage>
					<IntentMessage intent="warning">Warning Message</IntentMessage>

					<IntentMessage intent={"success"}>Success Message</IntentMessage>

					<IntentMessage intent={"error"}>Error Message</IntentMessage>
					<IntentMessage intent={"visited"}>Visited Message</IntentMessage>
				</div>
				<div className="flex flex-col gap-4d">
					<Title size={3}>With custom icon(s)</Title>
					<IntentMessage iconStart={HelpIcon} iconEnd={HelpIcon}>
						Secondary Message
					</IntentMessage>
					<IntentMessage intent="warning" iconStart={WarningIcon}>
						Warning Message
					</IntentMessage>
					<IntentMessage intent={"success"} iconEnd={SuccessIcon}>
						Success Message
					</IntentMessage>
					<IntentMessage
						intent={"error"}
						iconStart={ErrorIcon}
						iconEnd={ErrorIcon}
					>
						Error Message
					</IntentMessage>
					<IntentMessage intent="primary" iconStart={InfoIcon}>
						Primary Message
					</IntentMessage>
					<IntentMessage intent={"visited"} iconEnd={SparkleIcon}>
						Visited Message
					</IntentMessage>
				</div>
			</div>
		</div>
	);
}
