// import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

export function UserDetail() {
  const cartCount = useSelector((store) => store.cart.length)
  const dispatch = useDispatch()
  dispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState(localStorage.getItem('user'))
  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [])

  const logOut = (e) => {
    e.preventDefault()
    setUser(null)
    localStorage.removeItem('userToken')
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <>
      <h1>Личный кабинет</h1>
      <p>
        Привет,
        {user}
      </p>
      <p>{cartCount}</p>
      <NavLink onClick={logOut}>Выйти из аккаунта</NavLink>
    </>
  )
}
