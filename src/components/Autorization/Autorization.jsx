import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useDispatch } from 'react-redux'

import { NavLink, useNavigate } from 'react-router-dom'
import { api } from '../../helpers/Api'
import { setUser } from '../../redux/slices/userSlice'

import stylesForm from './formStyles.module.css'

export function Autorization({ submitAdditionAction }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function gettingTokeen(values) {
    /* Рабочая версия авторизацци без TanStack
Query
    fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }) */
    api.signIn(values)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json()
        }
        throw Error('Error')
      })
      .then((user) => {
        localStorage.setItem('userToken', user.token)
        localStorage.setItem('user', user.data.name)
        dispatch(setUser(user))

        submitAdditionAction()
      })
      .catch((er) => {
        console.log(er)
        // eslint-disable-next-line no-alert
        alert('Неверный пароль или логин')
      })
  }
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
      onSubmit={(values) => {
        gettingTokeen(values)
        navigate('/products')
        window.location.reload()
      }}
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
