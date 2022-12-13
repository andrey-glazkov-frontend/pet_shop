import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'

import { NavLink, useNavigate } from 'react-router-dom'

import stylesForm from './formStyles.module.css'

export function Autorization({ submitAdditionAction }) {
  const navigate = useNavigate()
  function gettingTokeen(values) {
    fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json()
        }
        throw Error('Error')
      })
      .then((user) => {
        localStorage.setItem('userToken', user.token)
        navigate('/')
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
            <button type="submit">
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>

  )
}
