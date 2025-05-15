const list = document.querySelector("ul")
const form = document.querySelector("form")

const BASE_API_URL = 'http://localhost:1234/api/chairs'

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
      <button onclick="deleteChair('${chair._id}')">Borrar</button>
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

form.addEventListener("submit", createNewChair)

getAllChairs()