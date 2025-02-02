import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './app/store.js';
import {HomePage} from './pages/HomePage/HomePage.jsx';
import {FavoritesList} from './pages/Favorites/FavoritesList.jsx';
import {DeleteButton} from './components/Buttons/DeleteButton.jsx';
import {DownloadButton} from './components/Buttons/DownloadButton.jsx';
import {FavButton} from './components/Buttons/FavButton.jsx';
import { FilterFavorite } from './components/Buttons/FilterFavorite.jsx';
import {Gallery} from './components/Gallery/Gallery.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import logo from './assets/ShutterGarden.png';
import './Layout.css';

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const Header = () => (
  <header className="layout-header">
    <img src={logo} alt="ShutterGarden Logo" className="logo" />
  </header>
);

const MainLayout = () => (
  <>
    <Header />
    <main className="main-content">
      <Outlet /> 
    </main>
    <Footer />
  </>
);

export default function Layout() {
  const homePageElement = (
    <HomePage
      accessKey={unsplashAccessKey}
      downloadButton={<DownloadButton />}
      favButton={<FavButton />}
      gallery={<Gallery />}
    />
  );

  const favoritesPageElement = (
    <FavoritesList
      filterFavorite={<FilterFavorite />}
      deleteButton={<DeleteButton />}
      gallery={<Gallery />}
    />
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={homePageElement} />
            <Route path="favorites" element={favoritesPageElement} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
