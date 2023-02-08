/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { sortProducts } from '../../helpers/functions'
import { addNewProduct } from '../../redux/slices/cartSlice'
import { disLikeProd, likeProd } from '../../redux/slices/likesSlice'
import Loader from '../Loader/Loader'
import { SortBar } from '../SortBar/SortBar'
import stylesCard from './CardStyles.module.css'

export function Card() {
  // const dispatch = useDispatch()
  // // eslint-disable-next-line no-unused-vars
  // const search = useSelector((store) => store.cart)

  // const { data, isLoading } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: () => api.getAllProducts(),
  //   onError: (error) => {
  //     console.log(error)
  //   },
  // })

  // const addProductState = (id, price, stock) => {
  //   dispatch(addNewProductAC({
  //     id,
  //     count: 1,
  //     price,
  //     stock,
  //   }))
  // }
  const sortValue = useSelector((store) => store.sort.value)

  const dispatch = useDispatch()
  const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']
  const search = useSelector((store) => store.search)
  const getProductsQueryKey = () => PRODUCTS_QUERY_KEY.concat(Object.values(search))
  // const cart = useSelector((store) => store.cart)
  const getAllProducts = () => api.getAllProducts(search)
  const like = useSelector((store) => store.like)

  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(search),
    queryFn: getAllProducts,
  })

  console.log(like)
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

  if (isLoading) return <Loader />

  const products = search !== '' ? data : data.products
  sortProducts(products, sortValue)

  return (
    <>
      <SortBar />
      <div className={stylesCard.cards}>
        {products?.map((product) => (
          <div className={stylesCard.product_item} key={product._id}>
            <div className={stylesCard.product_img}>
              <NavLink to={`/products/${product._id}`}>
                <img src={product.pictures} alt="123" />
              </NavLink>
            </div>
            <div className={stylesCard.product_list}>
              <h3>{product.name}</h3>
              <div className={stylesCard.stars} />
              <span className={stylesCard.price}>
                {product.discount !== 0
                  ? +product.price - (+product.price * (+product.discount / 100)) : product.price }

                {' '}
                &#8381;
                {' '}
                <span>
                  <del className={stylesCard.sale_price}>
                    {product.discount !== 0 ? product.price : null }
                  </del>
                </span>
              </span>
              <div className={stylesCard.actions}>
                <div className={stylesCard.add_to_cart}>
                  <button onClick={() => { addProductState(product._id, product.price, product.stock) }} type="button">
                    <p className={stylesCard.cart_button}>В корзину</p>
                  </button>
                </div>
                <div className={stylesCard.add_to_links}>
                  <button type="button" onClick={() => addToFav(product._id)}>
                    <p className={stylesCard.wishlist} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        ))}

      </div>
    </>
  )
}
