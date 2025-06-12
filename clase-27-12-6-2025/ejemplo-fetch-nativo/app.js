const list = document.getElementById("listProduct")
const error = document.getElementById("error")

const fetchingProducts = async () => {
  const response = await fetch("http://localhost:1234/api/products", {
    method: "GET",
    headers: { "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGFjNjliY2E2M2I0YmRiYmQ3NDA5NyIsImVtYWlsIjoicGVwZUBnbWFpbC5jb20iLCJpYXQiOjE3NDk3MzE1NzIsImV4cCI6MTc0OTczMTYzMn0.jpEVUnJhZjamMU4uPoWoh52geUjcFflNvJB4Lyeunqc" }
  })

  const data = await response.json()

  // respuesta del servidor
  console.log(data)

  if (!response.ok) {
    error.textContent = "Necesitas una sesión, es decir un token valido."
  }

  if (data.data) {
    data.data.forEach((product) => {
      list.innerHTML += `
      <p>${product.name}</p>
    `
    })
  }
}

fetchingProducts()