import React from 'react';
import { connect } from 'react-redux';
import Track from '../Track/Track.js';
import './TrackList.css';
import { selectPlaylistTracks } from '../../features/PlaylistTracks/playlistTracksSlice.js';
import { selectFilteredSearchResultsTracks } from '../../features/SearchResultsTracks/searchResultsTracksSlice.js';

const Tracklist = ({ tracks, isRemoval }) => {
  return (
    <div className='TrackList'>
      {tracks.map((track) => {
        return <Track key={track.id} track={track} isRemoval={isRemoval} />;
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const tracks = ownProps.playlist
    ? selectPlaylistTracks(state)
    : selectFilteredSearchResultsTracks(state);

  const isRemoval = ownProps.playlist ? true : false;
  return {
    tracks: tracks,
    isRemoval: isRemoval,
  };
};

export default connect(mapStateToProps)(Tracklist);
