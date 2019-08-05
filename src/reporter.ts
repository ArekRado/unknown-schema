import { ParseStatus } from 'typings'

const flatten = (arr1: Array<any>): Array<any> =>
  arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val),
    [],
  )

const isArray = Array.isArray
const isObject = value => value !== null && typeof value === 'object'
const isNil = value => value === null || value === undefined

const getTypeName = value => {
  if (isArray(value)) return 'array'
  if (isObject(value)) return 'object'
  if (isNil(value)) return 'undefined/null'
  return typeof value
}

const invalidVariable = schema =>
  `Invalid variable type. Expected ${getTypeName(
    schema.value,
  )} but received ${getTypeName(schema.rawValue)}`

const invalidProperty = (schema, parentName) => {
  const propertyName = parentName[parentName.length - 1]
  const path = parentName.join('.')

  return `Invalid property type "${propertyName}" located in "${path}". Expected ${getTypeName(
    schema.value,
  )} but received ${getTypeName(schema.rawValue)}`
}

const collectData = (schema: any, parentName: string[]): any => {
  if (schema.isCorrect) {
    return []
  } else {
    if (isArray(schema.value)) {
      // console.log('is array', schema)
      if (!isArray(schema.rawValue)) {
        return [invalidVariable(schema)]
      }

      return schema.parseStatus.map((v: any, i: any) =>
        collectData(v.parseStatus, parentName.concat(`[${i}]`)),
      )
    } else if (isObject(schema.value)) {
      // console.log('is obj', schema)
      if (!isObject(schema.rawValue)) {
        return [invalidVariable(schema)]
      }

      const properties = Object.getOwnPropertyNames(schema.parseStatus)
      return properties.map(key => {
        return collectData(schema.parseStatus[key], parentName.concat(key))
      })
    } else {
      // console.log('is else', schema)

      return parentName.length > 0
        ? [invalidProperty(schema, parentName)]
        : [invalidVariable(schema)]
    }
  }
}

const reporter = (parseStatus: ParseStatus<any>) => {
  // console.log('isCorect', parseStatus.isCorrect)
  // return collectData(parseStatus, '')
  return flatten(collectData(parseStatus, []))
}

export default reporter
