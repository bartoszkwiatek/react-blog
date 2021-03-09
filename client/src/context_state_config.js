import React, { useReducer } from 'react'
import Context from './utils/context'
import * as ACTIONS from './store/actions/actions'

// import * as Reducer1 from './store/reducers/plain_reducer';
import * as AuthReducer from './store/reducers/auth_reducer'
import * as FormReducer from './store/reducers/form_reducer'
import Routes from './Routes'

const ContextState = () => {
  // /*
  //     Plain Reducer
  // */
  // const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1,
  //                                                      Reducer1.initialState)

  // const handleDispatchTrue = () => {
  //   //    dispatchReducer1(type: "SUCCESS")
  //   //    dispatchReducer1(ACTIONS.SUCCESS)
  //   dispatchReducer1(ACTIONS.success())
  // }

  // const handleDispatchFalse = () => {
  //   //     dispatchReducer1(type: "FAILURE")
  //   //    dispatchReducer1(ACTIONS.FAILURE)
  //   dispatchReducer1(ACTIONS.failure())
  // }

  /*
    Auth Reducer
  */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState,
  )

  /*
    Form Reducer
  */

  const [stateFormReducer, dispatchFormReducer] = useReducer(
    FormReducer.FormReducer,
    FormReducer.initialState,
  )

  const handleFormChange = (event) => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    event.persist()
    dispatchFormReducer(
      ACTIONS.user_input_submit(event.target.useContext.value),
    )
  }

  //Handle authentication from callback
  const handleAuthentication = (props) => {
    if (props.location.hash) {
      // auth.handleAuth()
    }
  }

  return (
    <Context.Provider
      value={{
        //Reducer1
        // stateProp1: stateReducer1.stateprop1,
        // stateProp2: stateReducer1.stateprop2,
        // dispatchContextTrue: () => handleDispatchTrue(),
        // dispatchContextFalse: () => handleDispatchFalse(),

        //Form Reducer
        useContextChangeState: stateFormReducer.user_textChange,
        useContextSubmitState: stateFormReducer.user_textSubmit,
        useContextSubmit: (event) => handleFormSubmit(event),
        useContextChange: (event) => handleFormChange(event),

        //Auth Reducer
        authState: stateAuthReducer.is_authenticated,
        profileState: stateAuthReducer.profile,
        //Handle auth
        handleAuth: (props) => handleAuthentication(props),
        // authObj: auth
      }}
    >
      <Routes />
    </Context.Provider>
  )
}

export default ContextState
