import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectPlaylistTracks } from '../PlaylistTracks/playlistTracksSlice';

export const loadSearchResultsFromSpotify = createAsyncThunk(
  'searchResults/getSearchResults',
  async ({ userAccessToken, searchTerm }) => {
    const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    try {
      const response = await fetch(urlToFetch, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userAccessToken,
        },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        let tracklist = [];
        jsonResponse.tracks.items.forEach((track) => {
          tracklist.push({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          });
        });
        return tracklist;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchResultsTracksSlice = createSlice({
  name: 'searchResultsTracks',
  initialState: {
    searchResults: [],
    isLoadingResults: false,
    hasLoadingError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchResultsFromSpotify.pending, (state, action) => {
        state.isLoadingResults = true;
        state.hasLoadingError = false;
      })
      .addCase(loadSearchResultsFromSpotify.fulfilled, (state, action) => {
        state.isLoadingResults = false;
        state.hasLoadingError = false;
        state.searchResults = action.payload;
      })
      .addCase(loadSearchResultsFromSpotify.rejected, (state, action) => {
        state.isLoadingResults = false;
        state.hasLoadingError = true;
      });
  },
});

export const selectSearchResultsTracks = (state) =>
  state.searchResultsTracks.searchResults;
export const selectFilteredSearchResultsTracks = (state) => {
  const searchResultsTracks = selectSearchResultsTracks(state);
  const playlistTracks = selectPlaylistTracks(state);

  return searchResultsTracks.filter(
    (track) =>
      !playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)
  );
};
export default searchResultsTracksSlice.reducer;
