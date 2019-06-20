import maybeNumber from './maybe-number'

describe('maybe-number', () => {
  const zero = ({ value, isCorrect }: any) => (isCorrect ? value : 0)

  it('should return the same value when value has correct type', () => {
    expect(maybeNumber(zero)(-1)).toBe(-1)
    expect(maybeNumber(zero)(0)).toBe(0)
    expect(maybeNumber(zero)(1)).toBe(1)
    expect(maybeNumber(zero)(2)).toBe(2)
    expect(maybeNumber(zero)(12.3)).toBe(12.3)
    expect(maybeNumber(zero)(12.0)).toBe(12.0)
    expect(maybeNumber(zero)(123e-1)).toBe(123e-1)
    expect(maybeNumber(zero)(0x11)).toBe(0x11)
    expect(maybeNumber(zero)(0b11)).toBe(0b11)
    expect(maybeNumber(zero)(0o11)).toBe(0o11)
    expect(maybeNumber(zero)(NaN)).toBe(NaN)
    expect(maybeNumber(zero)(Number())).toBe(Number())
    expect(maybeNumber(zero)(Number.MAX_SAFE_INTEGER)).toBe(
      Number.MAX_SAFE_INTEGER,
    )
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeNumber(zero)(false)).toBe(0)
    expect(maybeNumber(zero)(true)).toBe(0)
    expect(maybeNumber(zero)('')).toBe(0)
    expect(maybeNumber(zero)(null)).toBe(0)
    expect(maybeNumber(zero)(undefined)).toBe(0)
    expect(maybeNumber(zero)([])).toBe(0)
    expect(maybeNumber(zero)({})).toBe(0)
    expect(maybeNumber(zero)(Symbol(0))).toBe(0)
    expect(maybeNumber(zero)(() => {})).toBe(0)
  })
})
