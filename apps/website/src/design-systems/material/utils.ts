/** biome-ignore-all lint/suspicious/noExplicitAny: "lib" */
export const calcSize = (value: string | number, factor = 1) =>
	Math.round(100 * factor * 2 ** (0.25 * +value)) / 100;

export const logger = (fn: (...p: any[]) => any, ...p: any[]) => {
	console.log(`🚀 ~ logger ~ ${fn.name} from ${p}:`, fn(...p));
	return fn(...p);
};
