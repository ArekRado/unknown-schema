import maybeNil from './maybe-nil'

describe('maybe-nil', () => {
  const someNull = ({ value, isCorrect }: any) => (isCorrect ? value : null)
  const someUndefined = ({ value, isCorrect }: any) =>
    isCorrect ? value : undefined

  it('should return the same value when value has correct type', () => {
    expect(maybeNil(someNull)(null).value).toBe(null)
    expect(maybeNil(someUndefined)(null).value).toBe(null)
    expect(maybeNil(someNull)(undefined).value).toBe(undefined)
    expect(maybeNil(someUndefined)(undefined).value).toBe(undefined)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeNil(someNull)(0).value).toBe(null)
    expect(maybeNil(someNull)(true).value).toBe(null)
    expect(maybeNil(someNull)(false).value).toBe(null)
    expect(maybeNil(someNull)([]).value).toBe(null)
    expect(maybeNil(someNull)({}).value).toBe(null)
    expect(maybeNil(someNull)(Symbol(0)).value).toBe(null)
    expect(maybeNil(someNull)(() => {}).value).toBe(null)
    expect(maybeNil(someUndefined)(0).value).toBe(undefined)
    expect(maybeNil(someUndefined)(true).value).toBe(undefined)
    expect(maybeNil(someUndefined)(false).value).toBe(undefined)
    expect(maybeNil(someUndefined)([]).value).toBe(undefined)
    expect(maybeNil(someUndefined)({}).value).toBe(undefined)
    expect(maybeNil(someUndefined)(Symbol(0)).value).toBe(undefined)
    expect(maybeNil(someUndefined)(() => {}).value).toBe(undefined)
  })
})
