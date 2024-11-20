import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/homeSlice';
import favoritesReducer from '../features/favoritesSlice';
import unsplashReducer from '../features/unsplashSlice'; 

const store = configureStore({
  reducer: {
    homepage: homeReducer, 
    favorites: favoritesReducer, 
    unsplash: unsplashReducer,
  },
});

export default store;


