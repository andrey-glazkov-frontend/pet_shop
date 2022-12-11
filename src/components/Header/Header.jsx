import stylesHeader from './styles.module.css'

import { HeaderButtons } from '../HeaderButtons/HeaderButtons'
import { HeaderSearch } from '../HeaderSearch/HeaderSearch'
import { HeaderLogo } from '../HeaderLogo/HeaderLogo'

export function Header() {
  return (
    <header className={stylesHeader.container}>
      <HeaderLogo />
      <HeaderSearch />
      <HeaderButtons />
    </header>
  )
}
