/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch, useSelector } from 'react-redux'
import { selectAllCartAC, unselectAllCartAC } from '../../redux/actionCreators/cartAC'
import styles from './styles.module.css'

export function CartHeader() {
  const cart = useSelector((store) => store.cart)

  const dispatch = useDispatch()
  const unselectAll = () => {
    dispatch(unselectAllCartAC())
  }
  const selectAll = () => {
    dispatch(selectAllCartAC())
  }
  let $radioSelect
  if (cart
    .filter((product) => product.selected === false)
    .length === 0) {
    $radioSelect = (
      <label onClick={() => unselectAll()}>
        <input type="radio" checked />
        {' '}
        Select all
      </label>
    )
  } else {
    $radioSelect = (
      <label onClick={() => selectAll()}>
        <input type="radio" checked={false} />
        {' '}
        Select all
      </label>
    )
  }

  return (
    <div className={styles.container}>
      {$radioSelect}
    </div>
  )
}
