import { Map, ParseStatus } from './typings'

const correctTest = (value: unknown) => value === null || value === undefined

export default (map: Map<undefined | null>) => (
  value: any,
): ParseStatus<undefined | null> => {
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
