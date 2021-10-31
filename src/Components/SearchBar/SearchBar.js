import React from 'react';
import './SearchBar.css';
import {
  selectIsLoggedIn,
  selectUserAccessToken,
} from '../../features/LoginToSpotify/loginToSpotifySlice';
import {
  clearSearchTerm,
  setSearchTerm,
} from '../../features/SearchTerm/searchTermSlice';
import {
  clearSearchResults,
  loadSearchResultsFromSpotify,
} from '../../features/SearchResultsTracks/searchResultsTracksSlice';
import { connect, useSelector } from 'react-redux';

const Searchbar = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userAccessToken = useSelector(selectUserAccessToken);

  const handleTermChange = (e) => {
    props.updateTerm(e.target.value);
  };

  const handleSearch = () => {
    if (props.searchTerm !== '' && isLoggedIn) {
      props.search(userAccessToken, props.searchTerm);
    }
  };

  const handleClear = () => {
    props.clearSearch();
  };

  return (
    <div className='search-bar'>
      <input
        value={props.searchTerm}
        placeholder='Enter A Song, Album, or Artist'
        onChange={handleTermChange}
      />
      <div className='buttons-container'>
        <button className='button' onClick={handleSearch}>
          SEARCH
        </button>
        <button className='button' onClick={handleClear}>
          CLEAR
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
    search: (userAccessToken, searchTerm) =>
      dispatch(loadSearchResultsFromSpotify({ userAccessToken, searchTerm })),
    clearSearch: () => {
      dispatch(clearSearchTerm());
      dispatch(clearSearchResults());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
