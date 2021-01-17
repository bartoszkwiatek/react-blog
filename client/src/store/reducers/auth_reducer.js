import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  is_authinticated: false,
  profile: null
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        is_authinticated: true
      }

    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        is_authinticated: false
      }

    case ACTION_TYPES.ADD_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    case ACTION_TYPES.REMOVE_PROFILE:
      return {
        ...state,
        profile: null
      }

    default:
      return state

  }
}

export { initialState, AuthReducer }