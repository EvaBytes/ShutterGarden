import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homepage',
  initialState: { message: 'Welcome to the homepage!' },
  reducers: {
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { updateMessage } = homeSlice.actions; 
export default homeSlice.reducer;
