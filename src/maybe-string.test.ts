import maybeString from './maybe-string'

describe('maybe-string', () => {
  const emptyString = ({ value, isCorrect }: any) => (isCorrect ? value : '')

  it('should return the same value when value has correct type', () => {
    expect(maybeString('')('').value).toBe('')
    expect(maybeString('')('test').value).toBe('test')
    expect(maybeString('')(String('')).value).toBe(String(''))

    expect(maybeString('null', emptyString)('').value).toBe('')
    expect(maybeString('null', emptyString)('test').value).toBe('test')
    expect(maybeString('null', emptyString)(String('')).value).toBe(String(''))
  })

  it('should return default value when value has incorrect type', () => {
    expect(maybeString('')(0).value).toBe('')
    expect(maybeString('')(true).value).toBe('')
    expect(maybeString('')(false).value).toBe('')
    expect(maybeString('')(null).value).toBe('')
    expect(maybeString('')(undefined).value).toBe('')
    expect(maybeString('')([]).value).toBe('')
    expect(maybeString('')({}).value).toBe('')
    expect(maybeString('')(Symbol(0)).value).toBe('')
    expect(maybeString('')(() => {}).value).toBe('')

    expect(maybeString('null', emptyString)(0).value).toBe('')
    expect(maybeString('null', emptyString)(true).value).toBe('')
    expect(maybeString('null', emptyString)(false).value).toBe('')
    expect(maybeString('null', emptyString)(null).value).toBe('')
    expect(maybeString('null', emptyString)(undefined).value).toBe('')
    expect(maybeString('null', emptyString)([]).value).toBe('')
    expect(maybeString('null', emptyString)({}).value).toBe('')
    expect(maybeString('null', emptyString)(Symbol(0)).value).toBe('')
    expect(maybeString('null', emptyString)(() => {}).value).toBe('')
  })
})
