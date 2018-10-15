const topTracks = state => state.tracks.topTracks.data.items || [];
const topTracksFetchingState = state => state.tracks.topTracks.isFetching;
const selectedTopTracks = state => state.tracks.topTracks.selected;
const topTrackHasNextPage = state => (Boolean(state.tracks.topTracks.data.next));
const topTrackHasPrevPage = state => (Boolean(state.tracks.topTracks.data.previous));
const recommendedTracks = state => state.tracks.recommendedTracks.data || [];
const hasSelectedTopTracks = state => selectedTopTracks(state).length > 0;

export default {
    topTracks,
    topTracksFetchingState,
    selectedTopTracks,
    topTrackHasNextPage,
    topTrackHasPrevPage,
    recommendedTracks,
    hasSelectedTopTracks
};
