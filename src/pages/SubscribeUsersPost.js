import React, { useState, useEffect } from "react";
import CreatePost from "../Components/CreatePost";
import "../style/Home.css";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import { useStateValue } from "../state/StateProvider";
import { Link } from "react-router-dom";


function SubscribeUsersPost() {
  const [data, setData] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [comment, setComment] = useState("");
  useEffect(() => {
      fetch("http://localhost:5000/getsubpost", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setData(result.posts);
        });
    return () => {};
  }, []);

  const handlelike = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  const handleUnlike = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const handleComment = (text, postId) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = (postId) => {
    fetch(`http://localhost:5000/deletepost/${postId}`, {
      method: "delete",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home">
      {data?.map((item) => (
        <div className="posts">
          <div className="posts_header">
            {/* {console.log(item.postedBy?.name)} */}
            <Link to={`/profile/${item.postedBy?._id}`}>
              <h4> {item.postedBy?.name} </h4>
            </Link>
            <span> {item.title} </span>
            <div>
              {user && item.postedBy?._id === user?._id && (
                <h2>
                  <AiIcons.AiTwotoneDelete
                    onClick={() => handleDeletePost(item._id)}
                  />
                </h2>
              )}
            </div>
          </div>
          <div className="posts_image">
            <img src={item.photo} alt="posts" />
          </div>
          <div className="post_body">
            {item.likes.includes(user?._id) ? (
              <BiIcons.BiDislike onClick={() => handleUnlike(item._id)} />
            ) : (
              <BiIcons.BiLike onClick={() => handlelike(item._id)} />
            )}
            {item.body}
            {item.likes.length} likes
            <br />
            {item.comments.map((data) => (
              <p key={data._id}>
                {" "}
                <strong> {data.postedBy.name} </strong>{" "}
                <span> {data.text}</span>{" "}
              </p>
            ))}
          </div>
          <div className="comment_div">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target[0].value);
                handleComment(e.target[0].value, item._id);
              }}
            >
              <input type="text" placeholder="Comment here" />
            </form>
          </div>
        </div>
      ))}

      <section className="post_class">
        <CreatePost />
      </section>
    </div>
  );
}

export default SubscribeUsersPost;
