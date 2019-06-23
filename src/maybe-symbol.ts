import { Map, ParseStatus } from './typings'

const correctTest = (value: unknown) => typeof value === 'symbol'

export default (map: Map<symbol>) => (value: unknown): ParseStatus<symbol> => {
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
