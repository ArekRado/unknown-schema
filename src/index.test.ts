import {
  maybeArray,
  maybeBoolean,
  maybeFunction,
  maybeNil,
  maybeNumber,
  maybeObject,
  maybeString,
  maybeSymbol,
} from './index'

describe('index', () => {
  it('should return empty array when value has incorrect type', () => {
    expect(maybeArray).toBeDefined()
    expect(maybeBoolean).toBeDefined()
    expect(maybeFunction).toBeDefined()
    expect(maybeNil).toBeDefined()
    expect(maybeNumber).toBeDefined()
    expect(maybeObject).toBeDefined()
    expect(maybeString).toBeDefined()
    expect(maybeSymbol).toBeDefined()
  })
})
