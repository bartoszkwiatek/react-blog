import * as ACTION_TYPES from '../actions/action_types'

const initialState = {
  stateprop1: false,
  stateprop2: false
}

const Reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        stateprop1: true,
        stateprop2: true
      }
    case ACTION_TYPES.FAILURE:
      return {
        ...state,
        stateprop1: false,
        stateprop2: false
      }
    default:
      throw new Error();
  }
}

export { initialState, Reducer1 }