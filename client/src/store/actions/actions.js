import * as ACTION_TYPES from './action_types'

// const SUCCESS = {
//   type: ACTION_TYPES.SUCCESS
// }

// const FAILURE = {
//   type: ACTION_TYPES.FAILURE
// }

const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS,
  }
}

const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE,
  }
}

const user_input_change = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: text,
  }
}

const user_input_submit = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text,
  }
}

export { success, failure, user_input_change, user_input_submit }
