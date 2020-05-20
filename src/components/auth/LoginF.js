import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withAuth } from '@okta/okta-react';

const LogIn = () => {
    
}

export default withAuth(props => {
    console.log('loginF props: ', props);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthentication();
    }, [authenticated]);

    const checkAuthentication = async () => {
      const isAuthenticated = await props.auth.isAuthenticated();
      if (isAuthenticated !== authenticated) {
        setAuthenticated(isAuthenticated);
      }
    }

    const onSuccess = res => {
      console.log('onSuccess res: ', res);
      return this.props.auth.redirect({
        sessionToken: res.session.token
      });
    };

    const onError = err => {
      console.log('error logging in', err);
    };

    return ( authenticated ?
        <Redirect to={{ pathname: '/dashboard' }} />
        :
        <SignInWidget
          baseUrl={this.props.baseUrl}
          onSuccess={onSuccess}
          onError={onError}
        />
    );
  }
);
