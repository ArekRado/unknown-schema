import validator from './validator'

export default validator<boolean>(value => typeof value === 'boolean')
