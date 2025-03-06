const os = require('os');

// Obtener el sistema operativo
console.log(`Sistema Operativo: ${os.type()}`);

// Obtener la arquitectura del procesador
console.log(`Arquitectura: ${os.arch()}`);

// Obtener la cantidad de CPUs
console.log(`CPUs: ${os.cpus().length}`);

// Obtener la cantidad de memoria libre
console.log(`Memoria libre: ${os.freemem() / 1024 / 1024} MB`);

// Obtener la memoria total
console.log(`Memoria total: ${os.totalmem() / 1024 / 1024} MB`);

// Obtener el tiempo de actividad del sistema (en segundos)
console.log(`Tiempo de actividad: ${os.uptime()} segundos`);
