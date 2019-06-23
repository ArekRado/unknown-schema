import { SchemaTest, ArrayParseStatus } from './typings'

const maybeArray = <Value>(schemaTest: SchemaTest<Value>) => (
  rawValue: unknown,
): ArrayParseStatus<Value> => {
  if (!Array.isArray(rawValue))
    return {
      isCorrect: false,
      parseStatus: [],
      value: ([] as any) as Value[],
      rawValue,
    }

  let isCorrect = true
  let value: Value[] = []

  const parseStatus = rawValue.map((val, index) => {
    const parseStatus = schemaTest(val)

    if (!parseStatus.isCorrect) {
      isCorrect = false
    }

    value.push(parseStatus.value)

    return parseStatus
  })

  return {
    isCorrect,
    parseStatus,
    value,
    rawValue,
  }
}

export default maybeArray
