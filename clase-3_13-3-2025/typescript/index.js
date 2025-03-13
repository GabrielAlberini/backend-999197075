// Destructuring -> nos permite extraer valores de arrays u objetos de manera rápida
var persona3 = {
    nombrePersona: "Federico",
    apellidoMaterno: "Rosales",
    edadPersona: 28,
    direccionPersona: "Rivadavia 123"
};
var nombrePersona = persona3.nombrePersona, apellidoMaterno = persona3.apellidoMaterno, edadPersona = persona3.edadPersona, direccionPersona = persona3.direccionPersona;
var presentacion2 = "Mi nombre es ".concat(nombrePersona, ", mi apellido ").concat(apellidoMaterno, " y tengo ").concat(edadPersona, " a\u00F1os. Vivo en ").concat(direccionPersona, ".");
console.log(presentacion2);
