import React from 'react';
import './Track.css';
import {
  addPlaylistTrack,
  removePlaylistTrack,
} from '../../features/PlaylistTracks/playlistTracksSlice';
import { connect } from 'react-redux';

const Track = (props) => {
  const {
    track,
    isRemoval,
    playlistTracks,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  } = props;

  const addTrack = () => {
    const foundTrack =
      Array.isArray(playlistTracks) &&
      playlistTracks.find((savedTrack) => savedTrack.id === track.id);

    if (foundTrack) return;
    addTrackToPlaylist(track);
  };

  const removeTrack = () => {
    const foundTrack = playlistTracks.find(
      (savedTrack) => savedTrack.id === track.id
    );

    if (!foundTrack) {
      return;
    }

    removeTrackFromPlaylist(track);
  };

  const renderAction = () => {
    return (
      <button
        className='Track-action'
        onClick={isRemoval ? removeTrack : addTrack}>
        {isRemoval ? '-' : '+'}
      </button>
    );
  };

  return (
    <div className='Track'>
      <div className='Track-information'>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    playlistTracks: state.playlistTracks.playlistTracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTrackToPlaylist: (track) => dispatch(addPlaylistTrack(track)),
    removeTrackFromPlaylist: (track) => dispatch(removePlaylistTrack(track)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
