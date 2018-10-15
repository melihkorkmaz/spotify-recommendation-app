import apiHelper from '../../../utils/api.helper';
import selectors from './selectors';
import actions from './actions';

const { selectTopTrack, deSelectTopTrack } = actions;

const fetchUserTopTracks = () => (dispatch) => {
    dispatch(actions.startFetchingTopTracks());
    apiHelper.topTracks().then((trucks) => {
        dispatch(actions.endFetchingTopTracks(trucks));
    });
};

const fetchUserTopTracksNext = () => (dispatch, state) => {
    dispatch(actions.startFetchingTopTracks());
    const currentState = state();
    const nextPageUrl = currentState.tracks.topTracks.data.next;
    apiHelper.topTracks(nextPageUrl).then((trucks) => {
        dispatch(actions.endFetchingTopTracks(trucks));
    });
};

const fetchUserTopTracksPrev = () => (dispatch, state) => {
    dispatch(actions.startFetchingTopTracks());
    const currentState = state();
    const prevPageUrl = currentState.tracks.topTracks.data.previous;
    apiHelper.topTracks(prevPageUrl).then((tracks) => {
        dispatch(actions.endFetchingTopTracks(tracks));
    });
};

const fetchRedommenedTracks = () => (dispatch, state) => {
    dispatch(actions.startFetchingRecommendedTracks());
    const selectedTracks = selectors.selectedTopTracks(state());

    apiHelper.topRecommends(selectedTracks).then((res) => {
        dispatch(actions.endFetchingRecommendedTracks(res.tracks));
    });
};

export default {
    fetchUserTopTracks,
    selectTopTrack,
    deSelectTopTrack,
    fetchUserTopTracksNext,
    fetchUserTopTracksPrev,
    fetchRedommenedTracks
};
