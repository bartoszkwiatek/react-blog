import { Container, Divider } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExternalApi from './ExternalApi/ExternalApi';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import NavBar from './Header/NavBar';
import Home from './Home/Home';
import PostDetails from './PostDetails/PostDetails';
import Profile from './Profile/Profile';
import Context from './utils/context';

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
    <Router>
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
      <br />
      <Divider>
      </Divider>
      <br />
      <Footer></Footer>
    </Router>
  )
}

export default Routes;