import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router';
import "../style/Login.css";

import { useStateValue } from "../state/StateProvider";
function Login() {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory()
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return alert("Invalid Email Address!");
    }
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          return alert(data.error);
        } else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({
            type: "SET_USER",
            user:data.user
          })
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        return alert(err.message)
      });
  }
    return (
      <div className="login">
        <div className="login_form_div">
          <form action="" className="login_form">
            <input
              type="text"
              required
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleLogin} >Login</button>
          </form>
        </div>
      </div>
    );
}

export default Login
