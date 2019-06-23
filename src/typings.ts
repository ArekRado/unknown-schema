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

export type Map<Value> = (params: Params<unknown>) => Value
export type ParseStatus<Value> = {
  isCorrect: boolean
  value: Value
  rawValue: unknown
}

export type ArrayParseStatus<Value> = {
  parseStatus: ParseStatus<Value>[]
  isCorrect: boolean
  value: Value[]
  rawValue: unknown
}

export type ObjectParseStatus<Value> = {
  parseStatus: ParseStatus<Value>
  isCorrect: boolean
  value: Value
  rawValue: unknown
}

export type SchemaTest<Value> = (value: unknown) => ParseStatus<Value>
export type Validator<Value> = (map: Map<Value>) => SchemaTest<Value>
