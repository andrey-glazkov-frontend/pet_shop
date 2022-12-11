import stylesCard from './CardStyles.module.css'

export function Card({ products }) {
  console.log(products)
  return (
    <>
      {
        products.map((product) => (

          <div key={product.id} className={stylesCard.card}>
            {product.name}
            {product.price}
          </div>

        ))
      }

    </>
  )
}
