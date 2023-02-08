import { useLocation } from 'react-router-dom'
import stylesHeader from './styles.module.css'

import { HeaderButtons } from '../HeaderButtons/HeaderButtons'
import { HeaderSearch } from '../HeaderSearch/HeaderSearch'
import { HeaderLogo } from '../HeaderLogo/HeaderLogo'

export function Header() {
  const location = useLocation()

  return (
    <header className={stylesHeader.container}>
      <HeaderLogo />
      {location.pathname === '/' || location.pathname === '/products' ? <HeaderSearch /> : null}
      <HeaderButtons />
    </header>
  )
}
