import React, { useEffect } from 'react';
import './Navbar.css';
import { connect } from 'react-redux';
import {
  updateLoginState,
  updateUserAccessToken,
  updateAccessTokenExpiration,
} from '../../features/LoginToSpotify/loginToSpotifySlice';
import Spotify from '../../util/Spotify';

const Navbar = (props) => {
  useEffect(() => {
    const url = window.location.href;
    const foundAccess = url.match(/access_token=([^&]*)/);
    const foundExpiration = url.match(/expires_in=([^&]*)/);

    if (foundAccess && foundExpiration) {
      const token = foundAccess[1];
      const expiration = Number(foundExpiration[1]);

      props.updateUserAccessToken(token);
      props.updateAccessTokenExpiration(expiration);
      props.updateLogin(true);

      // window.setTimeout(() => {
      //   state.userAccessToken = '';
      // }, state.accessTokenExpiration * 1000);

      window.history.pushState('Access Token', null, '/');
    }
  });

  const buttonStyle = {
    visibility: `${props.isLoggedIn ? 'hidden' : 'visible'}`,
  };

  const handleLogin = () => {
    window.location = `${Spotify.AUTHORIZE_URL}?client_id=${Spotify.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${Spotify.REDIRECT_URI}`;
  };

  return (
    <nav>
      <h1>
        Ja<span className='highlight'>mmm</span>ing
      </h1>
      <button className='sign-in' onClick={handleLogin} style={buttonStyle}>
        LOG IN
      </button>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginToSpotify.isLoggedIn,
    userAccessToken: state.loginToSpotify.userAccessToken,
    accessTokenExpiration: state.loginToSpotify.accessTokenExpiration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLogin: (loggedIn) => dispatch(updateLoginState(loggedIn)),
    updateUserAccessToken: (userAccessToken) =>
      dispatch(updateUserAccessToken(userAccessToken)),
    updateAccessTokenExpiration: (expiration) =>
      dispatch(updateAccessTokenExpiration(expiration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
