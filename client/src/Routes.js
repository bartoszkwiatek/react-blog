import React, { useContext } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
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
import ExternalApi from './ExternalApi/ExternalApi'
import NavBar from './Header/NavBar'
import { Container } from '@chakra-ui/react';




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
    <Router history={history}>
      <Header />
      <Container className="App">

        <NavBar />

        <br />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/posts/:_id' component={PostDetails}></Route>
          <Route path='/profile' component={Profile} />
          <Route path="/external-api" component={ExternalApi} />

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
      </Container>
    </Router>
  )
}

export default Routes;