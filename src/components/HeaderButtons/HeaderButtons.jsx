import stylesButton from './buttonsStyles.module.css'

export function HeaderButtons() {
  return (
    <div className={stylesButton.container}>
      <i className="fa-regular fa-heart" />
      <i className="fa-light fa-cart-shopping" />

    </div>
  )
}
