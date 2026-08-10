// https://medium.com/@maciej.osytek/typescript-nominal-typing-and-branded-types-38ec8160f7b4
export type Brand<K, T extends string> = K & { readonly __brand: T };

