import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './components/user/ducks';
import tracksReducer from './components/tracks/ducks';

const rootReducer = combineReducers({
    user: userReducer,
    tracks: tracksReducer
});

const enhancers = [];
let composeEnhancers = compose;

const configureStore = () => {

  if (process.env.NODE_ENV === 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk),
      ...enhancers
    )
  );

  if (module.hot) {
    module.hot.accept(() => {});
  }
  return store;
};

const store = configureStore();
export default store;
