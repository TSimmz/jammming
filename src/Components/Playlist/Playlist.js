import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectUserAccessToken } from '../../features/LoginToSpotify/loginToSpotifySlice.js';
import { setPlaylistName } from '../../features/PlaylistName/playlistNameSlice.js';
import {
  savePlaylistToSpotify,
  selectPlaylistTracks,
} from '../../features/PlaylistTracks/playlistTracksSlice.js';
import TrackList from '../Tracklist/TrackList.js';
import './Playlist.css';

const Playlist = (props) => {
  const dispatch = useDispatch();
  const playlistTracks = useSelector(selectPlaylistTracks);
  const userAccessToken = useSelector(selectUserAccessToken);

  const handleNameChange = () => {
    dispatch(setPlaylistName(props.playlistName));
  };

  const handlePlaylistSave = () => {
    const playlistName = props.playlistName;
    let trackURIs = [];
    playlistTracks.forEach((track) => trackURIs.push(track.uri));

    if (trackURIs.length !== 0) {
      dispatch(
        savePlaylistToSpotify({
          userAccessToken,
          playlistName,
          trackURIs,
        })
      );
    }
  };

  return (
    <div className='Playlist'>
      <input value={props.playlistName} onChange={handleNameChange} />
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

export default connect(mapStateToProps)(Playlist);
