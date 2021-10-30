import React from 'react';
import './App.css';
import { Navbar } from '../Nav/NavBar';
import { Spotify } from '../../util/Spotify';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      isLoggedIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Checks if we have the access token and redirects to spotify if not
  handleLogin() {
    const accessToken = Spotify.getAccessToken();
    this.setState({ isLoggedIn: accessToken !== undefined });
  }

  // Adds a track to the playlist via the + button on the Search Results buttons
  addTrack(track) {
    const { playlistTracks } = this.state;
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    this.setState({
      playlistTracks: [...playlistTracks, track],
    });
  }

  // Removes a track from the playlist via the - button
  removeTrack(track) {
    const foundTrack = this.state.playlistTracks.find(
      (savedTrack) => savedTrack.id === track.id
    );
    if (!foundTrack) {
      return;
    }

    const playlistTracks = this.state.playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );

    this.setState({
      playlistTracks: playlistTracks,
    });
  }

  // Updates the playlist name as the user types
  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  // Saves the playlist to the user's Spotify account
  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.forEach((track) => trackURIs.push(track.uri));

    if (trackURIs.length !== 0) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
        });
      });
    }
  }

  // Performs the search in the Spotify API and updates the state
  search(searchTerm) {
    Spotify.search(searchTerm).then((results) => {
      if (results) {
        this.setState({
          searchResults: results,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar
          isLoggedIn={this.state.isLoggedIn}
          handleLogin={this.handleLogin}
        />
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
