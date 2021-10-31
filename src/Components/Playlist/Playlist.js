import React from 'react';
import { connect, useSelector } from 'react-redux';
import { selectUserAccessToken } from '../../features/LoginToSpotify/loginToSpotifySlice.js';
import { setPlaylistName } from '../../features/PlaylistName/playlistNameSlice.js';
import {
  savePlaylistToSpotify,
  selectPlaylistTracks,
} from '../../features/PlaylistTracks/playlistTracksSlice.js';
import TrackList from '../Tracklist/TrackList.js';
import './Playlist.css';

const Playlist = (props) => {
  const playlistTracks = useSelector(selectPlaylistTracks);
  const userAccessToken = useSelector(selectUserAccessToken);

  const handleNameChange = (e) => {
    props.updatePlaylistName(e.target.value);
  };

  const handlePlaylistSave = () => {
    const playlistName = props.playlistName;

    let trackUriList = [];
    playlistTracks.forEach((track) => trackUriList.push(track.uri));

    if (playlistName && trackUriList.length !== 0) {
      props.savePlaylist(userAccessToken, playlistName, trackUriList);
    }
  };

  return (
    <div className='Playlist'>
      <input
        value={props.playlistName}
        placeholder='Enter Playlist Name'
        onChange={handleNameChange}
      />
      <TrackList playlist />
      <button className='Playlist-save' onClick={handlePlaylistSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playlistName: state.playlistName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlaylistName: (playlistName) =>
      dispatch(setPlaylistName(playlistName)),
    savePlaylist: (userAccessToken, playlistName, trackUriList) =>
      dispatch(
        savePlaylistToSpotify({ userAccessToken, playlistName, trackUriList })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
