class GestorTareas {
  tareas = []

  agregarTarea(titulo) {
    const nuevaTarea = {
      id: this.tareas.length + 1, // length -> gallina tiene huevos
      titulo: titulo,
      completada: false
    }

    this.tareas.push(nuevaTarea)
  }

  listarTareas() {
    console.log(this.tareas)
  }

  completarTarea(id) {
    const tareaEncontrada = this.tareas.find(tarea => tarea.id === id)
    console.log(tareaEncontrada)
  }
}

const gestorDeTareas = new GestorTareas()

// mostrar la lista vacia
gestorDeTareas.listarTareas()

// agregar tarea
gestorDeTareas.agregarTarea("Nueva tarea")
gestorDeTareas.agregarTarea(true)
gestorDeTareas.agregarTarea("Nueva tarea 3")
gestorDeTareas.agregarTarea("Nueva tarea 4")
gestorDeTareas.agregarTarea("Nueva tarea 5")
gestorDeTareas.listarTareas()