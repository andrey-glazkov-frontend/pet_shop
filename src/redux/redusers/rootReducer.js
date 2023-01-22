import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer/cartReducer'
import { searchReducer } from './searchReducer/searchReducer'

export const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
})
