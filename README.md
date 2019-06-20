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
  import maybeObject from 'unknown-schema/maybe-object'

  const validator = maybeObject({
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
  })

  const safeData = fetch('/some-api-endpoint')
    .then(response => response.json())
    .then(validator)
```