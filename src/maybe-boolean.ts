import { Map } from './index'

const correctTest = (value: unknown) => typeof value === 'boolean'

export default (map: Map<boolean>) => (value: unknown) => {
  const isCorrect = correctTest(value)
  const correctValue = map({
    isCorrect,
    value,
  })

  return {
    isCorrect,
    value,
  }
}
