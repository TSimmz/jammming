import { createSlice } from '@reduxjs/toolkit';

export const playlistNameSlice = createSlice({
  name: 'playlistName',
  initialState: '',
  reducers: {
    setPlaylistName: (state, action) => (state = action.payload),
    clearPlaylistName: (state) => (state = ''),
  },
});

export const { setPlaylistName, clearPlaylistName } = playlistNameSlice.actions;
export const selectPlaylistName = (state) => state.playlistName;
export default playlistNameSlice.reducer;
