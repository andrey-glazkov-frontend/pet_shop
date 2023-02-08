import { useDispatch, useSelector } from 'react-redux'
import { deleteAllProducts } from '../../redux/slices/cartSlice'
import style from './cartTotal.module.scss'

export function CartTotal({ productPrices }) {
  const cartCount = useSelector((store) => store.cart.length)
  const dispatch = useDispatch()
  console.log(productPrices)
  const clearProductsHandler = () => {
    dispatch(deleteAllProducts())
  }
  const cart = useSelector((store) => store.cart)
  const getDiscountedPrice = (price, discount) => Math.round(price * ((100 - discount) / 100))
  const getPrice = (product) => {
    if (product.discount) return getDiscountedPrice(product.price, product.discount)
    return product.price
  }

  const getOrderInfo = (prices, carts) => {
    const fullInfo = prices.map((product) => (
      {
        ...product,
        ...carts.find((item) => item.id === product.id),
      })).filter((item) => item.selected)
    let fullPrice = 0
    const totalPrice = fullInfo.reduce((total, item) => {
      fullPrice += item.price * item.count
      return total + getPrice(item) * item.count
    }, 0)
    return { total: totalPrice, discount: fullPrice - totalPrice }
  }
  const { total, discount } = getOrderInfo(productPrices, cart)

  return (
    <aside>
      <div className={style.summary}>
        <div className={style.summary_total_items}>
          <p>
            {cartCount}
            {' '}
            товар(ов) в корзине

          </p>
        </div>
        <div className={style.summary_subtotal}>
          <div className={style.subtotal_title}>Итог:</div>
          <div className={`${style.subtotal_value} ${style.final_value}`}>
            {total}
          </div>
        </div>
        <div className={style.summary_subtotal}>
          <div className={style.subtotal_title}>Скидка составила:</div>
          <div className={`${style.subtotal_value} ${style.final_value}`}>
            {discount}
          </div>
        </div>
        <div className={style.summary_total}>
          <button type="button" onClick={clearProductsHandler}>Очистить корзину</button>
        </div>
      </div>
    </aside>
  )
}
