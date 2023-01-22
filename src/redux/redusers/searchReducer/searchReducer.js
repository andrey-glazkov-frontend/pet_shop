/* eslint-disable default-param-last */
import { SEARCH } from '../../types/searchTypes'

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case SEARCH:
      return action.payload.searchString
    default:
      return state
  }
}
