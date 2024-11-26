import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: { images: [], searchQuery: '' },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setImages, setSearchQuery } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;

