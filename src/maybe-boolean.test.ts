import maybeBoolean from './maybe-boolean'

describe('maybe-boolean', () => {
  const T = ({ value, isCorrect }: any) => (isCorrect ? value : true)

  it('should return the same value when value has correct type', () => {
    expect(maybeBoolean(T)(true)).toBe(true)
    expect(maybeBoolean(T)(false)).toBe(false)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeBoolean(T)('')).toBe(true)
    expect(maybeBoolean(T)(null)).toBe(true)
    expect(maybeBoolean(T)(undefined)).toBe(true)
    expect(maybeBoolean(T)([])).toBe(true)
    expect(maybeBoolean(T)({})).toBe(true)
    expect(maybeBoolean(T)(Symbol(0))).toBe(true)
    expect(maybeBoolean(T)(() => {})).toBe(true)
  })
})
