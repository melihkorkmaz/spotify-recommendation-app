import React from 'react';
import PropTypes from 'prop-types';
import Routes from './Routes';
import { withRouter } from 'react-router-dom';
import { Header } from './components';
import { connect } from 'react-redux';
import { userOperations } from './components/user/ducks';


class App extends React.Component {

  componentDidMount() {
    this.props.initUser();
  }

  render() {
    return (<div>
      <Header />
      <div className="container">
        <Routes />
      </div>
    </div>);
  }
}

App.propTypes = {
  initUser: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  initUser: () => dispatch(userOperations.initUser())
});

export default withRouter(connect(null, mapDispatchToProps)(App));

