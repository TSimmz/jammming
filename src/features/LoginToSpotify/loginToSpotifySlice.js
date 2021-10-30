import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const CLIENT_ID = '26779370bf7d48fc9cb8127014196126';
export const REDIRECT_URI = 'http://localhost:3000/'; //'http://peanut-butter-and-jamming.surge.sh';
export const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

export const loginToSpotifySlice = createSlice({
  name: 'loginToSpotify',
  initialState: {
    userAccessToken: '',
    accessTokenExpiration: '',
  },
  reducers: {
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
        window.location = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      }
    },
  },
});

export const { getUserAccessToken } = loginToSpotifySlice.actions;
export const selectUserAccessToken = (state) => state.userAccessToken;
export const selectAccessTokenExpiration = (state) =>
  state.accessTokenExpiration;

export default loginToSpotifySlice.reducer;
