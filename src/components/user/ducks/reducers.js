import types from './types';
import { combineReducers } from 'redux';

const authDefaultState = {
    hasError: false,
};
const authReducer = (state = authDefaultState, action) => {
    switch (action.type) {
        case types.SET_LOGIN_ERROR:
            return { ...state, hasError: true, message: action.payload };
        default:
            return state;
    }
};


const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case types.SET_PROFILE:
            return action.payload;
        case types.LOGOUT_USER:
            return {};
        default:
            return state;
    }
};

const reducer = combineReducers({
    profile: profileReducer,
    auth: authReducer
});

export default reducer;
