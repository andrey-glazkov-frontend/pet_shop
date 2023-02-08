/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { token } from '../../helpers/functions'
import { addNewProduct } from '../../redux/slices/cartSlice'
import { disLikeProd, likeProd } from '../../redux/slices/likesSlice'
import Loader from '../Loader/Loader'
import { Reviews } from '../Reviews/Reviews'
import stylesDetail from './cardDetail.module.scss'

export function CardDetail() {
  const { user } = useSelector((store) => store.user)

  const DETAIL_QUERY_KEY = ['DETAIL_QUERY_KEY']
  const dispatch = useDispatch()
  const like = useSelector((store) => store.like)
  const navigate = useNavigate()

  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: DETAIL_QUERY_KEY.concat(id),
    queryFn: () => api.getProductById(id),
  })

  const addProductState = () => {
    const prodToCart = {
      id: data._id,
      price: data.price,
      stock: data.stock,
    }
    dispatch(addNewProduct(prodToCart))
  }

  const addToFav = () => {
    const isFavorite = like.includes(data._id)

    if (!isFavorite) {
      dispatch(likeProd(data._id))
    } else {
      dispatch(disLikeProd(data._id))
    }
  }

  console.log(data)

  const { mutate } = useMutation({
    mutationFn: () => api.deleteProduct(data._id),
    onSuccess: () => {
      navigate('/')
    },
  })

  const removeHandler = () => {
    mutate()
  }

  if (isLoading) return <Loader />
  if (!token) return <Navigate to="/" />

  return (
    <>
      <div className="container">
        <div className={stylesDetail.card}>
          <div className={stylesDetail.container_fliud}>
            <div className={`${stylesDetail.wrapper} row`}>
              <div className={`${stylesDetail.preview} col-md-6`}>

                <div className={`${stylesDetail.preview_pic} ${stylesDetail.tab_content}`}>
                  <div className={stylesDetail.tab_pane}>
                    <img src={data.pictures} alt={data.name} />
                  </div>
                </div>

              </div>
              <div className={`${stylesDetail.details} col-md-6`}>
                <h3 className={stylesDetail.product_title}>{data.name}</h3>
                <div className={stylesDetail.rating}>
                  <div className="stars">
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                    <span className="fa fa-star" />
                  </div>
                  {/* <span className={stylesDetail.review_no}>
                    {data.reviews.length !== 0 ? (
                      <p>
                        {data.reviews.length}
                        {' '}
                        отзыва
                      </p>
                    ) : <p>0 отзывов</p>}

                  </span> */}
                </div>
                <h4 className={stylesDetail.price}>
                  Цена:
                  {' '}
                  <span>
                    {data.discount !== 0
                      ? +data.price - (+data.price * (+data.discount / 100)) : data.price }

                    {' '}
                    &#8381;
                    {' '}
                    <span>
                      <del>
                        {data.discount !== 0 ? data.price : null }
                      </del>
                    </span>
                  </span>
                </h4>
                <p className={stylesDetail.vote}>
                  <strong>Кол-во на складе:</strong>
                  {' '}
                  {data.wight}
                  {' '}
                  шт.
                </p>

                <p className={stylesDetail.vote}>
                  <strong>Вес товара:</strong>
                  {' '}
                  {data.stock}
                  {' '}
                  г
                </p>

                <p className={stylesDetail.vote}>
                  <strong>Описание:</strong>
                  {' '}
                  {data.description}
                  {' '}
                  г
                </p>

                <div className={stylesDetail.action}>
                  <button className={`${stylesDetail.add_to_cart} btn btn-default me-3`} type="button" onClick={() => addProductState()}>Добавить в корзину</button>
                  <button className={`${stylesDetail.like} btn btn-default`} type="button" onClick={() => addToFav()}>
                    <span className="fa fa-heart" />
                  </button>
                  {/* Проверка на наличие товара в редаксе есть вставляем мусорку */}
                  {user._id === data.author._id && (
                    <button className={`${stylesDetail.like} btn btn-default`} onClick={() => removeHandler()} type="button">
                      <span className="fa fa-trash" />
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reviews />
    </>
  )
}
