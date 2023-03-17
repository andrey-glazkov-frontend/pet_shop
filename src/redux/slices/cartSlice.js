/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../types/initialState/initialState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState().cart,
  reducers: {
    addNewProduct(state, action) {
      const itemInCart = state.find((obj) => obj.id === action.payload.id)
      if (itemInCart) {
        itemInCart.count += 1
      } else {
        state.push({
          ...action.payload,
          count: 1,
          selected: true,
        })
      }
    },
    cartCounterIncrement(state, action) {
      const itemInCart = state.find((item) => item.id === action.payload)

      if (itemInCart) {
        itemInCart.count += 1
      }
    },
    cartCounterDecrement(state, action) {
      const itemInCart = state.find((item) => item.id === action.payload)

      if (itemInCart) {
        itemInCart.count -= 1
      }
    },
    cartSelect(state, action) {
      const itemInCart = state.find((item) => item.id === action.payload)
      if (itemInCart) {
        itemInCart.selected = !itemInCart.selected
      }
    },
    deleteProduct(state, action) {
      return state.filter((item) => item.id !== action.payload)
    },
    deleteAllProducts() {
      return []
    },
    cartSelectAll(state, action) {
      state.forEach((item) => { item.selected = action.payload })
    },

  },
})

export const {
  addNewProduct, cartSelect, deleteProduct, deleteAllProducts,
  cartSelectAll, cartCounterIncrement, cartCounterDecrement,
} = cartSlice.actions
export const cartSliceReducer = cartSlice.reducer
