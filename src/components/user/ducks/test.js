/* global describe, beforeEach, it, expect, jest, beforeAll, afterAll */
import apiHelper from '../../../utils/api.helper';
import types from './types';
import actions from './actions';
import operations from './operations';
import selectors from './selectors';
import reducers from './reducers';

describe('User store tests', () => {
  describe('Actions', () => {
    it('should create login error action', () => {
      expect(actions.loginError('fake-message')).toEqual({
        type: types.SET_LOGIN_ERROR,
        payload: 'fake-message'
      });
    });

    it('should create set profile action', () => {
      expect(actions.setProfile('fake-profile')).toEqual({
        type: types.SET_PROFILE,
        payload: 'fake-profile'
      });
    });

    it('should create logout user action', () => {
      expect(actions.logoutUser()).toEqual({
        type: types.LOGOUT_USER
      });
    });
  });

  describe('Selectors', () => {
    let state = {};
    beforeEach(() => {
      state = {
        user: {
          profile: 'fake-profile'
        }
      };
    });

    it('should return profile', () => {
      expect(selectors.profile(state)).toEqual('fake-profile');
    });
  });

  describe('Operators', () => {
    const fakeProfile = { display_name: 'fake-user', id: 'fake_id' };
    let apiProfileMock;

    beforeAll(() => {
        apiProfileMock = jest.spyOn(apiHelper, 'profile');
        apiProfileMock.mockImplementation(() => Promise.resolve(fakeProfile));
        localStorage.setItem('access_token', 'fake-token');
    });

    it('should fetch user', () => {
        const dispatch = jest.fn();
        operations.fetchMe()(dispatch);

        expect(apiProfileMock).toBeCalled();
        expect(localStorage.getItem('profile')).toBeDefined();
    });

    it('should operate init user', () => {
      const dispatch = jest.fn();
      operations.initUser()(dispatch);
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(actions.setProfile(fakeProfile));
    });

    it('should operate logout user', () => {
        const dispatch = jest.fn();
        operations.logOutUser()(dispatch);

        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('profile')).toBeNull();

        expect(dispatch).toBeCalledTimes(1);
        expect(dispatch).toBeCalledWith(actions.logoutUser());
    });

    it('should not operate init user if access token and profile are empty', () => {
        const dispatch = jest.fn();
        operations.initUser()(dispatch);
        expect(dispatch).not.toBeCalled();
    });

    afterAll(() => {
        apiProfileMock.mockRestore();
        localStorage.clear();
    });
  });

  describe('Reducers', () => {
      const fakeState = {
          auth: {},
          profile: {}
      };

      it('should return default state if there is no action', () => {
        const newState = reducers(fakeState, {});
        expect(newState).toEqual(fakeState);
      });

      it('should set login error', () => {
          const newState = reducers(fakeState, actions.loginError('fake-error'));
          expect(newState.auth.hasError).toBeTruthy();
          expect(newState.auth.message).toEqual('fake-error');
      });

      it('should set profile', () => {
          const newState = reducers(fakeState, actions.setProfile({ id: 'fake-profile' }));
          expect(newState.profile).toEqual({ id: 'fake-profile' });
      });

      it('should logout user', () => {
        fakeState.profile = { id: 'fake-profile' };
          const newState = reducers(fakeState, actions.logoutUser());
          expect(newState.profile).toEqual({});
      });
  });
});
