
// import default
// import calculadora from "./ejercicios/ejercicio1"
// console.log(calculadora)

// const { sumar, restar } = calculadora

// const resultado = sumar(1, 2)
// console.log(resultado)

// import { restar, sumar } from "./ejercicios/ejercicio1"
// import { searchUser } from "./ejercicios/ejercicio2"

// const resultado = sumar(1, 2)
// const resultado2 = restar(1, 2)
// console.log(resultado)
// console.log(resultado2)

// const user = searchUser("ana")
// console.log(user)

import { searchUsers } from "./ejercicios/ejercicio2";

const users = searchUsers("ana")

if (users.length === 0) {
  console.log("No existen usuarios...")
} else {
  console.log(users)
}

