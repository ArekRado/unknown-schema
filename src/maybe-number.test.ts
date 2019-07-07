import maybeNumber from './maybe-number'

describe('maybe-number', () => {
  const zero = ({ value, isCorrect }: any) => (isCorrect ? value : 0)

  it('should return the same value when value has correct type', () => {
    expect(maybeNumber(0)(-1).value).toBe(-1)
    expect(maybeNumber(0)(0).value).toBe(0)
    expect(maybeNumber(0)(1).value).toBe(1)
    expect(maybeNumber(0)(2).value).toBe(2)
    expect(maybeNumber(0)(12.3).value).toBe(12.3)
    expect(maybeNumber(0)(12.0).value).toBe(12.0)
    expect(maybeNumber(0)(123e-1).value).toBe(123e-1)
    expect(maybeNumber(0)(0x11).value).toBe(0x11)
    expect(maybeNumber(0)(0b11).value).toBe(0b11)
    expect(maybeNumber(0)(0o11).value).toBe(0o11)
    expect(maybeNumber(0)(NaN).value).toBe(NaN)
    expect(maybeNumber(0)(Number()).value).toBe(Number())
    expect(maybeNumber(0)(Number.MAX_SAFE_INTEGER).value).toBe(
      Number.MAX_SAFE_INTEGER,
    )

    expect(maybeNumber(1, zero)(-1).value).toBe(-1)
    expect(maybeNumber(1, zero)(0).value).toBe(0)
    expect(maybeNumber(1, zero)(1).value).toBe(1)
    expect(maybeNumber(1, zero)(2).value).toBe(2)
    expect(maybeNumber(1, zero)(12.3).value).toBe(12.3)
    expect(maybeNumber(1, zero)(12.0).value).toBe(12.0)
    expect(maybeNumber(1, zero)(123e-1).value).toBe(123e-1)
    expect(maybeNumber(1, zero)(0x11).value).toBe(0x11)
    expect(maybeNumber(1, zero)(0b11).value).toBe(0b11)
    expect(maybeNumber(1, zero)(0o11).value).toBe(0o11)
    expect(maybeNumber(1, zero)(NaN).value).toBe(NaN)
    expect(maybeNumber(1, zero)(Number()).value).toBe(Number())
    expect(maybeNumber(1, zero)(Number.MAX_SAFE_INTEGER).value).toBe(
      Number.MAX_SAFE_INTEGER,
    )
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeNumber(0)(false).value).toBe(0)
    expect(maybeNumber(0)(true).value).toBe(0)
    expect(maybeNumber(0)('').value).toBe(0)
    expect(maybeNumber(0)(null).value).toBe(0)
    expect(maybeNumber(0)(undefined).value).toBe(0)
    expect(maybeNumber(0)([]).value).toBe(0)
    expect(maybeNumber(0)({}).value).toBe(0)
    expect(maybeNumber(0)(Symbol(0)).value).toBe(0)
    expect(maybeNumber(0)(() => {}).value).toBe(0)

    expect(maybeNumber(1, zero)(false).value).toBe(0)
    expect(maybeNumber(1, zero)(true).value).toBe(0)
    expect(maybeNumber(1, zero)('').value).toBe(0)
    expect(maybeNumber(1, zero)(null).value).toBe(0)
    expect(maybeNumber(1, zero)(undefined).value).toBe(0)
    expect(maybeNumber(1, zero)([]).value).toBe(0)
    expect(maybeNumber(1, zero)({}).value).toBe(0)
    expect(maybeNumber(1, zero)(Symbol(0)).value).toBe(0)
    expect(maybeNumber(1, zero)(() => {}).value).toBe(0)
  })
})
