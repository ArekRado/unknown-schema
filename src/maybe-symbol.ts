import validator from './validator'

export default validator<symbol>(value => typeof value === 'symbol')
