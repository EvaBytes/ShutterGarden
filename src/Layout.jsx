import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store.js'; 
import { HomePage } from './pages/HomePage/HomePage'; 
import { FavoritesList } from './pages/Favorites/FavoritesList'; 
import './Layout.css';
import logo from './assets/ShutterGarden.png';

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function Layout() { 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <header className="layout-header">
          <img src={logo} alt="ShutterGarden Logo" className="logo" />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage accessKey={unsplashAccessKey} />} />
            <Route path="/favorites" element={<FavoritesList />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default Layout;
