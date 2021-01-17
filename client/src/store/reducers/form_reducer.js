import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  user_textChange: '',
  user_textSubmit: ''
}

const FormReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER_INPUT_CHANGE:
      return {
        ...state,
        user_textChange: action.payload
      }

    case ACTION_TYPES.USER_INPUT_SUBMIT:
      return {
        ...state,
        user_textSubmit: action.payload
      }

    default:
      throw new Error();
  }
}

export { initialState, FormReducer }