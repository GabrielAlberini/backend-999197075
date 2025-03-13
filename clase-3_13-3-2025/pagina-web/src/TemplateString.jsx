const product = { name: "Pc gaming", price: 1000, description: "Es alta compu" }

const TemplateString = () => {
  return (
    <div>
      <p>{`El producto ${product.name} tiene un costo de: ${product.price}`}</p>
      <p>{`Descripción: ${product.description}`}</p>
    </div>
  )

}

export default TemplateString