import React from 'react';
import './Header.scss'
import flashImg from '../../assets/images/flash.png'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar flex space-between">
            <div className="logo">WEATHER <img style={{ width: 30 }} src={flashImg} /> APP</div>
            <div className="nav-list flex">
                <div className="link">
                    <Link to="/">Home</Link>
                </div>
                <div className="link">
                    <Link to="/favorites">Favorites</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;