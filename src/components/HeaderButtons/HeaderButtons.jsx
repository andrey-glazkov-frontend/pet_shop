import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import stylesButton from './buttonsStyles.module.scss'

export function HeaderButtons() {
  const cartCount = useSelector((store) => store.cart.length)
  const like = useSelector((store) => store.like.length)
  const token = localStorage.getItem('userToken')
  if (!token) return null
  return (
    <div className={stylesButton.headerIcons}>
      <NavLink
        to="likes"
        style={{ textDecoration: 'none' }}
      >
        <i className="fa fa-solid fa-heart fa-2xl">
          { like !== 0 && <span className={stylesButton.counter}>{like}</span> }
        </i>
      </NavLink>
      <NavLink
        to="cart"
        style={{ textDecoration: 'none' }}
        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <i className="fa fa-solid fa-cart-shopping fa-2xl">
          { cartCount !== 0 && <span className={stylesButton.counter}>{cartCount}</span> }

        </i>
      </NavLink>
      {' '}
      <NavLink
        to="profile"
        style={{ textDecoration: 'none' }}
      >
        <i className="fa fa-solid fa-user fa-2xl" />
      </NavLink>
      <NavLink
        to="addProd"
        style={{ textDecoration: 'none' }}
      >
        <i className="fa-solid fa-circle-plus fa-2xl" />
      </NavLink>

    </div>
  )
}
