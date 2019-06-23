import maybeBoolean from './maybe-boolean'

describe('maybe-boolean', () => {
  const T = ({ value, isCorrect }: any) => (isCorrect ? value : true)

  it('should return the same value when value has correct type', () => {
    expect(maybeBoolean(T)(true).value).toBe(true)
    expect(maybeBoolean(T)(false).value).toBe(false)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeBoolean(T)('').value).toBe(true)
    expect(maybeBoolean(T)(null).value).toBe(true)
    expect(maybeBoolean(T)(undefined).value).toBe(true)
    expect(maybeBoolean(T)([]).value).toBe(true)
    expect(maybeBoolean(T)({}).value).toBe(true)
    expect(maybeBoolean(T)(Symbol(0)).value).toBe(true)
    expect(maybeBoolean(T)(() => {}).value).toBe(true)
  })
})
