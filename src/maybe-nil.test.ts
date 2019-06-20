import maybeNil from './maybe-nil'

describe('maybe-nil', () => {
  const someNull = ({ value, isCorrect }: any) => (isCorrect ? value : null)
  const someUndefined = ({ value, isCorrect }: any) =>
    isCorrect ? value : undefined

  it('should return the same value when value has correct type', () => {
    expect(maybeNil(someNull)(null)).toBe(null)
    expect(maybeNil(someUndefined)(null)).toBe(null)
    expect(maybeNil(someNull)(undefined)).toBe(undefined)
    expect(maybeNil(someUndefined)(undefined)).toBe(undefined)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeNil(someNull)(0)).toBe(null)
    expect(maybeNil(someNull)(true)).toBe(null)
    expect(maybeNil(someNull)(false)).toBe(null)
    expect(maybeNil(someNull)([])).toBe(null)
    expect(maybeNil(someNull)({})).toBe(null)
    expect(maybeNil(someNull)(Symbol(0))).toBe(null)
    expect(maybeNil(someNull)(() => {})).toBe(null)
    expect(maybeNil(someUndefined)(0)).toBe(undefined)
    expect(maybeNil(someUndefined)(true)).toBe(undefined)
    expect(maybeNil(someUndefined)(false)).toBe(undefined)
    expect(maybeNil(someUndefined)([])).toBe(undefined)
    expect(maybeNil(someUndefined)({})).toBe(undefined)
    expect(maybeNil(someUndefined)(Symbol(0))).toBe(undefined)
    expect(maybeNil(someUndefined)(() => {})).toBe(undefined)
  })
})
