import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import stylesButton from './buttonsStyles.module.scss'

export function HeaderButtons() {
  const cartCount = useSelector((store) => store.cart.length)

  return (
    <div className={stylesButton.headerIcons}>
      <i className="fa fa-solid fa-heart fa-2xl" />
      <NavLink
        to="cart"
        style={{ textDecoration: 'none' }}
        // style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <i className="fa fa-solid fa-cart-shopping fa-2xl">
          { cartCount !== 0 && <span className={stylesButton.badge}>{cartCount}</span> }

        </i>
      </NavLink>
      {' '}
      <NavLink
        to="profile"
        style={{ textDecoration: 'none' }}
      >
        <i className="fa fa-solid fa-user fa-2xl" />
      </NavLink>
    </div>
  )
}
