import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const {
  updateLoginState,
  updateUserAccessToken,
  updateAccessTokenExpiration,
} = loginToSpotifySlice.actions;
export const selectIsLoggedIn = (state) => state.loginToSpotify.isLoggedIn;
export const selectUserAccessToken = (state) =>
  state.loginToSpotify.userAccessToken;
export const selectAccessTokenExpiration = (state) =>
  state.loginToSpotify.accessTokenExpiration;

export default loginToSpotifySlice.reducer;
