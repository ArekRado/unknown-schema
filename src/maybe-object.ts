export default (defaultValue: any) => (value: any) => {
  const validators = Object.getOwnPropertyNames(defaultValue)

  return validators.reduce((obj, key) => {
    return Object.assign({}, obj, {
      [key]: defaultValue[key](value[key]),
    })
  }, {})
}
