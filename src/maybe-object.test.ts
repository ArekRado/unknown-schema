import maybeNumber from './maybe-number'
import maybeBoolean from './maybe-boolean'
import maybeString from './maybe-string'
import maybeObject from './maybe-object'
import maybeArray from './maybe-array'

describe('maybe-object', () => {
  const correctOrDefault: any = (defaultValue: any) => ({
    value,
    isCorrect,
  }: any) => (isCorrect ? value : defaultValue)

  it('should always return value with the same type', () => {
    expect(maybeObject({})({}).value).toEqual({})
    expect(maybeObject({})('').value).toEqual({})
    expect(maybeObject({})(0).value).toEqual({})
    expect(maybeObject({})(true).value).toEqual({})
    expect(maybeObject({})([]).value).toEqual({})
    expect(maybeObject({})(null).value).toEqual({})
    expect(maybeObject({})(undefined).value).toEqual({})

    expect(maybeObject({})({ test: '', testObj: { test: '' } }).value).toEqual(
      {},
    )

    expect(
      maybeObject({ test: maybeString('test') })({
        test: 2,
      }).value,
    ).toEqual({ test: 'test' })

    expect(
      maybeObject({ test: maybeNumber(2) })({
        test: 'test',
      }).value,
    ).toEqual({ test: 2 })

    expect(
      maybeObject({ test: maybeString('test') })({
        test: 'test',
      }).value,
    ).toEqual({ test: 'test' })

    expect(
      maybeObject({
        numberTest: maybeNumber(1),
        stringTest: maybeString('stringTest'),
        booleanTest: maybeBoolean(false),
        objectTest: maybeObject({
          objectTest: maybeObject({
            test: maybeNumber(1),
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

    expect(
      maybeObject({
        someArray: maybeArray(maybeNumber(1)),
      })({
        someArray: ['2', '1', 'asdasd', {}],
      }).value,
    ).toEqual({
      someArray: [1, 1, 1, 1],
    })

    expect(
      maybeObject({
        someArray: maybeArray(maybeNumber(1)),
      })({
        someArray: {},
      }).value,
    ).toEqual({
      someArray: [],
    })

    expect(
      maybeObject({
        someArray: maybeArray(maybeNumber(1)),
      })({
        someArray: 1,
      }).value,
    ).toEqual({
      someArray: [],
    })

    expect(
      maybeObject({
        meta: maybeObject({
          limit: maybeNumber(0),
        }),
      })({
        data: {
          meta: {
            limit: 20,
          },
        },
      }).value,
    ).toEqual({
      meta: {
        limit: 0,
      },
    })
  })
})
