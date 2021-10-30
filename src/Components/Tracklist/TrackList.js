import React from 'react';
import { Track } from '../Track/Track.js';
import './TrackList.css'

export class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks;
    return (
      <div className='TrackList'>
        {tracks.map(track => {
          return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
        })}
      </div>
    );
  }
}