import React from 'react';
import PropTypes from 'prop-types';
import './track-list.component.scss';

class TrackList extends React.Component {
  msToTime(ms) {
    const s = ms / 1000; // to second;
    const minutes = Math.floor(s / 60);
    let seconds = Math.round(s % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  }

  selectColumn(id) {
    return (
      <div className="tracklist__select-column">
        <input
          type="checkbox"
          id={id}
          checked={this.props.selected.indexOf(id) >= 0}
          onChange={this.props.onTrackSelectChange} />
      </div>
    );
  }

  trackName(track) {
    return (
      <label htmlFor={track.id} className="tracklist__name-column">
        <div className="track-wrapper ellipsis-one-line">
          <span className="track__name">{track.name}</span>
          <span className="track__description ellipsis-one-line">
            <span className="track__artist">
              {track.artists.map(artist => artist.name).join(', ')}
            </span>
          </span>
        </div>
      </label>
    );
  }

  timeColumn(duration) {
    return (
      <div className="tracklist__duration-column">
        <span>{this.msToTime(duration)}</span>
      </div>
    );
  }

  render() {
    const { tracks, noSelect } = this.props;

    return (
      <ul className="tracklist">
        {tracks.map(track => (
          <li className="tracklist__row" key={track.id}>
            {!noSelect ? this.selectColumn(track.id) : null}
            {this.trackName(track)}
            {this.timeColumn(track.duration_ms)}
          </li>
        ))}
      </ul>
    );
  }
}

TrackList.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string),
  onTrackSelectChange: PropTypes.func,
  tracks: PropTypes.arrayOf(PropTypes.object),
  noSelect: PropTypes.bool
};

export default TrackList;
