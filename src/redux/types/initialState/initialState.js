export const initialState = {
  cart: [],
  search: '',
  user: {
    token: '',
    user: {},
  },
  like: [],
  sort: {
    value: '',
  },
}

export const REDUX_LS_KEY = 'REDUX_LS_KEY'

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)

  return stateLS ? JSON.parse(stateLS) : initialState
}
