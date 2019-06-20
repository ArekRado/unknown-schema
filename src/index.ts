// export type Map<Value> = (params: Value) => Value
// export type Mappable<Value> = (mappable: Map<Value>) => Functor<Value>

// export type Params = {
//   value: unknown
//   isCorrect: boolean
// }

// export type Functor<Value> = {
//   value: Value
//   isCorrect: boolean
//   map: Mappable<Value>
// }

// export const functor = ({
//   value,
//   isCorrect,
// }: Params): Functor<any> => ({
//   value,
//   isCorrect,
//   map: map => functor(map({ value, isCorrect, defaultValue })),
// })

export type Params<Value> = {
  value: Value
  isCorrect: boolean
}

export type Map<Value> = (
  params: Params<unknown>,
) => (params: Value) => Params<Value>

const Mappable = 

export { default as maybeArray } from './maybe-array'
export { default as maybeBoolean } from './maybe-boolean'
export { default as maybeFunction } from './maybe-function'
export { default as maybeNil } from './maybe-nil'
export { default as maybeNumber } from './maybe-number'
export { default as maybeObject } from './maybe-object'
export { default as maybeString } from './maybe-string'
export { default as maybeSymbol } from './maybe-symbol'
