import React from 'react';
import PropTypes from 'prop-types';
import { apiEndpoints } from '../../../utils/api.helper';

class LoginView extends React.PureComponent {
    constructor() {
        super();
        this.onLogoutClicked = this.onLogoutClicked.bind(this);
    }

    onLoginClicked() {
        window.location = apiEndpoints.TOKEN_URL;
    }

    onLogoutClicked(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { profile } = this.props;
        return (
            (profile && profile.display_name)
            ? <div>{profile.display_name} | <a href="#" onClick={this.onLogoutClicked}>Logout</a></div>
            : <button className="btn btn-primary" onClick={this.onLoginClicked}>LOGIN</button>
        );
    }
}

LoginView.propTypes = {
    profile: PropTypes.object,
    logout: PropTypes.func
};

export default LoginView;
