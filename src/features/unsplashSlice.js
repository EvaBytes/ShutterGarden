import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPhotos = createAsyncThunk(
  'unsplash/fetchPhotos',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const photos = await fetchUnsplashPhotos(query, page);
      return photos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const unsplashSlice = createSlice({
  name: 'unsplash',
  initialState: {
    photos: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.photos = action.payload; 
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default unsplashSlice.reducer;
