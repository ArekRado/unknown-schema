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

const invalidProperty = (schema, parentName) =>
  `Invalid property type "${parentName.join('.')}". Expected ${getTypeName(
    schema.value,
  )} but received ${getTypeName(schema.rawValue)}`

const parseArrayToReport = (schema: any, parentName: any) => {
  if (!isArray(schema.rawValue)) {
    return [invalidVariable(schema)]
  }

  return schema.parseStatus.map((value: any, i: any) => {
    if (value.parseStatus) {
      return Object.getOwnPropertyNames(value.parseStatus).map(key =>
        collectData(value.parseStatus[key], parentName.concat([i, key])),
      )
    } else {
      return collectData(
        value,
        parentName.concat(i),
      )
    }
  })
}

const parseObjectToReport = (schema: any, parentName: any) => {
  if (!isObject(schema.rawValue)) {
    return [invalidVariable(schema)]
  }

  return Object.getOwnPropertyNames(schema.parseStatus).map(key =>
    collectData(schema.parseStatus[key], parentName.concat(key)),
  )
}

const collectData = (schema: any, parentName: string[]): any => {
  if (schema.isCorrect) {
    return []
  } else {
    if (isArray(schema.value)) {
      return parseArrayToReport(schema, parentName)
    } else if (isObject(schema.value)) {
      return parseObjectToReport(schema, parentName)
    } else {
      return parentName.length > 0
        ? [invalidProperty(schema, parentName)]
        : [invalidVariable(schema)]
    }
  }
}

const reporter = (parseStatus: ParseStatus<any>) => {
  return flatten(collectData(parseStatus, []))
}

export default reporter
