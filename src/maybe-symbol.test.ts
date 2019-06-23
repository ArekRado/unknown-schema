import maybeSymbol from './maybe-symbol'

describe('maybe-symbol', () => {
  it('should return the same value when value has correct type', () => {
    const symbol = Symbol()
    const anySymbol = ({ value, isCorrect }: any) =>
      isCorrect ? value : symbol

    expect(maybeSymbol(anySymbol)(symbol).value).toBe(symbol)
  })
})
