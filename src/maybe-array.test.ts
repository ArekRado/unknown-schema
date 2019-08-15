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
    expect(maybeArray(maybeNumber(1, zero))([0]).value).toEqual([0])
    expect(maybeArray(maybeBoolean(false, T))([true]).value).toEqual([true])
    expect(maybeArray(maybeString('', emptyString))(['']).value).toEqual([''])
    expect(
      maybeArray(maybeObject({ test: maybeNumber(1, zero) }))([{ test: 0 }])
        .value,
    ).toEqual([{ test: 0 }])
    expect(maybeArray(maybeString('', emptyString))([0]).value).toEqual([''])
    expect(maybeArray(maybeNumber(1, zero))(['']).value).toEqual([0])
    expect(maybeArray(maybeBoolean(false, T))(['']).value).toEqual([true])
    expect(maybeArray(maybeBoolean(false, T))(['', true]).value).toEqual([
      true,
      true,
    ])
  })

  it('should return empty array when value has incorrect type', () => {
    expect(maybeArray(maybeNumber(1, zero))('').value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(0).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(true).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(false).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(null).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(undefined).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))([]).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))({}).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(Symbol(0)).value).toEqual([])
    expect(maybeArray(maybeNumber(1, zero))(() => {}).value).toEqual([])

    expect(
      maybeArray(
        maybeObject({
          num: maybeNumber(0),
          str: maybeString('string'),
        }),
      )(() => {}).value,
    ).toEqual([])

    expect(
      maybeArray(maybeObject({ firstName: maybeString('') }))([
        { firstName: 0 },
      ]).value,
    ).toEqual([{ firstName: '' }])

    expect(
      maybeArray(maybeObject({ firstName: maybeString('') }))([
        { firstName: 0 },
      ]).parseStatus,
    ).toEqual([
      {
        isCorrect: false,
        parseStatus: {
          firstName: { isCorrect: false, rawValue: 0, value: '' },
        },
        rawValue: { firstName: 0 },
        value: { firstName: '' },
      },
    ])
  })
})
