import React, { Component } from 'react';

class Dashboard extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: ''
  };

  componentDidMount() {
    const oktaToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: oktaToken.idToken.claims.email,
      currentUserName: oktaToken.idToken.claims.name
    });
  }

  render() {
    const { currentUserEmail, currentUserName } = this.state;

    return (
      <div>
        <h1>Welcome {currentUserName}</h1>
        <p>Email: {currentUserEmail}</p>
        <p>You have reached the authorized staff area of the portal</p>
      </div>
    );
  }
}

export default Dashboard;
