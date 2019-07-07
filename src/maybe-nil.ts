import validator from './validator'

export default validator<undefined | null>(
  value => value === null || value === undefined,
)
