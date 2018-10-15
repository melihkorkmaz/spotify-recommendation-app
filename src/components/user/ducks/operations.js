import actions from './actions';
import apiHelper from '../../../utils/api.helper';

const { loginError } = actions;

/**
 * Set user profile as soon as possible by using local storage. But meantime try to
 * get user profile from server. If it's not possible (token might be wrong), dispatch logout
 * to clear user data from local storage. This operation calls from app component when application mounted.
 */
const initUser = () => (dispatch) => {
    const token = localStorage.getItem('access_token');
    const profileString = localStorage.getItem('profile');

    if (token && profileString) {
        try {
            const profile = JSON.parse(profileString);
            dispatch(actions.setProfile(profile));
            fetchMe()(dispatch);
        } catch (error) {
            // clear local storage and user data
            logOutUser()(dispatch);
        }
    }
};


/**
 * Logout user
 */
const logOutUser = () => (dispatch) => {
    localStorage.clear();
    dispatch(actions.logoutUser());
};

/**
 * Get user profile from server and set local storage for fast bootstrap.
 * If any error happens, clear localstorage by dispatching logout operation.
 */
const fetchMe = () => dispatch => apiHelper.profile().then((profile) => {
        if (profile.id) {
            localStorage.setItem('profile', JSON.stringify(profile));
            dispatch(actions.setProfile(profile));
        } else {
            logOutUser()(dispatch);
        }
    });

export default {
    loginError,
    fetchMe,
    initUser,
    logOutUser
};
