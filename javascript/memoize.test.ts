import memoize from './memoize'

describe('memoize', () => {
  it('성공', () => {
    const objFunc = (obj: object) => obj

    const memoizedFunc = memoize(objFunc)

    const obj = {
      foo: 'bar',
    }

    const firstResult = memoizedFunc(obj)
    const secondResult = memoizedFunc(obj)

    expect(firstResult).toBe(secondResult)
  })
})
