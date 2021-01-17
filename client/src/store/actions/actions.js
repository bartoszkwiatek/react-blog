import * as ACTION_TYPES from './action_types'

// const SUCCESS = {
//   type: ACTION_TYPES.SUCCESS
// }

// const FAILURE = {
//   type: ACTION_TYPES.FAILURE
// }


const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  }
}

const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  }
}



const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}


const add_profile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
}

const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  }
}

const user_input_change = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: text
  }
}

const user_input_submit = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text
  }
}

export { success, failure, login_success, login_failure, add_profile, remove_profile, user_input_change, user_input_submit }