console.log(saludar())

function saludar() {
  return "Hola a todos, ¿cómo están?"
}

const saludar2 = (nombre, apellido) => `Hola a ${nombre} ${apellido} desde arrow function, ¿cómo estás?`


console.log(saludar2("Matías", "Gonzales"))