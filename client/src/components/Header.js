import React from 'react';
import logo from '../logo.png';

// non-interactive header component
const Header = () => (
    <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>politibil.no</h1>
        <h2>«politiradio på nett»</h2>
    </header>
);

export default Header;