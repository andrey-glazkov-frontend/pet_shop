import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { api } from '../../helpers/Api'

export function Registration() {
  const navigate = useNavigate()
  const navFunck = () => {
    navigate('/')
  }
  return (
    <Formik
      initialValues={{ email: '', group: '', password: '' }}
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
        api.signUp(values)
        navFunck()
      }}
    >
      {() => (
        <div className="modal">
          <Form>
            <h2>Регистрация</h2>
            <Field type="email" name="email" placeholder="Введите вашу почту" />
            <ErrorMessage name="email" component="div" />
            <Field type="text" name="group" placeholder="Введите вашу группу" />

            <Field type="password" name="password" placeholder="Пароль" />
            <ErrorMessage name="password" component="div" />
            <button type="submit">
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>

  )
}
