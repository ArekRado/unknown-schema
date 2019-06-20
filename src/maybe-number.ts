import { Map } from './index'

export default (map: Map<number>) => (value: any) =>
  map({
    isCorrect: typeof value === 'number',
    value,
  })
