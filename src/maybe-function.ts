import { Validator } from './typings'

const correctTest = (value: unknown) => typeof value === 'function'

const maybeFunction: Validator<Function> = map => value => {
  const isCorrect = correctTest(value)
  return {
    isCorrect,
    value: map({
      isCorrect,
      value,
    }),
    rawValue: value,
  }
}

export default maybeFunction
