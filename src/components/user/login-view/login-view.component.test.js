/* global describe, beforeEach, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import LoginView from './login-view.component';

describe('Login view component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LoginView/>);
    });

    it('should render login button if user not logged in', () => {
        expect(wrapper.type()).toEqual('button');
        expect(wrapper.text()).toEqual('LOGIN');
    });

    it('should render profile name if user logged in', () => {
        const fakeProfile = { display_name: 'Fake user' };
        wrapper.setProps({ profile: fakeProfile });
        expect(wrapper.type()).toEqual('div');
        expect(wrapper.text()).toEqual(`${fakeProfile.display_name} | Logout`);
    });
});
