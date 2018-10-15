import { combineReducers } from 'redux';
import types from './types';

// Top Track Reducer
const topTracksDefaultState = {
  isFetching: false,
  data: {},
  selected: []
};

const topTracksReducer = (state = topTracksDefaultState, action) => {
  switch (action.type) {
    case types.FETCH_START_TOP_TRACKS:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_END_TOP_TRACKS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case types.SELECT_TOP_TRUCK:
      return {
        ...state,
          selected: [...state.selected,
action.payload]
      };
    case types.DESELECT_TOP_TRUCK:
      const index = state.selected.indexOf(action.payload);
      if (index < 0) {
        return state;
      }
      return {
        ...state,
          selected: [
            ...state.selected.slice(0, index),
            ...state.selected.slice(index + 1)
          ]
      };

    default:
      return state;
  }
};

// Recommended Tracks Reducer
const recommendedTracksDefaultStore = {
  data: [],
  isFetching: false
};

const recommendedTracksReducer = (state = recommendedTracksDefaultStore, action) => {
  switch (action.type) {
    case types.FETCH_START_RECOMMEND_TRACKS:
      return {
        ...state,
          data: [],
          isFetching: true
      };
    case types.FETCH_END_RECOMMEND_TRACKS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  topTracks: topTracksReducer,
  recommendedTracks: recommendedTracksReducer
});

export default reducer;
