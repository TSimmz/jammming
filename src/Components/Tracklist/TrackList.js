import React from 'react';
import { connect } from 'react-redux';
import Track from '../Track/Track.js';
import './TrackList.css';
import { selectPlaylistTracks } from '../../features/PlaylistTracks/playlistTracksSlice.js';
import { selectSearchResultsTracks } from '../../features/SearchResultsTracks/searchResultsTracksSlice.js';

const Tracklist = (props) => {
  return (
    <div className='TrackList'>
      {props.tracks.map((track) => {
        return (
          <Track key={track.id} track={track} isRemoval={props.isRemoval} />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let tracks = ownProps.playlist
    ? selectPlaylistTracks(state)
    : selectSearchResultsTracks(state);

  if (!tracks) tracks = [];

  const isRemoval = ownProps.playlist ? true : false;
  return {
    tracks: tracks,
    isRemoval: isRemoval,
  };
};

export default connect(mapStateToProps)(Tracklist);
