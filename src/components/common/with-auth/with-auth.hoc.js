import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSelectors } from '../../user/ducks';

const withAuth = (BaseComponent) => {
    class HOC extends React.Component {
        render() {
            const { profile } = this.props;
            return (profile && profile.id)
                ? <BaseComponent/>
                : <div style={{ textAlign: 'center', fontSize: '16px' }}>Please login to start.</div>;
        }
    }

    HOC.propTypes = {
        profile: PropTypes.object
    };

    const mapStateToProps = state => ({
        profile: userSelectors.profile(state)
    });

    return connect(mapStateToProps)(HOC);
};

export default withAuth;
