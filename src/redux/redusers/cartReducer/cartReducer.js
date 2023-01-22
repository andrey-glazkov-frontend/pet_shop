/* eslint-disable default-param-last */
// /* eslint-disable no-underscore-dangle */
// /* eslint-disable default-param-last */
import {
  ADD_NEW_PRODUCT, CART_COUNTER_DECREMENT,
  CART_COUNTER_INCREMENT, CART_DELETE, CART_SELECT, CART_SELECT_ALL,
  CART_UNSELECT, CART_UNSELECT_ALL, DELETE_PRODUCTS,
} from '../../types/cartTypes'

export const cartReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_NEW_PRODUCT: {
      const arr = [...state]
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].id === action.payload.id) {
          arr[i].count += 1
          return arr
        }
      }
      return [...state, action.payload] }
    case DELETE_PRODUCTS:
      return []
    case CART_DELETE:
      return state.filter((el) => el.id !== action.payload.id)
    case CART_COUNTER_INCREMENT:
      return state
        .map((el) => (el.id === action.payload.id && el.count < el.stock ? {
          ...el,
          count: el.count + 1,
        } : el))
    case CART_COUNTER_DECREMENT:
      return state
        .map((el) => (el.id === action.payload.id && el.count !== 0 ? {
          ...el,
          count: el.count - 1,
        } : el))
        .filter((el) => el.count > 0)
    case CART_SELECT:
      return state
        .map((el) => (el.id === action.payload.id ? {
          ...el,
          selected: true,
        } : el))
    case CART_UNSELECT:
      return state
        .map((el) => (el.id === action.payload.id ? {
          ...el,
          selected: false,
        } : el))
    case CART_SELECT_ALL:
      return state
        .map((el) => ({ ...el, selected: true }))
    case CART_UNSELECT_ALL:
      return state
        .map((el) => ({ ...el, selected: false }))

    default:
      return state
  }
}
