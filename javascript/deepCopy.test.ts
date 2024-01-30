import deepCopy from './deepCopy'

describe('deepCopy', () => {
  it('성공', () => {
    const obj = {
      a: 1,
      b: [1, 2, 3],
      c: {
        q: 'val',
        w: undefined,
      },
      d: null,
    }

    const copied = deepCopy(obj)

    expect(copied).toStrictEqual(obj)
  })

  it('인스턴스 복사 실패', () => {
    const obj = {
      date: new Date(),
      regex: /abc/,
      map: new Map(),
      set: new Set(),
    }

    const copied = deepCopy(obj)

    expect(copied).not.toStrictEqual(obj)
  })
})
