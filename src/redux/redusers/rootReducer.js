// import { combineReducers } from 'redux'
// import { cartReducer } from './cartReducer/cartReducer'
// import { searchReducer } from './searchReducer/searchReducer'

// export const rootReducer = combineReducers({
//   cart: cartReducer,
//   search: searchReducer,
// })

import { combineReducers } from '@reduxjs/toolkit'
import { cartSliceReducer } from '../slices/cartSlice'
import { searchSliceReducer } from '../slices/searchSlice'

export const rootReducer = combineReducers({
  search: searchSliceReducer,
  cart: cartSliceReducer,
})
