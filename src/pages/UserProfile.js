import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useStateValue } from '../state/StateProvider';

function UserProfile() {
    const [{ user }, dispatch] = useStateValue();
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(user? !user.following.includes(userid):true)
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
          setUserProfile(result)
      });
    return () => {};
  }, []);

  const followeUser = () => {
    fetch("http://localhost:5000/follow", {
      method:"put",
      headers: {
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId:userid
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: {following:data.following, followers:data.followers}
        })
        localStorage.setItem("user", JSON.stringify(data))
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers:[...prevState.user.followers, data._id]
            }
          }
        })
        setShowFollow(false)
    })
  }
   const unfolloweUser = () => {
     fetch("http://localhost:5000/unfollow", {
       method: "put",
       headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + localStorage.getItem("jwt"),
       },
       body: JSON.stringify({
         unfollowId: userid,
       }),
     })
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         dispatch({
           type: "UPDATE",
           payload: { following: data.following, followers: data.followers },
         });
         localStorage.setItem("user", JSON.stringify(data));
         setUserProfile((prevState) => {
           const newfollower=prevState.user.followers.filter(item=>item!==data._id)
           return {
             ...prevState,
             user: {
               ...prevState.user,
               followers: newfollower
             },
           };
         });
         setShowFollow(true);
       });
   };
  return (
    <div>
      <section className="Profile_header">
        <div className="profile_pic">
          <img
            src={
              userProfile.user?.pic
                ? userProfile.user?.pic
                : userProfile.user?.email[0]
            }
            alt={userProfile.user?.email[0]}
          />
        </div>
        <h2> {userProfile.user?.name} </h2>
        <h3> {userProfile.user?.email} </h3>
        <p> {userProfile.posts?.length} </p>
        <p> {userProfile.user?.followers?.length} Followers </p>
        <p> {userProfile.user?.following?.length} Following</p>
        {showFollow ? (
          <div>
            <button onClick={followeUser}>Follow</button>
          </div>
        ) : (
          <div>
            <button onClick={unfolloweUser}>unFollow</button>
          </div>
        )}
      </section>
      <section className="Post-section">
        {userProfile.posts?.map((item) => (
          <div className="post_div">
            <img src={item.photo} alt="" />
          </div>
        ))}
      </section>
    </div>
  );
}

export default UserProfile
