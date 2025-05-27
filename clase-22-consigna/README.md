# 🎓 Consigna para refactorizar a patrón MVC

## ✍️ Consigna

**Objetivo:** Refactorizar la API de productos para adoptar el patrón de arquitectura **MVC (Modelo - Vista - Controlador)** utilizando **TypeScript**.

---

## 🧩 Tareas

### 1. Separar la lógica en carpetas:

- `/models`: Definir el esquema y modelo de producto.
- `/controllers`: Manejar la lógica de negocio (validación, creación, actualización, etc.).
- `/routes`: Definir las rutas que conectan con los controladores.
- `/config`: Conexión a MongoDB.

---

### 2. Crear un archivo principal (`index.ts`)

- Configure Express.
- Conecte a MongoDB.
- Monte las rutas.

---

### 🎁 Bonus

- Aplicar validación de datos usando **Zod**.
