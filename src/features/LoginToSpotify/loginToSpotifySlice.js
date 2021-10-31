import { createSlice } from '@reduxjs/toolkit';
import Spotify from '../../util/Spotify';

export const loginToSpotifySlice = createSlice({
  name: 'loginToSpotify',
  initialState: {
    isLoggedIn: false,
    userAccessToken: '',
    accessTokenExpiration: 0,
  },
  reducers: {
    updateLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateUserAccessToken: (state, action) => {
      state.userAccessToken = action.payload;
    },
    updateAccessTokenExpiration: (state, action) => {
      state.accessTokenExpiration = action.payload;
    },
    getUserAccessToken: (state, action) => {
      if (state.userAccessToken !== '') return state.userAccessToken;

      // If we don't have it, check URL
      const url = window.location.href;
      const foundAccess = url.match(/access_token=([^&]*)/);
      const foundExpiration = url.match(/expires_in=([^&]*)/);

      if (foundAccess && foundExpiration) {
        state.userAccessToken = foundAccess[1];
        state.accessTokenExpiration = Number(foundExpiration[1]);

        window.setTimeout(() => {
          state.userAccessToken = '';
        }, state.accessTokenExpiration * 1000);

        window.history.pushState('Access Token', null, '/');

        return state.userAccessToken;
      } else {
        console.log('Attempting to authorize...');
        window.location = `${Spotify.AUTHORIZE_URL}?client_id=${Spotify.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${Spotify.REDIRECT_URI}`;
      }
    },
  },
});

export const {
  updateLoginState,
  updateUserAccessToken,
  updateAccessTokenExpiration,
  getUserAccessToken,
} = loginToSpotifySlice.actions;
export const selectIsLoggedIn = (state) => state.loginToSpotify.isLoggedIn;
export const selectUserAccessToken = (state) =>
  state.loginToSpotify.userAccessToken;
export const selectAccessTokenExpiration = (state) =>
  state.loginToSpotify.accessTokenExpiration;

export default loginToSpotifySlice.reducer;
