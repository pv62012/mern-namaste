import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import './style/CreatePost.css'

function CreatePost() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const history = useHistory()
    
    useEffect(() => {
        if (url) {
            
        fetch("http://localhost:5000/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            title,
            body,
            photo: url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              return alert(data.error);
            } else {
              alert("Created Successfully");
              history.push("/");
            }
          })
          .catch((err) => alert(err.message));
        }
        return () => {
            
        }
    }, [url])
    const handleCreatePost = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","namaste")
        data.append("cloud_name", "wait-for-magic")
        fetch("https://api.cloudinary.com/v1_1/wait-for-magic/image/upload", {
            method: "post",
            body:data
        })
            .then(res => res.json())
            .then(data => {
            setUrl(data.url)
            })
            .catch(err => alert(err.message))
        
    }

    return (
      <div>
        <div className="create_post_form_div">
          <form action="" className="create_post_form">
            <input
              type="text"
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Caption"
              value={body}
              onChange={(e) => setBody(e.target.value)}
                    />
                    <input type="file" onChange={(e)=>setImage(e.target.files[0]) }/>
            <button type="submit" onClick={handleCreatePost}>
              Post
            </button>
          </form>
        </div>
      </div>
    );
}

export default CreatePost
