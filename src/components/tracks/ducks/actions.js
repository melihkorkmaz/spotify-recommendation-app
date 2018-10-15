import types from './types';

const startFetchingTopTracks = () => ({
    type: types.FETCH_START_TOP_TRACKS
});

const endFetchingTopTracks = tracks => ({
    type: types.FETCH_END_TOP_TRACKS,
    payload: tracks
});

const selectTopTrack = id => ({
    type: types.SELECT_TOP_TRUCK,
    payload: id
});

const deSelectTopTrack = id => ({
    type: types.DESELECT_TOP_TRUCK,
    payload: id
});

const startFetchingRecommendedTracks = () => ({
    type: types.FETCH_START_RECOMMEND_TRACKS
});

const endFetchingRecommendedTracks = tracks => ({
    type: types.FETCH_END_RECOMMEND_TRACKS,
    payload: tracks
});

export default {
    selectTopTrack,
    deSelectTopTrack,
    startFetchingTopTracks,
    endFetchingTopTracks,
    startFetchingRecommendedTracks,
    endFetchingRecommendedTracks
};
