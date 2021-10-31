import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const savePlaylistToSpotify = createAsyncThunk(
  'playlistTracks/savePlaylist',
  async ({ userAccessToken, playlistName, trackUriList }) => {
    let userID;
    let playlistID;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userAccessToken,
    };

    try {
      const urlToFetch = 'https://api.spotify.com/v1/me';
      const response = await fetch(urlToFetch, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(`User ID: ${jsonResponse.id}`);
        userID = jsonResponse.id;

        const postResponse = await fetch(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              name: playlistName,
            }),
          }
        );
        if (postResponse.ok) {
          const postJsonResponse = await postResponse.json();
          console.log(`Playlist ID: ${postJsonResponse.id}`);
          playlistID = postJsonResponse.id;

          const postPostResponse = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                uris: trackUriList,
              }),
            }
          );
          if (postPostResponse.ok) {
            const postPostJsonResponse = await postPostResponse.json();
            console.log(`Snapshot ID: ${postPostJsonResponse}`);
          } else throw new Error('Playlist Track Update Request Failed!');
        } else throw new Error('Playlist Name Request Failed!');
      } else throw new Error('User ID Request Failed!');
    } catch (error) {
      console.log(error);
    }
  }
);

export const playlistTracksSlice = createSlice({
  name: 'playlistTracks',
  initialState: {
    playlistTracks: [],
    isSavingPlaylist: false,
    hasSavingError: false,
  },
  reducers: {
    addPlaylistTrack: (state, action) => {
      state.playlistTracks.push(action.payload);
    },
    removePlaylistTrack: (state, action) => {
      state.playlistTracks = state.playlistTracks.filter(
        (track) => track.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePlaylistToSpotify.pending, (state, action) => {
        state.isSavingPlaylist = true;
        state.hasSavingError = false;
      })
      .addCase(savePlaylistToSpotify.fulfilled, (state, action) => {
        state.isSavingPlaylist = false;
        state.hasSavingError = false;
        state.playlistTracks = [];
      })
      .addCase(savePlaylistToSpotify.rejected, (state, action) => {
        state.isSavingPlaylist = false;
        state.hasSavingError = true;
      });
  },
});

export const { addPlaylistTrack, removePlaylistTrack } =
  playlistTracksSlice.actions;
export const selectPlaylistTracks = (state) =>
  state.playlistTracks.playlistTracks;
export default playlistTracksSlice.reducer;
