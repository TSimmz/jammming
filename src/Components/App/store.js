import { configureStore } from '@reduxjs/toolkit';
import loginToSpotifyReducer from '../../features/LoginToSpotify/loginToSpotifySlice';
import searchTermReducer from '../../features/SearchTerm/searchTermSlice';
import searchResultsTracksReducer from '../../features/SearchResultsTracks/searchResultsTracksSlice';
import playlistTracksReducer from '../../features/PlaylistTracks/playlistTracksSlice';

export default configureStore({
  reducer: {
    loginToSpotify: loginToSpotifyReducer,
    searchTerm: searchTermReducer,
    searchResultsTracks: searchResultsTracksReducer,
    playlistTracks: playlistTracksReducer,
  },
});
