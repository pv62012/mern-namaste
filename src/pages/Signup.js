import React from 'react'
import { Link } from 'react-router-dom';
import "../style/Signup.css";
function Signup() {
    return (
      <div>
        <div className="signup_form_div">
          <form action="" className="signup_form">
            <input type="text" required placeholder="Username" />
            <input type="text" required placeholder=" Email" />
            <input type="password" required placeholder="Password" />
            <button>signup</button>
          </form>
        </div>
        <Link to="/login">
          <h3>Already Have An Account? Login</h3>
        </Link>
      </div>
    );
}

export default Signup
