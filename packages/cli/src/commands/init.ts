import { installDepsIfMissing } from "./registry/deps.js";

const DEV_DEPS = ['unocss', '@unocss/postcss', '@unocss/preset-wind4'];
const DEPS = ['@base-ui/react'];

// TODO add default unocss config installation in init command

export const init = async () => {
	await installDepsIfMissing(DEPS);
	await installDepsIfMissing(DEV_DEPS, true);
}