// Ejercicio: Crea una función que reciba dos números y devuelva su suma.

export const sumar = (n1: number = 0, n2: number = 0) => {
  return n1 + n2
}

export const restar = (n1: number, n2: number) => {
  return n1 - n2
}

// por defecto
// export default { sumar, restar }
// nombrada
// export { sumar, restar }