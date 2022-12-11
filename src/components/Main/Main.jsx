import { useEffect, useState } from 'react'
import { api } from '../../helpers/Api'
import { Card } from '../Card/Card'
import { Plug } from '../Plug/Plug'
import stylesMain from './sylesMain.module.css'

export function Main() {
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
  const [token, setToken] = useState(localStorage.getItem('userToken'))
  const [products, setProducts] = useState([])
  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('userToken'))
    }
  })

  useEffect(() => {
    api.getAllProducts().then((productsList) => {
      setProducts(productsList.products)
    })
  }, [])

  return (
    <div className={stylesMain.cards}>
      {token ? <Card products={products} /> : <Plug />}
    </div>
  )
}
