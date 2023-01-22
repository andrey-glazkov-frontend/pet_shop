import { SEARCH } from '../../types/searchTypes'

export const searchAC = (searchString) => ({
  type: SEARCH,
  payload: {
    searchString,
  },
})
