import { useDispatch } from 'react-redux'
import { cartSelectAll } from '../../redux/slices/cartSlice'
import styles from './styles.module.css'

export function CartHeader() {
  const dispatch = useDispatch()

  const selectHandler = (event) => {
    dispatch(cartSelectAll(event.target.checked))
  }

  return (
    <div className={styles.container}>
      <input defaultChecked onChange={selectHandler} type="checkbox" />
      <p>Выбрать все</p>
    </div>
  )
}
