import maybeString from './maybe-string'

describe('maybe-string', () => {
  const emptyString = ({ value, isCorrect }: any) => (isCorrect ? value : '')

  it('should return the same value when value has correct type', () => {
    expect(maybeString(emptyString)('').value).toBe('')
    expect(maybeString(emptyString)('test').value).toBe('test')
    expect(maybeString(emptyString)(String('')).value).toBe(String(''))
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeString(emptyString)(0).value).toBe('')
    expect(maybeString(emptyString)(true).value).toBe('')
    expect(maybeString(emptyString)(false).value).toBe('')
    expect(maybeString(emptyString)(null).value).toBe('')
    expect(maybeString(emptyString)(undefined).value).toBe('')
    expect(maybeString(emptyString)([]).value).toBe('')
    expect(maybeString(emptyString)({}).value).toBe('')
    expect(maybeString(emptyString)(Symbol(0)).value).toBe('')
    expect(maybeString(emptyString)(() => {}).value).toBe('')
  })
})
