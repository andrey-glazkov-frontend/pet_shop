/* Версия хранилища на чистом Redux

import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from '../redusers/rootReducer'
import { initialState } from './initialState/initialState'

if (localStorage.getItem('cart') !== null) {
  initialState.cart = JSON.parse(localStorage.getItem('cart'))
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(
  applyMiddleware(thunk),
))

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart))
  console.log(store.getState())
})
*/

import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../redusers/rootReducer'
import { REDUX_LS_KEY } from './initialState/initialState'

export const store = configureStore({
  reducer: rootReducer,
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
