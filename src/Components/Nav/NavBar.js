import React from 'react';
import './Navbar.css';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.handleLogin();
  }

  render() {
    const buttonStyle = {
      visibility: `${this.props.isLoggedIn ? 'hidden' : 'visible'}`,
    };

    return (
      <nav>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <button
          className='sign-in'
          onClick={this.handleLogin}
          style={buttonStyle}>
          LOG IN
        </button>
      </nav>
    );
  }
}
