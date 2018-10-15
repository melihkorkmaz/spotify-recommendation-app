import React from 'react';
import { Link } from 'react-router-dom';
import LoginView from '../../user/login-view/login-view.container';
import logo from '../../../assets/img/logo.svg';
import './header.component.scss';


const Header = () => (<header className="header p-3">
    <div className="header__logoContainer">
        <Link to="/"><img className="header__logo" src={logo} /></Link>
        <div className="header__motto d-none d-sm-block">Recommendation App</div>
    </div>
    <div className="header__loginContainer">
        <LoginView />
    </div>
</header>);
export default Header;
