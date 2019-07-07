import maybeBoolean from './maybe-boolean'

describe('maybe-boolean', () => {
  const T = ({ value, isCorrect }: any) => (isCorrect ? value : true)

  it('should return the same value when value has correct type', () => {
    expect(maybeBoolean(true)(true).value).toBe(true)
    expect(maybeBoolean(true)(false).value).toBe(false)

    expect(maybeBoolean(true, T)(true).value).toBe(true)
    expect(maybeBoolean(true, T)(false).value).toBe(false)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeBoolean(true)('').value).toBe(true)
    expect(maybeBoolean(true)(null).value).toBe(true)
    expect(maybeBoolean(true)(undefined).value).toBe(true)
    expect(maybeBoolean(true)([]).value).toBe(true)
    expect(maybeBoolean(true)({}).value).toBe(true)
    expect(maybeBoolean(true)(Symbol(0)).value).toBe(true)
    expect(maybeBoolean(true)(() => {}).value).toBe(true)

    expect(maybeBoolean(true, T)('').value).toBe(true)
    expect(maybeBoolean(true, T)(null).value).toBe(true)
    expect(maybeBoolean(true, T)(undefined).value).toBe(true)
    expect(maybeBoolean(true, T)([]).value).toBe(true)
    expect(maybeBoolean(true, T)({}).value).toBe(true)
    expect(maybeBoolean(true, T)(Symbol(0)).value).toBe(true)
    expect(maybeBoolean(true, T)(() => {}).value).toBe(true)
  })
})
