import { defineConfig } from "unocss";
import { options } from "./src/design-systems/material/options";
import material from "./src/design-systems/material/preset";
export default defineConfig({
	presets: [material(options)],
	content: {
		pipeline: {
			exclude: ["src/**/*.{js,ts}"],
		},
	},
});
