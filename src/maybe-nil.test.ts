import maybeNil from './maybe-nil'

describe('maybe-nil', () => {
  const someNull = ({ value, isCorrect }: any) => (isCorrect ? value : null)
  const someUndefined = ({ value, isCorrect }: any) =>
    isCorrect ? value : undefined

  it('should return the same value when value has correct type', () => {
    expect(maybeNil(null)(null).value).toBe(null)
    expect(maybeNil(undefined)(null).value).toBe(null)
    expect(maybeNil(null)(undefined).value).toBe(undefined)
    expect(maybeNil(undefined)(undefined).value).toBe(undefined)

    expect(maybeNil(null, someNull)(null).value).toBe(null)
    expect(maybeNil(null, someUndefined)(null).value).toBe(null)
    expect(maybeNil(null, someNull)(undefined).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)(undefined).value).toBe(undefined)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeNil(null)(0).value).toBe(null)
    expect(maybeNil(null)(true).value).toBe(null)
    expect(maybeNil(null)(false).value).toBe(null)
    expect(maybeNil(null)([]).value).toBe(null)
    expect(maybeNil(null)({}).value).toBe(null)
    expect(maybeNil(null)(Symbol(0)).value).toBe(null)
    expect(maybeNil(null)(() => {}).value).toBe(null)
    expect(maybeNil(undefined)(0).value).toBe(undefined)
    expect(maybeNil(undefined)(true).value).toBe(undefined)
    expect(maybeNil(undefined)(false).value).toBe(undefined)
    expect(maybeNil(undefined)([]).value).toBe(undefined)
    expect(maybeNil(undefined)({}).value).toBe(undefined)
    expect(maybeNil(undefined)(Symbol(0)).value).toBe(undefined)
    expect(maybeNil(undefined)(() => {}).value).toBe(undefined)

    expect(maybeNil(null, someNull)(0).value).toBe(null)
    expect(maybeNil(null, someNull)(true).value).toBe(null)
    expect(maybeNil(null, someNull)(false).value).toBe(null)
    expect(maybeNil(null, someNull)([]).value).toBe(null)
    expect(maybeNil(null, someNull)({}).value).toBe(null)
    expect(maybeNil(null, someNull)(Symbol(0)).value).toBe(null)
    expect(maybeNil(null, someNull)(() => {}).value).toBe(null)
    expect(maybeNil(null, someUndefined)(0).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)(true).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)(false).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)([]).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)({}).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)(Symbol(0)).value).toBe(undefined)
    expect(maybeNil(null, someUndefined)(() => {}).value).toBe(undefined)
  })
})
