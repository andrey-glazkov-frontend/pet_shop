// import { combineReducers } from 'redux'
// import { cartReducer } from './cartReducer/cartReducer'
// import { searchReducer } from './searchReducer/searchReducer'

// export const rootReducer = combineReducers({
//   cart: cartReducer,
//   search: searchReducer,
// })

import { combineReducers } from '@reduxjs/toolkit'
import { cartSliceReducer } from '../slices/cartSlice'
import { LikesSliceReducer } from '../slices/likesSlice'
import { searchSliceReducer } from '../slices/searchSlice'
import { sortProductsReducer } from '../slices/sortProductSlice'
import { userSliceReducer } from '../slices/userSlice'

export const rootReducer = combineReducers({
  search: searchSliceReducer,
  cart: cartSliceReducer,
  like: LikesSliceReducer,
  sort: sortProductsReducer,
  user: userSliceReducer,

})
