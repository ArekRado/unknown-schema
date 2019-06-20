import maybeNumber from './maybe-number'
import maybeBoolean from './maybe-boolean'
import maybeString from './maybe-string'
import maybeObject from './maybe-object'

describe('maybe-object', () => {
  const correctOrDefault: any = (defaultValue: any) => ({
    value,
    isCorrect,
  }: any) => (isCorrect ? value : defaultValue)

  const someNumber: any = (defaultValue: any) =>
    maybeNumber(correctOrDefault(defaultValue))
  const someString: any = (defaultValue: any) =>
    maybeString(correctOrDefault(defaultValue))
  const someBoolean: any = (defaultValue: any) =>
    maybeBoolean(correctOrDefault(defaultValue))

  it('should always return value with the same type', () => {
    expect(maybeObject({})({})).toEqual({})
    expect(maybeObject({})('')).toEqual({})
    expect(maybeObject({})(0)).toEqual({})
    expect(maybeObject({})(true)).toEqual({})
    expect(maybeObject({})([])).toEqual({})

    expect(maybeObject({})({ test: '', testObj: { test: '' } })).toEqual({})

    expect(
      maybeObject({ test: someString('test') })({
        test: 'test',
      }),
    ).toEqual({ test: 'test' })

    expect(
      maybeObject({
        numberTest: someNumber(1),
        stringTest: someString('stringTest'),
        booleanTest: someBoolean(false),
        objectTest: maybeObject({
          objectTest: maybeObject({
            test: someNumber(1),
          }),
        }),
      })({
        numberTest: 1,
        stringTest: 'stringTest',
        booleanTest: false,
        objectTest: { objectTest: { test: 1 } },
      }),
    ).toEqual({
      numberTest: 1,
      stringTest: 'stringTest',
      booleanTest: false,
      objectTest: { objectTest: { test: 1 } },
    })

    expect(
      maybeObject({
        objectTest: maybeObject({
          objectTest: maybeObject({
            objectTest: maybeObject({
              objectTest: maybeObject({}),
            }),
          }),
        }),
      })({
        objectTest: { objectTest: { objectTest: { objectTest: {} } } },
      }),
    ).toEqual({
      objectTest: { objectTest: { objectTest: { objectTest: {} } } },
    })
  })
})
