export const stripPrefix = (str: string, prefix: string) =>
	str.startsWith(prefix) ? str.slice(prefix.length) : str;

export const stripAnyOfPrefixes = (str: string, prefixes: string[]) =>
	((prefix?: string) => (prefix ? stripPrefix(str, prefix) : str))(
		prefixes.find((v) => str.startsWith(v)),
	);

export const capitalize = (s: string) =>
	s ? s[0].toUpperCase() + s.slice(1) : s;
