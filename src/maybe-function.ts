import validator from './validator'

export default validator<Function>(value => typeof value === 'function')
