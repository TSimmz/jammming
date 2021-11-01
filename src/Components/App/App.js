import React from 'react';
import './App.css';
import Navbar from '../Nav/NavBar';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='app'>
        <SearchBar />
        <div className='app-playlist'>
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </>
  );
};

export default App;
