interface Person {
  name: string
  age: number
  walk: () => void
}

const createObj2 = () => ({
  name: '김종찬',
  age: 32,
  walk() {
    console.log(`${this.name}이 걷습니다`)
  },
})

const createObjWithObject = () => {
  const person: Person = new Object() as Person

  person.name = '김종찬'
  person.age = 32
  person.walk = function () {
    console.log(`${this.name}이 걷습니다`)
  }

  return person
}

function Person(this: Person, name: string, age: number) {
  this.name = name
  this.age = age
}

Person.prototype.walk = function () {
  console.log(`${this.name}이 걷습니다`)
}

const createObjFromConstructor = () =>
  new (Person as any)('김종찬', 32) as Person
