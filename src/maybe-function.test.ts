import maybeFunction from './maybe-function'

describe('maybe-function', () => {
  const F = () => {}
  const Func = ({ value, isCorrect }: any) => (isCorrect ? value : F)

  it('should return the same value when value has correct type', () => {
    expect(maybeFunction(F)(true).value).toBe(F)
    expect(maybeFunction(F)(false).value).toBe(F)

    expect(maybeFunction(F, Func)(true).value).toBe(F)
    expect(maybeFunction(F, Func)(false).value).toBe(F)
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeFunction(F)('').value).toBe(F)
    expect(maybeFunction(F)(null).value).toBe(F)
    expect(maybeFunction(F)(undefined).value).toBe(F)
    expect(maybeFunction(F)([]).value).toBe(F)
    expect(maybeFunction(F)({}).value).toBe(F)
    expect(maybeFunction(F)(Symbol(0)).value).toBe(F)
    expect(maybeFunction(F)(() => {}).value).not.toBe(F)

    expect(maybeFunction(F, Func)('').value).toBe(F)
    expect(maybeFunction(F, Func)(null).value).toBe(F)
    expect(maybeFunction(F, Func)(undefined).value).toBe(F)
    expect(maybeFunction(F, Func)([]).value).toBe(F)
    expect(maybeFunction(F, Func)({}).value).toBe(F)
    expect(maybeFunction(F, Func)(Symbol(0)).value).toBe(F)
    expect(maybeFunction(F, Func)(() => {}).value).not.toBe(F)
  })
})
