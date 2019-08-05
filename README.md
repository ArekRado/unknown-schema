# unknown-schema

Schema protector to transform any unknown value into expected schema

How it works: https://uodod.codesandbox.io/

```
npm i unknown-schema

yarn add unknown-schema
```

```ts
  import { maybeObject, maybeString, maybeNumber, maybeArray } from 'unknown-schema'

  type UsersProducts = {
    users: {
      firstName: string;
      lastName: string;
      products: number[];
    }[];
    products: {
      name: string;
      price: number;
      id: number;
    }[];
  };

  const validator = maybeObject({
    users: maybeArray(
      maybeObject({
        firstName: maybeString(''),
        lastName: maybeString(''),
        products: maybeArray(maybeNumber(-1))
      })
    ),
    products: maybeArray(
      maybeObject({
        name: maybeString(''),
        price: maybeNumber(0),
        id: maybeNumber(-1)
      })
    )
  });

  const unknownJSON: unknown = fetch('/some-api-endpoint')
    .then(response => response.json())

  const safeData: UsersProducts = validator(unknownJSON).value
```
