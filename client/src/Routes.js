import React, { useContext } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
// import HooksContainer1 from './hooks/hook1';
import Callback from './Callback/Callback';
import Header from './Header/Header';
import Home from './Home/Home';
import PostDetails from './PostDetails/PostDetails';
// import HooksForm from './hooks/hooks_form1';
import PrivateComponent from './PrivateComponents/PrivateComponent';
import Profile from './Profile/Profile';
import Context from './utils/context';
import history from './utils/history';




// const PrivateRoute = ({ component: Component, auth }) => (
//   <Route render={props => auth === true
//     ? <Component auth={auth} {...props} />
//     : <Redirect to={{ pathname: '/' }} />
//   }
//   />
// )



const Routes = () => {
  const context = useContext(Context)


  return (
    <div>
      <Router history={history} >
        <Header />
        <br />
        <div>
          <Switch>
            <Route path='/posts/:_id' component={PostDetails}></Route>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />

            {/* <Route path='/hooksform' component={HooksForm} /> */}
            {/* <Route path='/hookscontainer' component={HooksContainer1} /> */}
            {/* <Route path='/authcheck' component={AuthCheck} /> */}

            {/* <PrivateRoute path='/privateroute'
              auth={context.authState}
              component={PrivateComponent} />
            <PrivateRoute path="/profile"
              auth={context.authState}
              component={Profile} /> */}
            <Route path='/callback'
              render={(props) => {
                // context.handleAuth(props); return <Callback />
              }} />

          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Routes;