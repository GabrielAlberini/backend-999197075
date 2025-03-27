## Creación de la clase UserManager

class UserManager {}

- **Encapsulamiento**: La clase UserManager encapsula toda la lógica relacionada con los usuarios. Esto hace que el código sea más organizado y fácil de entender.

- **Reusabilidad**: Al usar la clase, podemos crear varias instancias de UserManager para trabajar con diferentes archivos de usuarios si es necesario, sin duplicar la lógica.

- **Flexibilidad**: Se puede modificar fácilmente para agregar nuevas funcionalidades, como buscar usuarios por diferentes criterios, cambiar el formato de los datos, etc.

- **Manejo de Estado**: La propiedad users mantiene el estado interno de los usuarios, lo que facilita el acceso a los datos en los métodos sin tener que leerlos repetidamente desde el archivo, aunque esto depende de la necesidad de mantener los datos en memoria.

- **Errores Mejorados**: Los bloques catch ahora incluyen mensajes más claros para poder diagnosticar problemas específicos (por ejemplo, cuando un usuario no existe al intentar actualizarlo).