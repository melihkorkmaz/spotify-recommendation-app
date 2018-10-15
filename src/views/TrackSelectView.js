import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { tracksSelectors, tracksOperations } from '../components/tracks/ducks';

import { withAuth, TrackList } from '../components';

class TrackSelectView extends React.Component {
  constructor() {
    super();
    this.onTrackSelect = this.onTrackSelect.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.renderTrackList = this.renderTrackList.bind(this);
  }

  componentDidMount() {
    this.props.fetchTracks();
  }

  onTrackSelect(e) {
    const { checked, id } = e.target;
    if (checked) {
      this.props.selectTrack(id);
    } else {
      this.props.deSelectTrack(id);
    }
  }

  onNext() {
    this.props.fetchTracksNext();
  }

  onPrev() {
    this.props.fetchTracksPrev();
  }

  RecommendationButton({ numberOfSelected }) {
    return (
      <Link className="btn btn-primary btn-block my-3 ellipsis-one-line" to="/recommendations">
        GET RECOMMENDATION{' '}
        {numberOfSelected > 0 ? (
          <span>({numberOfSelected} track selected)</span>
        ) : (
          <span>(Please select track first)</span>
        )}
      </Link>
    );
  }

  PleaseWait() {
    return <div>Please wait while getting your tracks.</div>;
  }

  renderTrackList() {
    const { tracks, selected, hasPrevPage, hasNextPage } = this.props;
    return (
      <div>
        <TrackList
          tracks={tracks}
          selected={selected}
          onTrackSelectChange={this.onTrackSelect}
        />
        {hasPrevPage ? (
          <button className="btn btn-primary float-left" onClick={this.onPrev}>
            PREVIOUS
          </button>
        ) : null}

        {hasNextPage ? (
          <button className="btn btn-primary float-right" onClick={this.onNext}>
            NEXT
          </button>
        ) : null}

        <div className="clearfix" />
      </div>
    );
  }

  render() {
    const { isFetching, selected = [] } = this.props;

    return (
      <div>
        <h3>Top Tracks</h3>
        <this.RecommendationButton numberOfSelected={selected.length} />
        {isFetching ? <this.PleaseWait /> : this.renderTrackList()}
      </div>
    );
  }
}

TrackSelectView.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  hasPrevPage: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.string),
  fetchTracks: PropTypes.func,
  fetchTracksNext: PropTypes.func,
  fetchTracksPrev: PropTypes.func,
  selectTrack: PropTypes.func,
  deSelectTrack: PropTypes.func
};

const mapStateToProps = state => ({
  tracks: tracksSelectors.topTracks(state),
  isFetching: tracksSelectors.topTracksFetchingState(state),
  hasNextPage: tracksSelectors.topTrackHasNextPage(state),
  hasPrevPage: tracksSelectors.topTrackHasPrevPage(state),
  selected: tracksSelectors.selectedTopTracks(state)
});

const mapDispatchToProps = dispatch => ({
  fetchTracks: () => dispatch(tracksOperations.fetchUserTopTracks()),
  fetchTracksNext: () => dispatch(tracksOperations.fetchUserTopTracksNext()),
  fetchTracksPrev: () => dispatch(tracksOperations.fetchUserTopTracksPrev()),
  selectTrack: id => dispatch(tracksOperations.selectTopTrack(id)),
  deSelectTrack: id => dispatch(tracksOperations.deSelectTopTrack(id))
});

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrackSelectView)
);
