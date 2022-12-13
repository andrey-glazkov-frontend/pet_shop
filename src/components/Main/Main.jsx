import { useEffect, useState } from 'react'
import { api } from '../../helpers/Api'
import { Card } from '../Card/Card'
import { Plug } from '../Plug/Plug'
import stylesMain from './sylesMain.module.css'

export function Main({ token, openModal }) {
  // const [products, setProducts] = useState([])
  // const addNewProduct = (newProduct) => {
  //   setProducts((prev) => [newProduct, ...prev])
  // }

  // useEffect(() => {
  //   api.getAllProducts()
  //     .then((productsList) => {
  //       addNewProduct(productsList.products)
  //       console.log({ products })
  //     })
  // }, [])
  const [cardStarter, setcardStarter] = useState(false)
  const [products, setProducts] = useState([])
  useEffect(() => {
    if (token) {
      setcardStarter(true)
    }
  })

  useEffect(() => {
    if (token) {
      api.getAllProducts().then((productsList) => {
        setProducts(productsList.products)
        console.log('works')
      })
    }
  }, [cardStarter])

  return (
    <div className={stylesMain.cards}>
      {token ? <Card products={products} /> : <Plug openModal={openModal} />}
    </div>
  )
}
