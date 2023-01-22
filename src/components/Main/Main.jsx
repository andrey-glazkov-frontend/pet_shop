import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import { Plug } from '../Plug/Plug'

export function Main({ openModal }) {
/*
Работающая функция генерации карточек без использования TanStack
Query
const [products, setProducts] = useState([])
  const addNewProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev])
  }

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
      })
    }
  }, [cardStarter])
  */

  const [token, setToken] = useState(localStorage.getItem('userToken'))

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('userToken'))
    }
  })

  return (

    <div>
      {!token ? <Plug openModal={openModal} /> : <Card />}
    </div>
  )
}
