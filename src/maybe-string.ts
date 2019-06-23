import { Validator } from './typings'

const correctTest = (value: unknown) => typeof value === 'string'

const maybeString: Validator<string> = map => value => {
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

export default maybeString
