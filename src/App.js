import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";

import NavBar from './modules/Pages/Navbar/navbar.js';
import Index from './modules/Pages/Index/index.js';
import Login from './modules/Pages/Login/login.js';
import SignIn from './modules/Pages/Register/register.js';
import PageError from './modules/Pages/NotFound/notfound.js';

import './App.css';
import Dashboard from './modules/Pages/Dashboard/dashboard.js';
import Query from './modules/Pages/Query/query.js';
import QueryDisplay from './modules/Pages/Query/QueryDisplay/queryDisplay.js';

const checkAuth = () =>
{
  const token = localStorage.getItem('token');
   
  if(!token)
  {
    localStorage.setItem('login', false);
    return false;
  }

  try
  {
    const expired = isExpired(token);

    if(expired)
    {
      localStorage.setItem('login', false);
      return false;
    }
  }
  catch(e)
  {
    localStorage.setItem('login', false);
    return false;
  }

  return true;
}

const AuthRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    checkAuth() === true ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login'}} />
    )
  )} />
)

const DashRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    checkAuth() === true ? (
      <Redirect to={{ pathname: '/dashboard'}} />
    ) : (
      <Component {...props} />
    )
  )} />
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Switch>
              <DashRoute 
              path='/login'
              component={Login}/>
              <Route
              path="/sign_in"
              component={SignIn} />
              <AuthRoute 
              path='/dashboard'
              component={Dashboard}/>
              <AuthRoute 
              path='/query'
              component={Query}/>
              <AuthRoute 
              path='/query_display'
              component={QueryDisplay}/>
              <Route
              exact
              path="/"
              component={Index} />
            <Route component={PageError}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
