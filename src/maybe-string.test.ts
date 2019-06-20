import maybeString from './maybe-string'

describe('maybe-string', () => {
  const emptyString = ({ value, isCorrect }: any) => (isCorrect ? value : '')

  it('should return the same value when value has correct type', () => {
    expect(maybeString(emptyString)('')).toBe('')
    expect(maybeString(emptyString)('test')).toBe('test')
    expect(maybeString(emptyString)(String(''))).toBe(String(''))
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeString(emptyString)(0)).toBe('')
    expect(maybeString(emptyString)(true)).toBe('')
    expect(maybeString(emptyString)(false)).toBe('')
    expect(maybeString(emptyString)(null)).toBe('')
    expect(maybeString(emptyString)(undefined)).toBe('')
    expect(maybeString(emptyString)([])).toBe('')
    expect(maybeString(emptyString)({})).toBe('')
    expect(maybeString(emptyString)(Symbol(0))).toBe('')
    expect(maybeString(emptyString)(() => {})).toBe('')
  })
})
