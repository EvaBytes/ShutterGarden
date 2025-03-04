import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImages = createAsyncThunk(
  'unsplash/fetchImages',
  async ({ query, page, per_page = 12 }, { rejectWithValue }) => {
    const clientId = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const endpoint = query
      ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${per_page}&client_id=${clientId}`
      : `https://api.unsplash.com/photos?page=${page}&per_page=${per_page}&client_id=${clientId}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return query ? data.results : data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const unsplashSlice = createSlice({
  name: 'unsplash',
  initialState: { images: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchImages.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchImages.fulfilled, (state, action) => {
            const newImages = action.payload.filter(
                (newImage) => !state.images.some((existingImage) => existingImage.id === newImage.id)
            );
            state.images = [...state.images, ...newImages]; 
            state.loading = false;
        })
        .addCase(fetchImages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
      },
});

export const { setImages } = unsplashSlice.actions;
export const unsplashReducer = unsplashSlice.reducer;