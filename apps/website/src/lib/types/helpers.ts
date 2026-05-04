/** biome-ignore-all lint/suspicious/noExplicitAny: 'lib' */

export type RequiredField<
	T extends Record<string, any>,
	K extends keyof T,
> = Omit<T, K> & Required<Pick<T, K>>;
export type SwapField<T extends Record<string, any>, K extends keyof T, S> = {
	[P in keyof T]: P extends K ? S : T[P];
};
export type SwapToRequiredField<
	T extends Record<string, any>,
	K extends keyof T,
	S,
> = Omit<T, K> & Required<{ [P in K]: S }>;

/**
 * Replace the key type in the interface with a new type
 * @template I - input Interface
 * @template K - replaced key
 * @template T - new type
 */
export type ReplaceKey<I, K extends keyof I, T> = {
	[P in keyof I]: P extends K ? T : I[P];
};

/**
 * Transform Union to Intersection
 * @template U - input union
 * @example UnionToIntersection<A | B | C> => A & B & C
 */
export type UnionToIntersection<U> = (
	U extends any
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

/**
 * Return last item of union
 * @template U - input union
 * @example LastOf<A | B | C> => C
 */
export type LastOf<U> =
	UnionToIntersection<U extends any ? (x: U) => void : never> extends (
		x: infer L,
	) => void
		? L
		: never;

/**
 * Transform union into tuple
 * @template U - input union
 * @template T - inner tuple
 * @example UnionToTuple<A | B | C> => [A | B | C]
 */
export type UnionToTuple<U, T extends any[] = []> = [U] extends [never]
	? T
	: UnionToTuple<Exclude<U, LastOf<U>>, [LastOf<U>, ...T]>;

/**
 * Transform unions record into tuples record
 * @template T - input Record of unions
 */
export type UnionsRecordIntoTuplesRecord<T> = {
	[P in keyof T]: UnionToTuple<Exclude<T[P], null | undefined>>;
};

export type LastWinIntersection<A extends object, B extends object> = Omit<
	A,
	keyof B
> &
	B;

/**
 * Create flat record from intersection (A & B & ... & n => {...A, ...B, ...n})
 */
export type FlattenIntersection<T> = { [P in keyof T]: T[P] };

/**
 * Merge two records with the priority of the last
 * @template A - first record with low priority
 * @template B - last record with high priority
 */
export type MergeRecords<
	A extends object,
	B extends object,
> = FlattenIntersection<LastWinIntersection<A, B>>;

type AssignableKeys<A, B> = {
	[P in Extract<keyof A, keyof B>]: A[P] extends B[P]
		? B[P] extends A[P]
			? P
			: never
		: never;
}[Extract<keyof A, keyof B>];

/**
 * Create record from two records with common assignable props
 * @template A - first record
 * @template B - second record
 */
export type AssignableProps<A, B> = Pick<A, AssignableKeys<A, B>>;
