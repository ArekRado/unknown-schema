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
    expect(maybeObject({})({}).value).toEqual({})
    expect(maybeObject({})('').value).toEqual({})
    expect(maybeObject({})(0).value).toEqual({})
    expect(maybeObject({})(true).value).toEqual({})
    expect(maybeObject({})([]).value).toEqual({})

    expect(maybeObject({})({ test: '', testObj: { test: '' } }).value).toEqual(
      {},
    )

    expect(
      maybeObject({ test: someString('test') })({
        test: 'test',
      }).value,
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
      }).value,
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
      }).value,
    ).toEqual({
      objectTest: { objectTest: { objectTest: { objectTest: {} } } },
    })
  })
})
