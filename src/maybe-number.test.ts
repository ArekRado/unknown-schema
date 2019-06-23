import maybeNumber from './maybe-number'

describe('maybe-number', () => {
  const zero = ({ value, isCorrect }: any) => (isCorrect ? value : 0)

  it('should return the same value when value has correct type', () => {
    expect(maybeNumber(zero)(-1).value).toBe(-1)
    expect(maybeNumber(zero)(0).value).toBe(0)
    expect(maybeNumber(zero)(1).value).toBe(1)
    expect(maybeNumber(zero)(2).value).toBe(2)
    expect(maybeNumber(zero)(12.3).value).toBe(12.3)
    expect(maybeNumber(zero)(12.0).value).toBe(12.0)
    expect(maybeNumber(zero)(123e-1).value).toBe(123e-1)
    expect(maybeNumber(zero)(0x11).value).toBe(0x11)
    expect(maybeNumber(zero)(0b11).value).toBe(0b11)
    expect(maybeNumber(zero)(0o11).value).toBe(0o11)
    expect(maybeNumber(zero)(NaN).value).toBe(NaN)
    expect(maybeNumber(zero)(Number()).value).toBe(Number())
    expect(maybeNumber(zero)(Number.MAX_SAFE_INTEGER).value).toBe(
      Number.MAX_SAFE_INTEGER,
    )
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeNumber(zero)(false).value).toBe(0)
    expect(maybeNumber(zero)(true).value).toBe(0)
    expect(maybeNumber(zero)('').value).toBe(0)
    expect(maybeNumber(zero)(null).value).toBe(0)
    expect(maybeNumber(zero)(undefined).value).toBe(0)
    expect(maybeNumber(zero)([]).value).toBe(0)
    expect(maybeNumber(zero)({}).value).toBe(0)
    expect(maybeNumber(zero)(Symbol(0)).value).toBe(0)
    expect(maybeNumber(zero)(() => {}).value).toBe(0)
  })
})
