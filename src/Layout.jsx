import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { FavoritesList } from './pages/Favorites/FavoritesList.jsx';
import DeleteButton from './components/Buttons/DeleteButton.jsx';
import DownloadButton from './components/Buttons/DownloadButton.jsx';
import FavButton from './components/Buttons/FavButton.jsx';
import FilterFavorite from './components/Buttons/FilterFavorite.jsx';
import Gallery from './components/Gallery/Gallery.jsx'; 
import logo from './assets/ShutterGarden.png';
import './Layout.css';

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function Layout() {
  const Header = () => (
    <header className="layout-header">
      <img src={logo} alt="ShutterGarden Logo" className="logo" />
    </header>
  );

  const Main = ({ children }) => <main>{children}</main>;

  const homePageElement = (
    <HomePage
      accessKey={unsplashAccessKey}
      deleteButton={<DeleteButton />}
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
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={homePageElement} />
            <Route path="/favorites" element={favoritesPageElement} />
          </Routes>
        </Main>
      </BrowserRouter>
    </Provider>
  );
}

export default Layout;
