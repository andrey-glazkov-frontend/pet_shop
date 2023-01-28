/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../types/initialState/initialState'

const searchSlice = createSlice({
  name: 'search',
  initialState: getInitialState().search,
  reducers: {
    setSearch: (state, action) => action.payload,
    // clearSearch: (state) => {
    //   state = null
    // },
  },
})

export const { setSearch } = searchSlice.actions
export const searchSliceReducer = searchSlice.reducer
