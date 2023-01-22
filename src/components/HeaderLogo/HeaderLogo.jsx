import { NavLink } from 'react-router-dom'
import logo from './assets/logo.png'
import stylesLogo from './stylesHeader.module.css'

export function HeaderLogo() {
  return (
    <NavLink to="/" style={{ textDecoration: 'none' }}>

      <div className={stylesLogo.logo_container}>
        <img className={`${stylesLogo.img_logo}`} alt="logo" src={logo} />
        <h2 className={stylesLogo.header_text}>DogFood</h2>
      </div>
    </NavLink>

  )
}
