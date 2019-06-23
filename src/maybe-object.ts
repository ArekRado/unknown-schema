import { SchemaTest, ObjectParseStatus, ParseStatus } from 'typings'

interface ObjectSchemaTest {
  [key: string]: SchemaTest<any>
}

const maybeObject = <Value>(schemaTest: ObjectSchemaTest) => (
  rawValue: unknown,
): ObjectParseStatus<Value> => {
  const properties = Object.getOwnPropertyNames(schemaTest)

  let isCorrect = true
  let value: any = {}

  const parseStatus = properties.reduce(
    (obj, key) => {
      const parseStatus = schemaTest[key]((rawValue as any)[key])

      if (!parseStatus.isCorrect) {
        isCorrect = false
      }

      value[key] = parseStatus.value
      obj[key] = parseStatus

      return obj
    },
    {} as ParseStatus<Value>,
  )

  return {
    isCorrect,
    parseStatus,
    value,
    rawValue,
  }
}

export default maybeObject
