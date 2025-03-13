let nombre = "Alicia"
console.log(nombre)

nombre = 6

console.log(nombre)

// scope -> alcance -> "zona privada"
const saludar = () => {
  const nombre = "Gabo"
  console.log("Hola " + nombre)
}

const dormir = () => {
  console.log("Estoy durmiendo, zzz...")
}

dormir()

const apellido = "Alberini"

console.log(apellido)

// var let const
// var test1 = "prueba 1" -> cancelada -> tiene scope global
// let test2 = "prueba 2" -> se puede reasignar -> scope de función
// const test3 = "prueba 3" -> no se puede seasignar -> scope de función


