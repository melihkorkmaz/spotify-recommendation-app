import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { userOperations } from '../components/user/ducks';
import { connect } from 'react-redux';

class AuthCallbackView extends React.Component {
    componentDidMount() {
        const hasValues = queryString.parse(this.props.location.hash);
        const queryValues = queryString.parse(this.props.location.search);

        if (queryValues.error) {
            this.props.loginError(queryValues.error);
            this.props.history.push('/');
        } else if (hasValues.access_token) {
            localStorage.setItem('access_token', hasValues.access_token);
            this.props.fetchUser().then(() => {
                this.props.history.push('/');
            });
        }
    }

    render() {
        return (
            <div>Please wait...</div>
        );
    }
}

AuthCallbackView.propTypes = {
    loginError: PropTypes.func,
    location: PropTypes.object,
    fetchUser: PropTypes.func,
    history: PropTypes.any
};

const mapDispatchToProps = dispatch => ({
    loginError: msg => dispatch(userOperations.loginError(msg)),
    fetchUser: () => dispatch(userOperations.fetchMe())
});

export default connect(null, mapDispatchToProps)(AuthCallbackView);
