import validator from './validator'

export default validator<number>(value => typeof value === 'number')
