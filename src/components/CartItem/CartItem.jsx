/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import {
  cartCounterDecrement, cartCounterIncrement, cartSelect, deleteProduct,
} from '../../redux/slices/cartSlice'
import styles from './cartItem.module.scss'

export function CartItem({ product }) {
  const cart = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const increment = () => {
    dispatch(cartCounterIncrement(product._id))
  }
  const decrement = () => {
    dispatch(cartCounterDecrement(product._id))
  }

  const deleteItem = () => {
    dispatch(deleteProduct(product._id))
  }

  const priceCounter = (price, discount) => Math.round(price * ((100 - discount) / 100))
  console.log(product.price)

  const productInCart = cart.find((item) => item.id === product._id)
  console.log(productInCart)

  const selectChekOut = () => {
    // if (productInCart.selected) {
    //   dispatch(unselectCartAC({ id: product._id }))
    // } else {
    //   dispatch(selectCartAC({ id: product._id }))
    // }
    dispatch(cartSelect(product._id))
  }

  // const turnOnDisable = productInCart.count >= product.stock
  return (
    <div className={styles.basket_product}>
      <div className={styles.item}>
        <input type="radio" checked={productInCart.selected} onClick={() => selectChekOut()} />

        <div className={styles.product_image}>
          <img src={product.pictures} alt="Placholder" className={styles.product_frame} />
        </div>
        <div className={styles.product_details}>
          <h1>
            <strong>
              {' '}
              {product.name}
              {' '}
            </strong>

          </h1>
          <p>
            <strong>Кол-во на складе:</strong>

            {' '}
            {product.stock}
          </p>
        </div>
      </div>
      <div className={styles.quantity}>
        <div className={styles.Counter}>
          <button
            type="button"
            disabled={productInCart.count === 1}
            onClick={() => decrement()}
          >
            -
          </button>
          <input readOnly type="number" value={productInCart.count} />
          <button type="button" disabled={productInCart.count === product.stock} onClick={() => increment()}>+</button>

        </div>
        <div className={styles.Price}>
          <p>
            Цена за шт:
            {' '}
            {product.discount !== 0
              ? +product.price - (+product.price * (+product.discount / 100)) : +product.price }

            {' '}
            &#8381;
            {' '}
          </p>
        </div>

      </div>

      <div className={styles.subtotal}>
        <span className={styles.price}>
          {product.discount !== 0
            ? priceCounter(product.price, product.discount)
             * productInCart.count : product.price * productInCart.count}
          &nbsp; &#8381;
          <span>
            <del className={styles.sale_price}>
              {product.discount !== 0 ? product.price * productInCart.count : null }
            </del>
          </span>
        </span>

      </div>
      <div>
        <button type="button" onClick={() => deleteItem()}>Удалить</button>
      </div>
    </div>

  )
}
