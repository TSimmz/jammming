import React from 'react';
import './Track.css';
import {
  addPlaylistTrack,
  removePlaylistTrack,
  selectPlaylistTracks,
} from '../../features/PlaylistTracks/playlistTracksSlice';
import { useDispatch, useSelector } from 'react-redux';

const Track = ({ track, isRemoval }) => {
  const dispatch = useDispatch();
  const playlistTracks = useSelector(selectPlaylistTracks);

  const addTrack = () => {
    const foundTrack = playlistTracks.find(
      (savedTrack) => savedTrack.id === track.id
    );

    if (foundTrack) return;

    dispatch(addPlaylistTrack(track));
  };

  const removeTrack = () => {
    const foundTrack = playlistTracks.find(
      (savedTrack) => savedTrack.id === track.id
    );

    if (!foundTrack) {
      return;
    }

    dispatch(removePlaylistTrack(track));
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

export default Track;
