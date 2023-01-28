// import { useNavigate } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { deleteAllProducts } from '../../redux/slices/cartSlice'
import { removeUser } from '../../redux/slices/userSlice'

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

  // const { token } = useSelector((store) => store.user)
  const setUser = () => api.getUser()

  const { data } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: setUser,
  })

  const logOut = () => {
    dispatch(removeUser())
    // dispatch(clearSort())
    // dispatch(clearSearch())
    dispatch(deleteAllProducts())
    navigate('/')
  }

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
        <NavLink onClick={logOut}>Выйти из аккаунта</NavLink>
      </>
      )}

    </div>
  )
}
