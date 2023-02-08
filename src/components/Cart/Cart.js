/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { ITEMS_QUERY_KEY } from '../../helpers/constants'
import { token } from '../../helpers/functions'
import { CartHeader } from '../CartHeader/CartHeader'
import { CartItem } from '../CartItem/CartItem'
import { CartTotal } from '../CartTotal/CartTotal'
import Loader from '../Loader/Loader'
import styles from './cart.module.css'

export function Cart() {
  const cart = useSelector((store) => store.cart)

  const productID = cart.map((product) => product.id)
  const { data, isLoading } = useQuery({
    queryKey: [ITEMS_QUERY_KEY].concat(productID),
    queryFn: () => api.getProductByIDs(productID),
  })
  console.log(data)

  if (isLoading) return <Loader />

  if (!data.length) {
    return (
      <div className={styles.emtyCart}>
        <p>Your cart is empty</p>
      </div>
    )
  }

  if (!token) return <Navigate to="/" />

  const productPrices = data.map((product) => (
    { id: product.data._id, price: product.data.price, discount: product.data.discount }))
  return (
    <>
      <div className={styles.basket}>
        <div className={styles.basket_product}>
          <CartHeader />
          {/* <CartSelectorHeader /> */}
          {data.map((product) => <CartItem key={product.data._id} product={product.data} />)}
        </div>
      </div>
      <CartTotal productPrices={productPrices} />
    </>
  )
}
