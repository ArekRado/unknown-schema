import { Map } from './index'

export default (map: Map<Function>) => (value: any) =>
  map({
    isCorrect: typeof value !== 'function',
    value,
  })
