import React,{useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import "../style/Signup.css";
function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [password, setPassword] = useState("")
  const [url, setUrl] = useState(undefined)
  const history = useHistory()
   

  useEffect(() => {
    if (url) {
        uploadFields()
      }
    return () => {
      
    }
  }, [url])
  const uploadPic = () => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "namaste");
      data.append("cloud_name", "wait-for-magic");
      fetch("https://api.cloudinary.com/v1_1/wait-for-magic/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => alert(err.message));
  }

  const uploadFields = () => {
     
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return alert("Invalid Email Address!");
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
        pic: url,
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
      })
      .catch((err) => alert(err.message));
    
   }
  const handleSignup = (e) => {
      e.preventDefault();
    if (image) {
      uploadPic()        
    } else {
      uploadFields()
    }
  
    
    
  }
    return (
      <div className="signup_class">
        <div className="signup_form_div">
          <form action="POST" className="signup_form">
            <input
              type="text"
              required
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder=" Email"
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
            <h4>Upload Profile Pic</h4>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            
            <button type="submit" onClick={handleSignup}>
              signup
            </button>
          </form>
        </div>
        <Link to="/login">
          <h3>Already Have An Account? Login</h3>
        </Link>
      </div>
    );
}

export default Signup
