/* global describe, beforeEach, it, expect */
import types from './types';
import actions from './actions';
import selectors from './selectors';
import reducers from './reducers';

describe('Track store tests', () => {
  describe('Actions', () => {
    it('should create start fetching top tracks action', () => {
      expect(actions.startFetchingTopTracks()).toEqual({
        type: types.FETCH_START_TOP_TRACKS
      });
    });

    it('should create end fetching top tracks action', () => {
      expect(actions.endFetchingTopTracks('fake-tracks')).toEqual({
        type: types.FETCH_END_TOP_TRACKS,
        payload: 'fake-tracks'
      });
    });

    it('should create select top track action', () => {
      expect(actions.selectTopTrack('fake-id')).toEqual({
        type: types.SELECT_TOP_TRUCK,
        payload: 'fake-id'
      });
    });

    it('should create deselect top track action', () => {
        expect(actions.deSelectTopTrack('fake-id')).toEqual({
          type: types.DESELECT_TOP_TRUCK,
          payload: 'fake-id'
        });
    });

    it('should create start fetching recommended tracks action', () => {
        expect(actions.startFetchingRecommendedTracks()).toEqual({
            type: types.FETCH_START_RECOMMEND_TRACKS
        });
    });

    it('should create end fetching recommended tracks action', () => {
        expect(actions.endFetchingRecommendedTracks('fake-tracks')).toEqual({
            type: types.FETCH_END_RECOMMEND_TRACKS,
            payload: 'fake-tracks'
        });
    });

  });

  describe('Selectors', () => {
    let state = {};
    beforeEach(() => {
      state = {
        tracks: {
          topTracks: {
              data: {
                  items: ['fake-item'],
                  next: 'next-page',
                  previous: 'prev-page'
                },
              isFetching: true,
              selected: ['fake-selected']
          },
          recommendedTracks: {
              data: ['fake-item']
          }
        }
      };
    });

    it('should return top tracks', () => {
      expect(selectors.topTracks(state)).toEqual(['fake-item']);
    });

    it('should return top tracks fetching state', () => {
        expect(selectors.topTracksFetchingState(state)).toBeTruthy();
    });

    it('should return selected top tracks', () => {
        expect(selectors.selectedTopTracks(state)).toEqual(['fake-selected']);
    });

    it('should if top tracks has next page', () => {
        expect(selectors.topTrackHasNextPage(state)).toBeTruthy();
    });

    it('should if top tracks has previous page', () => {
        expect(selectors.topTrackHasPrevPage(state)).toBeTruthy();
    });

    it('should return if has selected data', () => {
        expect(selectors.hasSelectedTopTracks(state)).toBeTruthy();
    });

    it('shoud return recommended items', () => {
        expect(selectors.recommendedTracks(state)).toEqual(['fake-item']);
    });
  });

  describe('Reducers', () => {
    const fakeState = {
        topTracks: { isFetching: false, data: {}, selected: [] },
        recommendedTracks: {}
    };

    it('should return default state if there is no action', () => {
        const newState = reducers(fakeState, {});
        expect(newState).toEqual(fakeState);
    });

    it('should start fetching top tracks', () => {
        const newState = reducers(fakeState, actions.startFetchingTopTracks());
        expect(newState.topTracks.isFetching).toBeTruthy();
    });

    it('should end fetching top tracks', () => {
        const newState = reducers(fakeState, actions.endFetchingTopTracks('fake-tracks'));
        expect(newState.topTracks.isFetching).toBeFalsy();
        expect(newState.topTracks.data).toEqual('fake-tracks');
    });

    it('should select - deselect top tracks', () => {
        // Select first
        const firstState = reducers(fakeState, actions.selectTopTrack('fake-id'));
        expect(firstState.topTracks.selected).toEqual(['fake-id']);

        // Deselect
        const secondState = reducers(firstState, actions.deSelectTopTrack('fake-id'));
        expect(secondState.topTracks.selected.length).toEqual(0);
    });

    it('should start fetch recommendation', () => {
        const newState = reducers(fakeState, actions.startFetchingRecommendedTracks());
        expect(newState.recommendedTracks.isFetching).toBeTruthy();
    });

    it('should end fetch recommendation', () => {
        const newState = reducers(fakeState, actions.endFetchingRecommendedTracks('fake-tracks'));
        expect(newState.recommendedTracks.isFetching).toBeFalsy();
        expect(newState.recommendedTracks.data).toEqual('fake-tracks');
    });
  });
});
