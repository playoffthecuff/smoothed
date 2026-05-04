"use client";

import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/triggers/toggle";
import { MoonIcon } from "../../ui/icons/moon";
import { SunIcon } from "../../ui/icons/sun";

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	return (
		<Toggle
			pressed={theme === "light"}
			emphasis={"low"}
			onPressedChange={(v) => setTheme(v ? "light" : "dark")}
			shape={"circular"}
			intent={"neutral"}
		>
			{theme === "light" ? <SunIcon /> : <MoonIcon />}
		</Toggle>
	);
}
