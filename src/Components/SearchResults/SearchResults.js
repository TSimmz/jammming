import React from 'react';
import './SearchResults.css';
import TrackList from '../Tracklist/TrackList.js';
import { connect } from 'react-redux';

const Loading = () => {
  return (
    <div className='loading'>
      <p>Loading Spotify Tracks...</p>
    </div>
  );
};

const SearchResults = (props) => {
  return (
    <div className='search-results'>
      <h2>Results</h2>
      {props.isLoadingResults ? <Loading /> : <TrackList />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadingResults: state.searchResultsTracks.isLoadingResults,
  };
};

export default connect(mapStateToProps)(SearchResults);
