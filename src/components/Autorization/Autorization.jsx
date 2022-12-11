import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'

import { NavLink } from 'react-router-dom'
import stylesForm from './formStyles.module.css'
import { api } from '../../helpers/Api'

export function Autorization({ submitAdditionAction }) {
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
      onSubmit={(values, { setSubmitting }) => {
        console.log(values.password)
        api.signIn(values).then((response) => {
          console.log(response)
        })

        setSubmitting(false)
        submitAdditionAction()
      }}
    >
      {({ isSubmitting }) => (
        <div className="modal">
          <Form>
            <h2>Войти</h2>
            <Field type="email" name="email" className={stylesForm.input} placeholder="Введите вашу почту" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" className={stylesForm.input} placeholder="Пароль" />
            <ErrorMessage name="password" component="div" />
            <NavLink to="./signin">Регистрация</NavLink>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>

  )
}
