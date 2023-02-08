// import { useNavigate } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { token } from '../../helpers/functions'
import { deleteAllProducts } from '../../redux/slices/cartSlice'
import { clearFavoriteList } from '../../redux/slices/likesSlice'
import { clearSearch } from '../../redux/slices/searchSlice'
import { clearSort } from '../../redux/slices/sortProductSlice'

export const USER_QUERY_KEY = ['USER_QUERY_KEY']

export function UserDetail() {
  // const cartCount = useSelector((store) => store.cart.length)
  // const dispatch = useDispatch()
  // dispatch()
  // const [user, setUser] = useState(localStorage.getItem('user'))
  // useEffect(() => {
  //   setUser(localStorage.getItem('user'))
  // }, [])

  // const logOut = (e) => {
  //   e.preventDefault()
  //   setUser(null)
  //   localStorage.removeItem('userToken')
  //   localStorage.removeItem('user')
  //   navigate('/')
  // }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const setUser = () => api.getUser()

  const { data } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: setUser,
  })

  const logOut = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('user')
    dispatch(deleteAllProducts())
    dispatch(clearFavoriteList())

    dispatch(clearSort())
    dispatch(clearSearch())
    navigate('/')
    window.location.reload()
  }

  if (!token) return <Navigate to="/" />

  return (
    <div>
      {data && (
      <>
        <h1>Личный кабинет</h1>
        <div />
        <p>
          Привет,
          {data.name}
        </p>
        <NavLink onClick={() => logOut()}>Выйти из аккаунта</NavLink>
      </>
      )}

    </div>
  )
}
