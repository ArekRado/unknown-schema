import { Validator, CorrectTest } from './typings'

const validator = <Value>(correctTest: CorrectTest): Validator<Value> => (
  defaultValue,
  map,
) => value => {
  const isCorrect = correctTest(value)
  return {
    isCorrect,
    value: map
      ? map({
          isCorrect,
          value,
        })
      : isCorrect
      ? (value as Value)
      : defaultValue,
    rawValue: value,
  }
}

export default validator
