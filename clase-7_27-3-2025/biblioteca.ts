class Libro {
  titulo: string;
  autor: string;
  anio: number;

  constructor(titulo: string, autor: string, anio: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }
}

class Biblioteca {
  private libros: Libro[] = [];

  public mostrarBiblioteca() {
    console.log(this.libros)
  }

  public agregarLibro(libro: Libro): void {
    this.libros.push(libro);
    console.log(`Libro "${libro.titulo}" fue agregado a la biblioteca.`);
  }

  public eliminarLibro(titulo: string) {
    // const index = this.libros.findIndex((libro) => libro.titulo === titulo)

    // if (index !== -1) {
    //   console.log("Elemento borrado: ", this.libros[index])
    //   this.libros.splice(index, 1)
    //   console.log("La biblioteca quedó así:", this.libros)
    // } else {
    //   console.log("No existe el libro...")
    // }

    const nuevaBiblioteca = this.libros.filter((libro) => {
      if (libro.titulo !== titulo) {
        return libro
      } else {
        console.log("Libro borrado:", libro)
      }
    })

    this.libros = nuevaBiblioteca

    console.log("Nueva biblioteca", nuevaBiblioteca)
  }
}


const libro1 = new Libro("El niño de pijama a rayas", "John Boyne", 2006)
const libro2 = new Libro("Harry Potter y el prisionero de Azkaban", "J. K. Rowling", 1999)

const biblioteca = new Biblioteca()
biblioteca.agregarLibro(libro1)
biblioteca.agregarLibro(libro2)

biblioteca.eliminarLibro("Harry Potter y el prisionero de Azkaban")

