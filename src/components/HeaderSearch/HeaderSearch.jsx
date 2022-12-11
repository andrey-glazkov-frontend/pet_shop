import searchStyles from './searchStyles.module.css'

export function HeaderSearch() {
  return (

    <input className={searchStyles.search__input} type="text" placeholder="Search" />

  )
}
