const list = document.querySelector("ul")
const form = document.querySelector("#chair-form")
const popup = document.querySelector(".popup")
const formEdit = document.querySelector("#chair-form-edit")
const closePopup = document.querySelector(".close-button-edit")

const BASE_API_URL = 'http://localhost:1234/api/chairs'

let idToEdit = null

const getAllChairs = async () => {
  const response = await fetch(BASE_API_URL)
  const responseToJson = await response.json()

  list.innerHTML = ""

  responseToJson.data.forEach(chair => {
    const li = document.createElement("li")
    const { name, material, color, price } = chair
    li.innerHTML = `
      <strong>${name}</strong> 
      ${material}, ${color}, $${price}
      <div>
        <button class="btn-update" onclick="createChairToUpdate('${chair._id}', '${name}', '${material}','${color}','${price}')">Editar</button>
        <button class="btn-delete" onclick="deleteChair('${chair._id}')">Borrar</button>
      </div>
    `
    list.appendChild(li)
  });
}

// Validaciones en el front
const validateChairInputs = (name, material, color, price) => {
  if (!name || !material || !color || !price) {
    alert("Todos los campos son obligatorios.")
    return false
  }

  if (name.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres.")
    return false
  }

  if (isNaN(price) || Number(price) <= 0) {
    alert("El precio debe ser un número mayor que 0.")
    return false
  }

  return true
}

const createNewChair = async (e) => {
  e.preventDefault()
  const name = document.querySelector("#name").value.trim()
  const material = document.querySelector("#material").value.trim()
  const color = document.querySelector("#color").value.trim()
  const price = document.querySelector("#price").value.trim()

  if (!validateChairInputs(name, material, color, price)) return

  const newChair = {
    name,
    material,
    color,
    price: Number(price)
  }

  await fetch(BASE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newChair)
  })

  form.reset()
  getAllChairs()
}

const deleteChair = async (id) => {
  if (confirm("¿Estás seguro que deseas borrar la silla?")) {
    await fetch(`${BASE_API_URL}/${id}`, {
      method: "DELETE"
    })
    getAllChairs()
  }
}

const createChairToUpdate = (id, name, material, color, price) => {
  popup.classList.remove("hidden")

  const fields = {
    nameEdit: name,
    materialEdit: material,
    colorEdit: color,
    priceEdit: price
  }

  for (const [id, value] of Object.entries(fields)) {
    const input = document.getElementById(id)
    if (input) input.value = value
  }

  idToEdit = id
}

const updateChair = async (e) => {
  e.preventDefault()

  const name = document.querySelector("#nameEdit").value.trim()
  const material = document.querySelector("#materialEdit").value.trim()
  const color = document.querySelector("#colorEdit").value.trim()
  const price = document.querySelector("#priceEdit").value.trim()

  if (!validateChairInputs(name, material, color, price)) return

  const updatedChair = {
    name,
    material,
    color,
    price: Number(price)
  }

  try {
    await fetch(`${BASE_API_URL}/${idToEdit}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedChair)
    })

    popup.classList.add("hidden")
    idToEdit = null
    getAllChairs()
  } catch (error) {
    console.error("Error al actualizar la silla:", error)
  }
}

const handleClosePopup = () => {
  popup.classList.add("hidden")
}

form.addEventListener("submit", createNewChair)
closePopup.addEventListener("click", handleClosePopup)
formEdit.addEventListener("submit", updateChair)

getAllChairs()
