import { createSlice } from '@reduxjs/toolkit';

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    setSearchTerm: (state, action) => (state = action.payload),
    clearSearchTerm: (state) => (state = ''),
  },
});

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export const selectSearchTerm = (state) => state.searchTerm;
export default searchTermSlice.reducer;
