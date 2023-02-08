/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { token } from '../../helpers/functions'
import { addNewProduct } from '../../redux/slices/cartSlice'
import { disLikeProd, likeProd } from '../../redux/slices/likesSlice'
import Loader from '../Loader/Loader'
import stylesLike from './likes.module.scss'

export const LIKES_QUERY_KEY = 'LIKES_QUERY_KEY'
export function Likes() {
  const dispatch = useDispatch()

  const like = useSelector((store) => store.like)

  //   const likeID = like.map((likes) => likes.id)
  const { data, isLoading } = useQuery({
    queryKey: [LIKES_QUERY_KEY].concat(like),
    queryFn: () => api.getProductByIDs(like),
  })

  const addToFav = (id) => {
    const isFavorite = like.includes(id)

    if (!isFavorite) {
      dispatch(likeProd(id))
    } else {
      dispatch(disLikeProd(id))
    }
  }
  const addProductState = (id, price, stock) => {
    const prodToCart = {
      id,
      count: 1,
      price,
      stock,
    }
    dispatch(addNewProduct(prodToCart))
  }
  console.log(data)
  if (!like.length) {
    return (
      <div>
        <p>Пока ничего нет</p>
      </div>
    )
  }

  if (isLoading) return <Loader />
  if (!token) return <Navigate to="/" />

  return (
    <div className={stylesLike.cards}>
      {data?.map((product) => (
        <div className={stylesLike.product_item} key={product.data._id}>
          <div className={stylesLike.product_img}>
            <NavLink to={`/products/${product.data._id}`}>
              <img src={product.data.pictures} alt="123" />
            </NavLink>
          </div>
          <div className={stylesLike.product_list}>
            <h3>{product.data.name}</h3>
            <div className={stylesLike.stars} />
            <span className={stylesLike.price}>
              {product.discount !== 0
                ? +product.data.price
                - (+product.data.price * (+product.data.discount / 100)) : product.data.price }

              {' '}
              &#8381;
              {' '}
              <span>
                <del className={stylesLike.sale_price}>
                  {product.data.discount !== 0 ? product.data.price : null }
                </del>
              </span>
            </span>
            <div className={stylesLike.actions}>
              <button className={`${stylesLike.add_to_cart} btn btn-default me-3`} type="button" onClick={() => addProductState()}>Добавить в корзину</button>
              <button className={`${stylesLike.like} btn btn-default`} onClick={() => addToFav(product.data._id)} type="button">
                <span className="fa fa-trash" />
              </button>

            </div>
          </div>
        </div>

      ))}

    </div>
  )
}
