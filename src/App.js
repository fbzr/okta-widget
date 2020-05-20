import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Login from './components/auth/Login';

import './App.css';

const onAuthRequired = ({ history }) => {
  history.push('/login');
}

const App = () => (
  <Router>
    <Security 
      issuer={`${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`}
      client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
      redirect_uri={window.location.origin + '/implicit/callback'}
      onAuthRequired={onAuthRequired}
    >
      <div className="App">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Home} />
          <SecureRoute exact path="/dashboard" component={Dashboard} />
          <Route
            path="/login"
            render={() => (
              <Login baseUrl={process.env.REACT_APP_OKTA_DOMAIN} />
            )}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
        </div>
      </div>
    </Security>
  </Router>
);

export default App;
