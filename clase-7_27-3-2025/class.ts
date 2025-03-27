class Persona {
  private nombre: string
  private edad: number

  constructor(nombre: string, edad: number) {
    this.nombre = nombre
    this.edad = edad
  }

  public saludar(nombre: string) {
    console.log(`Hola ${nombre}, soy ${this.nombre}!`)
  }

  private cumplirAnio() {
    this.edad++
  }

  public festejarCumple() {
    this.cumplirAnio()
    console.log(`${this.nombre} acaba de cumplir un año, ahora tiene ${this.edad}`)
  }
}

const persona1 = new Persona("Andres", 50)
persona1.saludar("Matias")

const persona2 = new Persona("Antu", 26)
persona2.saludar("Candela")

// console.log(persona2.edad)

// CREACIÓN DE OBJETO LITERAL
// interface Persona {
//   nombre: string
//   edad: number
//   direccion?: object[]
// }

// const persona2: Persona = { nombre: "test", edad: 123 }
// persona2.direccion = [{ calle: "rivadavia 123" }]
