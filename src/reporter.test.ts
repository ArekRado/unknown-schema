import maybeNumber from './maybe-number'
import maybeBoolean from './maybe-boolean'
import maybeString from './maybe-string'
import maybeObject from './maybe-object'
import maybeArray from './maybe-array'
import maybeNil from './maybe-nil'
import reporter from './reporter'

describe('reporter', () => {
  // it('should return correct message when schema is correct', () => {
  //   expect(
  //     reporter(
  //       maybeObject({
  //         id: maybeNumber(1),
  //         firstName: maybeString('stringTest'),
  //         isHuman: maybeBoolean(false),
  //         options: maybeObject({
  //           products: maybeObject({
  //             productId: maybeNumber(1),
  //           }),
  //         }),
  //       })({
  //         id: 1,
  //         firstName: 'stringTest',
  //         isHuman: false,
  //         options: { products: { productId: 1 } },
  //       }),
  //     ),
  //   ).toEqual([])
  //   expect(
  //     reporter(
  //       maybeObject({
  //         objectTest: maybeObject({
  //           objectTest: maybeObject({
  //             objectTest: maybeObject({
  //               objectTest: maybeObject({}),
  //             }),
  //           }),
  //         }),
  //       })({
  //         objectTest: { objectTest: { objectTest: { objectTest: {} } } },
  //       }),
  //     ),
  //   ).toEqual([])
  //   expect(
  //     reporter(
  //       maybeObject({
  //         users: maybeArray(
  //           maybeObject({
  //             firstName: maybeString(''),
  //             lastName: maybeString(''),
  //             products: maybeArray(maybeNumber(-1)),
  //           }),
  //         ),
  //         products: maybeArray(
  //           maybeObject({
  //             name: maybeString(''),
  //             price: maybeNumber(0),
  //             id: maybeNumber(-1),
  //           }),
  //         ),
  //       })({
  //         users: [
  //           {
  //             firstName: 'Arek',
  //             lastName: 'Rado',
  //             products: [0, 1, 2],
  //           },
  //           {
  //             firstName: 'Andres',
  //             lastName: 'Wiegand',
  //             products: [3, 4],
  //           },
  //           {
  //             firstName: 'Bernard',
  //             lastName: 'Fisher',
  //             products: [1, 5, 4],
  //           },
  //         ],
  //         products: [
  //           {
  //             name: 'DELUXE COOKED HAM',
  //             price: 76.81,
  //             id: 0,
  //           },
  //           {
  //             name: 'DELUXE LOW-SODIUM COOKED HAM ',
  //             price: 40.72,
  //             id: 1,
  //           },
  //           {
  //             name: 'DELUXE LOW-SODIUM WHOLE HAM',
  //             price: 78.85,
  //             id: 2,
  //           },
  //           {
  //             name: 'SMOKED VIRGINA HAM',
  //             price: 99.96,
  //             id: 3,
  //           },
  //           {
  //             name: 'HONEY MAPLE HAM',
  //             price: 96.92,
  //             id: 4,
  //           },
  //           {
  //             name: 'HONEY MAPLE HAM 1/2',
  //             price: 48.47,
  //             id: 5,
  //           },
  //         ],
  //       }),
  //     ),
  //   ).toEqual([])
  // })

  it('should return correct value', () => {
    expect(reporter(maybeObject({})({}))).toEqual([])

    expect(reporter(maybeNumber(1)('empty'))).toEqual([
      'Invalid variable type. Expected number but received string',
    ])
    expect(reporter(maybeString('-')(1))).toEqual([
      'Invalid variable type. Expected string but received number',
    ])
    expect(reporter(maybeBoolean(true)(123))).toEqual([
      'Invalid variable type. Expected boolean but received number',
    ])
    expect(reporter(maybeNil(null)(4))).toEqual([
      'Invalid variable type. Expected undefined/null but received number',
    ])
    expect(reporter(maybeArray(maybeNumber(1))({}))).toEqual([
      'Invalid variable type. Expected array but received object',
    ])

    expect(
      reporter(
        maybeObject({
          test: maybeBoolean(true),
        })(123),
      ),
    ).toEqual(['Invalid variable type. Expected object but received number'])

    expect(
      reporter(
        maybeObject({
          id: maybeNumber(1),
        })({
          id: 'asd',
        }),
      ),
    ).toEqual([
      'Invalid property type "id". Expected number but received string',
    ])

    expect(
      reporter(
        maybeObject({
          id: maybeNumber(1),
          firstName: maybeString('stringTest'),
          isHuman: maybeBoolean(false),
          options: maybeObject({
            products: maybeObject({
              productId: maybeNumber(1),
            }),
          }),
        })({
          id: 'asd',
          firstName: 90,
          isHuman: false,
          options: { products: { productId: 'xD' } },
        }),
      ),
    ).toEqual([
      'Invalid property type "id". Expected number but received string',
      'Invalid property type "firstName". Expected string but received number',
      'Invalid property type "options.products.productId". Expected number but received string',
    ])

    expect(
      reporter(
        maybeArray(maybeObject({ firstName: maybeString('') }))([
          { firstName: 0 },
        ]),
      ),
    ).toEqual([
      'Invalid property type "0.firstName". Expected string but received number',
    ])

    expect(reporter(maybeArray(maybeString(''))([0]))).toEqual([
      'Invalid property type "0". Expected string but received number',
    ])

    expect(
      reporter(
        maybeObject({
          users: maybeArray(
            maybeObject({
              firstName: maybeString(''),
              lastName: maybeString(''),
              products: maybeArray(maybeNumber(-1)),
            }),
          ),
          products: maybeArray(
            maybeObject({
              name: maybeString(''),
              price: maybeNumber(0),
              id: maybeNumber(-1),
            }),
          ),
        })({
          users: [
            {
              firstName: 0,
              lastName: 'Rado',
              products: 'lorem',
            },
            {
              firstName: 'Andres',
              lastName: 'Wiegand',
              products: [{}, {}],
            },
            {
              firstName: [null],
              lastName: true,
              products: [{}, {}, {}],
            },
          ],
          products: [
            {
              name: 'DELUXE COOKED HAM',
              price: 76.81,
              id: 0,
            },
            {
              name: 'DELUXE LOW-SODIUM COOKED HAM ',
              price: 40.72,
              id: false,
            },
            {
              name: 'DELUXE LOW-SODIUM WHOLE HAM',
              price: '-1',
              id: 2,
            },
            {
              name: 'SMOKED VIRGINA HAM',
              price: 99.96,
              id: 3,
            },
            {
              name: false,
              id: 4,
            },
            {
              name: '-1',
              price: [],
              id: 5,
            },
          ],
        }),
      ),
    ).toEqual([
      'Invalid property type "users.0.firstName". Expected string but received number',
      'Invalid variable type. Expected array but received string',
      'Invalid property type "users.1.products.0". Expected number but received object',
      'Invalid property type "users.1.products.1". Expected number but received object',
      'Invalid property type "users.2.firstName". Expected string but received array',
      'Invalid property type "users.2.lastName". Expected string but received boolean',
      'Invalid property type "users.2.products.0". Expected number but received object',
      'Invalid property type "users.2.products.1". Expected number but received object',
      'Invalid property type "users.2.products.2". Expected number but received object',
      'Invalid property type "products.1.id". Expected number but received boolean',
      'Invalid property type "products.2.price". Expected number but received string',
      'Invalid property type "products.4.name". Expected string but received boolean',
      'Invalid property type "products.4.price". Expected number but received undefined/null',
      'Invalid property type "products.5.price". Expected number but received array',
    ])
  })
})
