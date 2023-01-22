import {
  ADD_NEW_PRODUCT, CART_COUNTER_DECREMENT, CART_COUNTER_INCREMENT,
  CART_DELETE, CART_SELECT, CART_SELECT_ALL, CART_UNSELECT, CART_UNSELECT_ALL, DELETE_PRODUCTS,
} from '../types/cartTypes'

export const addNewProductAC = ({
  id, count, price, stock,
}) => ({
  type: ADD_NEW_PRODUCT,
  payload: {
    id,
    count,
    price,
    stock,
    selected: true,
  },
})

export const clearProductsAC = () => ({
  type: DELETE_PRODUCTS,
})
export const deleteFromCartAC = ({ id }) => ({
  type: CART_DELETE,
  payload: {
    id,
  },
})

export const incrementCartAC = ({ id }) => ({
  type: CART_COUNTER_INCREMENT,
  payload: {
    id,
  },
})

export const decrementCartAC = ({ id }) => ({
  type: CART_COUNTER_DECREMENT,
  payload: {
    id,
  },
})

export const selectCartAC = ({ id }) => ({
  type: CART_SELECT,
  payload: {
    id,
  },
})

export const unselectCartAC = ({ id }) => ({
  type: CART_UNSELECT,
  payload: {
    id,
  },
})

export const selectAllCartAC = () => ({
  type: CART_SELECT_ALL,
})

export const unselectAllCartAC = () => ({
  type: CART_UNSELECT_ALL,
})
