import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  is_authinticated: false,
  profile: null,
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export { initialState, AuthReducer }
