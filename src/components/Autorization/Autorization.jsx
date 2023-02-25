import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
// import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { NavLink, useNavigate } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { setUser } from '../../redux/slices/userSlice'

import stylesForm from './formStyles.module.css'

export const LOGIN_QUERY_KEY = ['USER_QUERY_KEY']

export function Autorization({ submitAdditionAction }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // function gettingTokeen(values) {
  /* Рабочая версия авторизацци без TanStack
Query
    fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }) */
  // const [message, setMessage] = useState('')

  // const errorHandler = (answer) => {
  //   const { message: errorMessage } = answer
  //   setMessage(errorMessage)
  // }

  const signIn = (values) => api.signIn(values)
    // .then((res) => {
    //   if (!res.err) {
    //     console.log(res)
    //     dispatch(setUser(res))
    //     localStorage.setItem('userToken', res.token)
    //     localStorage.setItem('user', res.data.name)
    //     submitAdditionAction()
    //     navigate('/products')
    //   } else {
    //     errorHandler(res)
    //   }
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      }
      // eslint-disable-next-line no-alert
      throw Error(alert('Неверный пароль или логин'))
    })
    .then((user) => {
      localStorage.setItem('userToken', user.token)
      localStorage.setItem('user', user.data.name)
      dispatch(setUser(user))
      submitAdditionAction()
      navigate('/products')
      window.location.reload()
    })
  // console.log(message)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSubmit: () => {
      queryClient.invalidateQueries({ queryKey: LOGIN_QUERY_KEY })
    },
  })

  // api.signIn(values)
  //   .then((res) => {
  //     if (res.status >= 200 && res.status < 300) {
  //       return res.json()
  //     }
  //     throw Error('Error')
  //   })
  //   .then((user) => {
  //     localStorage.setItem('userToken', user.token)
  //     localStorage.setItem('user', user.data.name)
  //     dispatch(setUser(user))

  //     submitAdditionAction()
  //   })
  //   .catch((er) => {
  //     console.log(er)
  //     // eslint-disable-next-line no-alert
  //     alert('Неверный пароль или логин')
  //   })

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Обязательное поле'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Неверный email'
        }
        return errors
      }}
      onSubmit={mutate}

      // {(values) => {
      //   // gettingTokeen(values)
      //   // submitAdditionAction()
      //   mutate
      //   // window.location.reload()
      // }}
    >
      {() => (
        <div className="modal">
          <Form>
            <h2>Войти</h2>
            <Field type="email" name="email" className={stylesForm.input} placeholder="Введите вашу почту" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" className={stylesForm.input} placeholder="Пароль" />
            <ErrorMessage name="password" component="div" />
            <NavLink to="./signin">Регистрация</NavLink>
            <br />
            <button className=" btn btn-default me-3" type="submit">
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>

  )
}
