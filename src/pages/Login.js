import React from 'react'
import "../style/Login.css";
function Login() {
    return (
      <div className="login">
        <div className="login_form_div">
          <form action="" className="login_form">
            <input type="text" required placeholder="Enter Your Email" />
                    <input type="password" required placeholder="Enter Your Password" />
                    <button>Login</button>
          </form>
        </div>
      </div>
    );
}

export default Login
