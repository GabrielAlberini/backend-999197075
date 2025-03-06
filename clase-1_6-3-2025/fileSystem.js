const fileSystem = require("fs")

// Leo la info como buffer para su transacción rápida
const data = fileSystem.readFileSync("text.txt", "utf-8")
console.log(data)