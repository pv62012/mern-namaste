import React from 'react'
import { Link } from 'react-router-dom'
import './style/Header.css'

function Header() {
    return (
      <div className="header">
        <div className="logo">
          <img src="./images/namasteLogoB.png" alt="" />
        </div>
        <div className="header_buttons">
          <Link to="/login">
            <button>Login </button>
          </Link>
          <Link to="signup">
            <button>Signup </button>
          </Link>
          <Link to="profile">
          Profile
          </Link>
        </div>
      </div>
    );
}

export default Header
