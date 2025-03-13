// Destructuring -> nos permite extraer valores de arrays u objetos de manera rápida

const persona = {
  nombre: "Federico",
  apellidoMaterno: "Rosales",
  edad: 28,
  direccion: "Rivadavia 123"
}

const { nombre, apellidoMaterno: pepe, edad, direccion } = persona

const presentacion = `Mi nombre es ${nombre}, mi apellido ${pepe} y tengo ${edad} años. Vivo en ${direccion}.`

console.log(presentacion)