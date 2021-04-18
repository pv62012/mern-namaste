import React from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state/StateProvider';
import './style/Header.css'

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    dispatch({
      type: "LOGOUT"
    })
  }
  return (
    <div className="header">
      <div className="logo">
        <img src="./images/namasteLogoB.png" alt="namaste" />
      </div>
      <div className="header_buttons">
        {
          user ? (
            <>
        <Link onClick={handleLogout} >
          <button>Logout </button>
            </Link>
             <Link to="/profile">Profile</Link>
          </>
          ) : (
              <>
        <Link to="/login">
          <button>Login </button>
        </Link>
        <Link to="signup">
          <button>Signup </button>
                </Link>
                </>
        )}
       
      </div>
    </div>
  );
}

export default Header
