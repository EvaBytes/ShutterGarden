import { configureStore } from '@reduxjs/toolkit';
import {favoriteReducer} from '../features/favoritesSlice.js';
import {homeReducer} from '../features/homeSlice.js';
import {unsplashReducer} from '../features/unsplashSlice.js';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    favorites: favoriteReducer,
    unsplash: unsplashReducer,
  },
});

