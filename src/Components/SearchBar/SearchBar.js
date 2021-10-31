import React from 'react';
import './SearchBar.css';
import {
  selectIsLoggedIn,
  selectUserAccessToken,
} from '../../features/LoginToSpotify/loginToSpotifySlice';
import { setSearchTerm } from '../../features/SearchTerm/searchTermSlice';
import { loadSearchResultsFromSpotify } from '../../features/SearchResultsTracks/searchResultsTracksSlice';
import { connect, useSelector } from 'react-redux';

const Searchbar = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userAccessToken = useSelector(selectUserAccessToken);

  const handleTermChange = (e) => {
    props.updateTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log(props.searchTerm);
    const searchTerm = props.searchTerm;
    if (props.searchTerm !== '' && isLoggedIn) {
      props.search({ userAccessToken, searchTerm });
    }
  };

  return (
    <div className='SearchBar'>
      <input
        value={props.searchTerm}
        placeholder='Enter A Song, Album, or Artist'
        onChange={handleTermChange}
      />
      <button className='SearchButton' onClick={handleSearch}>
        SEARCH
      </button>
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
      dispatch(loadSearchResultsFromSpotify(userAccessToken, searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);

// handleTermChange(event) {
//   this.setState({
//     searchTerm: event.target.value,
//   });
// }

// search() {
//   this.props.onSearch(this.state.searchTerm);
// }
