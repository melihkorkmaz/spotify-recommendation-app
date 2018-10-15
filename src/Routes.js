import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthCallbackView from './views/AuthCallbackView';
import RecommendationView from './views/Recommendations';
import TrackSelectView from './views/TrackSelectView';

/**
 * Routes component for app routing.
 */
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={TrackSelectView} />
        <Route path="/callback" exact component={AuthCallbackView} />
        <Route paht="/recommendations" exact component={RecommendationView} />
      </Switch>
    );
  }
}

export default Routes;
