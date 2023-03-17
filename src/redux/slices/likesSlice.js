import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../types/initialState/initialState'

const LikesSlice = createSlice({
  name: 'likes',
  initialState: getInitialState().like,
  reducers: {
    likeProd: (state, action) => {
      state.push(action.payload)
    },

    disLikeProd: (state, action) => state.filter((id) => id !== action.payload),
    clearFavoriteList: () => [],

  },

})

export const {
  likeProd, disLikeProd, clearFavoriteList,
} = LikesSlice.actions
export const LikesSliceReducer = LikesSlice.reducer
