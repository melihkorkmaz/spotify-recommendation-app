import types from './types';

const loginError = msg => ({
    type: types.SET_LOGIN_ERROR,
    payload: msg
});

const setProfile = profile => ({
    type: types.SET_PROFILE,
    payload: profile
});

const logoutUser = () => ({
    type: types.LOGOUT_USER
});

export default {
    loginError,
    setProfile,
    logoutUser
};
