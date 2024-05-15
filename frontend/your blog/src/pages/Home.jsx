import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from "react";
import { useState, us } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
// import '../index.css'

function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/api/posts${cat}`, {
          withCredentials: true
        });
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <Link className="link" to={`/posts/${post.id}`}>
                <img className='hover:scale-105 duration-300 hover:rotate-2 hover:rounded-md hover:brightness-50 cursor-pointer' src={`../../public/upload/${post.img}`} alt="" />
              </Link>
            </div>
            <div className="content  justify-center">
              <Link to={`/profile/${post.uid}`} class="flex  items-center space-x-2 cursor-pointer">
                <div class="w-8 h-8 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                  { 
                    post.userimg ?   <img src={`../public/upload/${post.userimg}`} alt="" class="w-full h-full object-cover" /> 
                         : <FaUserCircle  class="w-full h-full object-cover opacity-50" />
                  }
               
                </div>
                <div class="font-semibold  text-gray-900 text-sm">
                  <div class="cursor-pointer ">{post.username}</div>
                </div>
              </Link>
              <Link className="link" to={`/posts/${post.id}`}>
                <h1 className=' font-semibold py-0'>{post.title}</h1>
              </Link>
              <p className='mb-3 text-gray-600 text-sm'  dangerouslySetInnerHTML={{ __html: `${post.desc.substring(0, 100)}...`} } ></p>

              {/* <div dangerouslySetInnerHTML={{ __html: post.desc }} /> */}
              <Link className="link" to={`/posts/${post.id}`}>
                <button>Read More</button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

