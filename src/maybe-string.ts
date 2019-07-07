import validator from './validator'

export default validator<string>(value => typeof value === 'string')
