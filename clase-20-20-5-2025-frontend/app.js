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

const createNewChair = async (e) => {
  e.preventDefault()
  const name = document.querySelector("#name").value
  const material = document.querySelector("#material").value
  const color = document.querySelector("#color").value
  const price = document.querySelector("#price").value

  const newChair = { name, material, color, price }
  newChair.price = Number(price)

  const response = await fetch(BASE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newChair)
  })

  document.querySelector("#name").value = ""
  document.querySelector("#material").value = ""
  document.querySelector("#color").value = ""
  document.querySelector("#price").value = ""

  getAllChairs()
}

const deleteChair = async (id) => {
  if (confirm("Estas seguro que deseas borrar la silla?")) {
    const response = await fetch(`${BASE_API_URL}/${id}`, {
      method: "DELETE"
    })
    getAllChairs()
  }
}

const createChairToUpdate = (id, name, material, color, price) => {
  popup.classList.remove("hidden");

  const fields = {
    nameEdit: name,
    materialEdit: material,
    colorEdit: color,
    priceEdit: price
  };

  for (const [id, value] of Object.entries(fields)) {
    const input = document.getElementById(id);
    if (input) input.value = value;
  }

  idToEdit = id;
};


const updateChair = async (e) => {
  e.preventDefault()

  const newChair = {
    name: document.querySelector("#nameEdit").value,
    material: document.querySelector("#materialEdit").value,
    color: document.querySelector("#colorEdit").value,
    price: document.querySelector("#priceEdit").value
  }

  try {
    const response = await fetch(`${BASE_API_URL}/${idToEdit}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChair)
    })

    popup.classList.add("hidden")
    idToEdit = null
    getAllChairs()
  } catch (error) {
    console.log("Error al actualizar la silla")
  }
}

const handleClosePopup = () => {
  popup.classList.add("hidden")
}

form.addEventListener("submit", createNewChair)
closePopup.addEventListener("click", handleClosePopup)
formEdit.addEventListener("submit", updateChair)

getAllChairs()