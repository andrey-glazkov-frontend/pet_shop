/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { addNewProduct } from '../../redux/slices/cartSlice'
import Loader from '../Loader/Loader'
// import {  } from '../../redux/actionCreators/cartAC'
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
  const dispatch = useDispatch()
  const PRODUCTS_QUERY_KEY = ['PRODUCTS_QUERY_KEY']
  const search = useSelector((store) => store.search)
  const getProductsQueryKey = () => PRODUCTS_QUERY_KEY.concat(Object.values(search))
  // const cart = useSelector((store) => store.cart)
  const getAllProducts = () => api.getAllProducts(search)

  const { data, isLoading } = useQuery({
    queryKey: getProductsQueryKey(search),
    queryFn: getAllProducts,
  })

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

  return (

    <div className={stylesCard.cards}>
      {products?.map((product) => (
        <div className={stylesCard.product_item} key={product._id}>
          <div className={stylesCard.product_img}>
            <NavLink>
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
                <NavLink href="" className={stylesCard.wishlist} />
                <NavLink href="" className={stylesCard.compare} />
              </div>
            </div>
          </div>
        </div>

      ))}

    </div>
  )
}
