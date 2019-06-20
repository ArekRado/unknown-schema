import { Map } from './index'

export default (map: Map<undefined | null>) => (value: any) =>
  map({
    isCorrect: value === null || value === undefined,
    value,
  })
