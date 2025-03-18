// definión estática del tipo de dato
// tipo de datos primitivos
let frase: string = "esto es una frase"
let frase2 = "esto es otra frase"
// frase2 = true -> ❌ Error: el tipo 'boolean' no se puede asignar al tipo 'string'
let edad: number = 30
let mayorEdad: boolean = true
let gustoDeHeladoFav: undefined
let tieneMoto: null
let variableMixta: any

variableMixta = 43
variableMixta = true
variableMixta = undefined

// tipo de datos complejos
// let colores: Array<string> = ["azul", "rojo", "amarillo"]
// let colores2: string[] = ["azul", "rojo", "amarillo", 43] -> ❌
let arrayMixto: [string, number] = ["gabriel", 30]

interface Persona {
  nombre: string
  apellido: string
  edad: number
  direccion: string
  provincia?: string
  vehiculo: string[]
  cantDeHermanos: number | string // or en js || or en ts | 
}


const persona1: Persona = {
  nombre: "Miguel",
  apellido: "Baltazar Silva",
  edad: 30,
  direccion: "Rivadavia 123",
  vehiculo: ["auto", "bici"],
  cantDeHermanos: 4
}

interface User {
  id: number
  name: string
  username?: string
}

const users: User[] = [
  {
    id: 1,
    name: "pepe"
  },
  {
    id: 2,
    name: "jacinto",
    username: "lolo"
  }
]

users.forEach(user => console.log(user.name))

// ---------------------------------------------------------------------

class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greeting(friend: string): string {
    return `Hi ${friend}, I'am ${this.name} and have ${this.age} years.`
  }

  walking(): string {
    return "Hi, I'am walking..."
  }
}

const newPerson = new Person("Federico", 25)
console.log(newPerson.greeting("Matías"))
console.log(newPerson.walking())

// retorno en funciones
// function correr(cantDeKms: number): string {
//   return `Corrí ${cantDeKms}km.`
// }

// const resultadoDeMaraton = correr(30)
// console.log(resultadoDeMaraton)

const correr = (cantDeKm: number) => {
  return `Corrí ${cantDeKm}km.`
}

const resultadoDeMaraton = correr(30)
console.log(resultadoDeMaraton)

// --------------------------------------------------------------------

interface Tarea {
  id: number
  titulo: string
  completada: boolean
}

class GestorTareas {
  tareas: Tarea[] = []

  agregarTarea(titulo: string) {
    const nuevaTarea: Tarea = {
      id: this.tareas.length + 1, // length -> gallina tiene huevos
      titulo: titulo,
      completada: false
    }

    this.tareas.push(nuevaTarea)
  }

  listarTareas() {
    console.log(this.tareas)
  }

  completarTarea(id: number) {
    const tareaEncontrada = this.tareas.find(tarea => tarea.id === id)
    console.log(tareaEncontrada)
  }
}

const gestorDeTareas = new GestorTareas()

// mostrar la lista vacia
gestorDeTareas.listarTareas()

// agregar tarea
gestorDeTareas.agregarTarea("Nueva tarea")
gestorDeTareas.agregarTarea("Nueva tarea 2")
gestorDeTareas.agregarTarea("Nueva tarea 3")
gestorDeTareas.agregarTarea("Nueva tarea 4")
gestorDeTareas.agregarTarea("Nueva tarea 5")
gestorDeTareas.listarTareas()