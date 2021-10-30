import React from 'react';
import './SearchBar.css';
import { selectUserAccessToken } from '../../features/LoginToSpotify/loginToSpotifySlice';
import { setSearchTerm } from '../../features/SearchTerm/searchTermSlice';
import { loadSearchResultsFromSpotify } from '../../features/SearchResultsTracks/searchResultsTracksSlice';
import { connect, useDispatch, useSelector } from 'react-redux';

const Searchbar = (props) => {
  const dispatch = useDispatch();
  const userAccessToken = useSelector(selectUserAccessToken);

  const handleTermChange = () => {
    dispatch(setSearchTerm(props.searchTerm));
  };

  const handleSearch = () => {
    const searchTerm = props.searchTerm;
    dispatch(
      loadSearchResultsFromSpotify({
        userAccessToken,
        searchTerm,
      })
    );
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
  console.log('Searchterm', state.searchTerm);
  return {
    searchTerm: state.searchTerm,
  };
};

export default connect(mapStateToProps)(Searchbar);

// handleTermChange(event) {
//   this.setState({
//     searchTerm: event.target.value,
//   });
// }

// search() {
//   this.props.onSearch(this.state.searchTerm);
// }
