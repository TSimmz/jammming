import React from 'react';
import './SearchResults.css';
import TrackList from '../Tracklist/TrackList.js';

const SearchResults = () => {
  return (
    <div className='SearchResults'>
      <h2>Results</h2>
      <TrackList />
    </div>
  );
};

export default SearchResults;
