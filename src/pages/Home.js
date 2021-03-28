import React,{useState, useEffect}  from 'react'
import CreatePost from '../Components/CreatePost'
import '../style/Home.css'
function Home() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/allpost")
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setData(result.posts);
          });
        return () => {
           
        }
    }, [])
    return (
      <div className="home">
        {data.map((item) => (
            <div className="posts">
                <div className="posts_header">
                    <h4> {item.postedBy.name} </h4>
                 <span>  {item.title} </span>
                </div>
                <div className="posts_image">
                    <img src={item.photo} alt="posts"/>
                </div>
                <div className="post_body">
                    {item.body}
                </div>
            </div>
        ))}

        <section className="post_class">
          <CreatePost />
        </section>
      </div>
    );
}

export default Home
