const nombre = "Lucas"
const apellido = "Schulz"

const nombreCompleto = nombre + " " + apellido

console.log(nombreCompleto)

// interpolar -> unir string con evaluaciones js
const nombreCompleto2 = `El nombre completo es: ${nombre} ${apellido} ${1 + 1}`

console.log(nombreCompleto2, "<-- nombre completo 2")

const prueba = `Hola
a
todos`

const prueba2 = "Hola a todos" // no aceptan salto de linea

console.log(prueba)
console.log(prueba2)

const cita = 'La cita es: "Confía en el tiempo, que suele dar dulces salidas a muchas amargas dificultades"' // debo utilizar en el string las comillas contrarias a las que envuelven al mismo string

console.log(cita)