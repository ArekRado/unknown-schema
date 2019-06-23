import { Validator } from './typings'

const correctTest = (value: unknown) => typeof value === 'number'

const maybeNumber: Validator<number> = map => value => {
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

export default maybeNumber
