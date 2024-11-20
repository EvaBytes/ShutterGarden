import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const UNSPLASH_API_BASE_URL = 'https://api.unsplash.com';
const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchUnsplashImages = createAsyncThunk(
  'unsplash/fetchImages',
  async ({ query, page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${UNSPLASH_API_BASE_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${accessKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      return data.results; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);


const unsplashSlice = createSlice({
  name: 'unsplash',
  initialState: {
    images: [], 
    loading: false, 
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnsplashImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnsplashImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload; 
      })
      .addCase(fetchUnsplashImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default unsplashSlice.reducer;
