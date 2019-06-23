import { Validator } from './typings'

const correctTest = (value: unknown) => typeof value === 'boolean'

const maybeBoolean: Validator<boolean> = map => value => {
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

export default maybeBoolean
