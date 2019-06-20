import { Map } from './index'

export default (map: Map<symbol>) => (value: any) =>
  map({
    isCorrect: typeof value === 'symbol',
    value,
  })
