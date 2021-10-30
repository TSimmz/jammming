import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props){
    super(props);
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    const { isRemoval } = this.props;
    return ( 
      <button className='Track-action' onClick={isRemoval ? this.removeTrack : this.addTrack}>
        {isRemoval ? '-' : '+'}
      </button>
    );
  }

  render () {
    const { track } = this.props;
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}