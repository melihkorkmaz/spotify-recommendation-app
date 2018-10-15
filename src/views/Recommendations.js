import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { tracksOperations, tracksSelectors } from '../components/tracks/ducks';
import { TrackList, withAuth } from '../components';

class RecommendationView extends React.Component {

    componentDidMount() {
        if (this.props.hasSelection) {
            this.props.fetchTracks();
        }
    }

    render() {
        return <div>
            <h3>Top 10 Recommended Tracks</h3>
            <Link className="btn btn-primary btn-block my-3" to="/">
                {this.props.hasSelection
                ? <span>RETURN TRACK SELECTION</span>
                : <span>CLICK HERE TO SELECT SOME TRACKS TO START</span> }
            </Link>
            <TrackList noSelect={true} tracks={this.props.tracks} />
        </div>;
    }
}

RecommendationView.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object),
    hasSelection: PropTypes.bool,
    fetchTracks: PropTypes.func
};

const mapStateToProps = state => ({
    tracks: tracksSelectors.recommendedTracks(state),
    hasSelection: tracksSelectors.hasSelectedTopTracks(state)
});
const mapDispatchToProps = dispatch => ({
    fetchTracks: () => dispatch(tracksOperations.fetchRedommenedTracks())
});

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(RecommendationView));
