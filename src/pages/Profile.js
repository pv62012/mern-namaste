import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../state/StateProvider';
import "../style/Profile.css";
function Profile() {
    const [{ user }, dispatch] = useStateValue();
    const [post, setPost] = useState([])
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(() => {
        fetch('http://localhost:5000/myposts', {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                setPost(result.mypost)
            })
        
        if (image) {
             const data = new FormData();
             data.append("file", image);
             data.append("upload_preset", "namaste");
             data.append("cloud_name", "wait-for-magic");
             fetch(
               "https://api.cloudinary.com/v1_1/wait-for-magic/image/upload",
               {
                 method: "post",
                 body: data,
               }
             )
               .then((res) => res.json())
               .then((data) => {
                   
                 
                   fetch('updatepic', {
                       method: "put",
                       headers: {
                           "Content-Type": "application/json",
                           "Authorization":"Bearer "+localStorage.getItem("jwt")
                       },
                       body: JSON.stringify({
                           pic:data.url
                       })
                   }).then(res => res.json())
                       .then(result => {
                          
                           localStorage.setItem(
                             "user",
                             JSON.stringify({ ...user, pic: result.pic })
                           );
                             
                   dispatch({
                     type: "UPDATEPIC",
                     payload: result.pic,
                   });
                   })
                //    window.location.reload()
               })
               .catch((err) => alert(err.message));
        
        }
        return () => {
   
        }
    }, [image])


    const updateProfilePic = (file) => {
        setImage(file)
    }
    return (
      <div className="profile_page">
        <section className="Profile_header">
          <div className="profile_pic">
            <img
              src={user?.pic ? user?.pic : user.email[0]}
              alt={user?.email[0]}
            />
          </div>
          <h2> {user?.name} </h2>
          {console.log(post)}
          <p> {post.length} Post</p>
          <p> {user?.followers.length} Followers </p>
          <p> {user?.following.length} Following</p>
          <Link to="/myfollowingpost">My Following Posts </Link>
          <div>
           
            <input type="file" onChange={(e) => updateProfilePic(e.target.files[0])} />
            {/* <button type="submit" onClick={handleCreatePost}>
              Update pic
            </button> */}
          </div>
        </section>
        <section className="Post-section">
          {post?.map((item) => (
            <div className="post_div">
              <img src={item.photo} alt="" />
            </div>
          ))}
        </section>
      </div>
    );
}

export default Profile
