import { Map } from './index'

export default (map: Map<string>) => (value: any) =>
  map({
    isCorrect: typeof value === 'string',
    value,
  })
