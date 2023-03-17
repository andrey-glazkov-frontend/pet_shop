/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../types/initialState/initialState'

const searchSlice = createSlice({
  name: 'search',
  initialState: getInitialState().search,
  reducers: {
    setSearch: (state, action) => action.payload,
  },
  clearSearch: (state) => {
    state.value = ''
  },
})

export const { setSearch, clearSearch } = searchSlice.actions
export const searchSliceReducer = searchSlice.reducer
