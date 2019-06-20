import maybeNumber from './maybe-number'
import maybeBoolean from './maybe-boolean'
import maybeString from './maybe-string'
import maybeObject from './maybe-object'
import maybeArray from './maybe-array'

describe('maybe-array', () => {
  const zero: any = ({ value, isCorrect }: any) => (isCorrect ? value : 0)
  const emptyString: any = ({ value, isCorrect }: any) =>
    isCorrect ? value : ''
  const T: any = ({ value, isCorrect }: any) => (isCorrect ? value : true)

  it('should return the same value when value has correct type', () => {
    expect(maybeArray(maybeNumber(zero))([0])).toEqual([0])
    expect(maybeArray(maybeBoolean(T))([true])).toEqual([true])
    expect(maybeArray(maybeString(emptyString))([''])).toEqual([''])
    expect(
      maybeArray(maybeObject({ test: maybeNumber(zero) }))([{ test: 0 }]),
    ).toEqual([{ test: 0 }])
    expect(maybeArray(maybeString(emptyString))([0])).toEqual([''])
    expect(maybeArray(maybeNumber(zero))([''])).toEqual([0])
    expect(maybeArray(maybeBoolean(T))([''])).toEqual([true])
    expect(maybeArray(maybeBoolean(T))(['', true])).toEqual([true, true])
  })

  it('should return empty array when value has incorrect type', () => {
    expect(maybeArray(maybeNumber(zero))('')).toEqual([])
    expect(maybeArray(maybeNumber(zero))(0)).toEqual([])
    expect(maybeArray(maybeNumber(zero))(true)).toEqual([])
    expect(maybeArray(maybeNumber(zero))(false)).toEqual([])
    expect(maybeArray(maybeNumber(zero))(null)).toEqual([])
    expect(maybeArray(maybeNumber(zero))(undefined)).toEqual([])
    expect(maybeArray(maybeNumber(zero))([])).toEqual([])
    expect(maybeArray(maybeNumber(zero))({})).toEqual([])
    expect(maybeArray(maybeNumber(zero))(Symbol(0))).toEqual([])
    expect(maybeArray(maybeNumber(zero))(() => {})).toEqual([])
  })
})
