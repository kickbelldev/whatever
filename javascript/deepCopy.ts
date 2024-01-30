const deepCopy = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => deepCopy(v)) as T
  }

  const copied = {} as Record<string, unknown>

  Object.keys(obj).forEach((key) => {
    const val = (obj as Record<string, unknown>)[key] as unknown
    copied[key] = deepCopy(val)
  })

  return copied as T
}

const obj = {
  a: [{ b: { c: 1 } }, 'val', [1, 2]],
  b: 1,
  foo: 'bar',
  date: new Date(),
  c: { d: 1 },
}

export default deepCopy

/*

의문점
- 타이핑을 더 정확하게 할 수 없나?
- 객체 인스턴스 같은 건 어떻게 카피해야 하는가?

*/
