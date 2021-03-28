import React,{useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import "../style/Signup.css";
function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  
  const handleSignup = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      return alert("Invalid Email Address!")
    }
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
          history.push("/login");
        
        }
      }).catch(err=>alert(err.message))
  }
    return (
      <div className="signup_class">
        <div className="signup_form_div">
          <form action="POST" className="signup_form">
            <input type="text" required placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" required placeholder=" Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" required placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" onClick={handleSignup} >signup</button>
          </form>
        </div>
        <Link to="/login">
          <h3>Already Have An Account? Login</h3>
        </Link>
      </div>
    );
}

export default Signup
