/* eslint-disable no-underscore-dangle */
import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../../helpers/Api'
import Loader from '../Loader/Loader'
import styles from './AddProduct.module.css'

export function AddProduct() {
  const navigate = useNavigate()

  const navOnSuccess = (response) => {
    navigate(`/products/${response._id}`)
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => api.addProds(data),
    onSuccess: navOnSuccess,
  })
  if (isLoading) return <Loader />

  return (
    <Formik
      initialValues={{
        name: '',
        price: '',
        discount: '',
        stock: '',
        pictures: '',
        description: '',
        wight: '',
      }}
      validationSchema={Yup.object(
        {
          name: Yup.string()
            .min(2, 'Слишком коротоке имя (минимум 2)')
            .max(60, 'Слишком длинное имя (максимум 60')
            .required('Пожалуйста введите имя'),
          price: Yup.number()
            .min(1, 'Минимальное значение 1 символ')
            .required('Пожалуйста заполните поле'),
          discount: Yup.number()
            .min(0, 'Проставте скидку пожалуйста'),
          stock: Yup.number()
            .min(1, 'Минимальное значение 1 товар'),
          wight: Yup.string()
            .min(1, 'Минимальное значение 1 символ')
            .max(20, 'Максимальное значение 20 символов'),
          pictures: Yup.string().url()
            .min(1, 'Минимальное значение 1 символ')
            .max(200, 'Максимальное значение 200 символов')
            .required('Пожалуйста, добавте картинку'),
          description: Yup.string()
            .min(4, 'Минимальное количество символов 4')
            .max(600, 'Максимальное значение 600 символов')
            .required('Пожалуйста заполните поле описания'),
        },
      )}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      <div className={`${styles.container} ${styles.row}`}>
        <Form name="addProds" className={styles.input_group}>
          <div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>

              <Field className={styles.decoration} name="name" type="text" placeholder="Введите название товара" />
              <ErrorMessage component="span" name="name" />
            </div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <Field className={styles.decoration} name="price" type="number" placeholder="Введите цену" />
              <ErrorMessage component="span" name="price" />
            </div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <Field className={styles.decoration} name="discount" type="number" placeholder="Введите скидку" />
              <ErrorMessage component="span" name="discount" />
            </div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <Field className={styles.decoration} name="stock" type="number" placeholder="Введите количество на складе" />
              <ErrorMessage component="span" name="stock" />
            </div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <Field className={styles.decoration} name="wight" type="text" placeholder="Введите вес" />
              <ErrorMessage component="span" name="wight" />
            </div>
          </div>
          <div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <Field className={styles.decoration} name="pictures" type="url" placeholder="Вставте Url кртинки" />
              <ErrorMessage component="span" name="pictures" />
            </div>
            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
              <Field className={styles.decoration} name="description" type="text" placeholder="Введите описание продукта" />
              <ErrorMessage component="span" name="description" />
            </div>
            <div className={styles.input_group}>

              <button disabled={isLoading} type="submit" className={`${styles.add_to_cart} btn btn-default me-3`}>Добавить товар</button>
            </div>
          </div>
        </Form>
      </div>
    </Formik>
  )
}
