# unknown-schema

Schema protector to transform any unknown value into expected schema

```
npm i unknown-schema
```

```
yarn add unknown-schema
```

```ts
  import maybeObject from 'unknown-schema/maybe-object'
  import maybeString from 'unknown-schema/maybe-string'
  import maybeNumber from 'unknown-schema/maybe-number'
  import maybeArray from 'unknown-schema/maybe-array'

  const unknownJSON = fetch('/some-api-endpoint')
    .then(response => response.json())

  const safeData = maybeObject({
    user: maybeObject({
      name: maybeString('no name'),
      age: maybeNumber(0),
    }),
    products: maybeArray(maybeObject({
      id: maybeNumber(null),
      name: maybeString('default name'),
      description: maybeString(null),
      image: maybeString('cat.png'),
      tags: maybeArray(maybeString()),
    }))
  }).value
```