import React , {useState , useEffect} from 'react'
import { Link , useLocation } from 'react-router-dom'
import Menu from '../Component/Menu'
import axios from 'axios';
import moment from 'moment'
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { useNavigate } from 'react-router-dom'


function Single() {

const navigate = useNavigate()
const location = useLocation();
  const [post, setPost] = useState({});

  
  const postId = location.pathname.split("/")[2]
  console.log(postId)
  
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/api/posts/${postId}`);
        setPost(res.data);
        console.log(res.data)
        console.log(post.username)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [location]);

const handleDelete = async () =>{
  try {
    const res = await axios.delete(`http://localhost:8888/api/posts/${postId}`);
    navigate("/")
    setPost(res.data);
    console.log(res.data)

  } catch (err) {
    console.log(err);
  }
}

const getText = (html) =>{
  const doc = new DOMParser().parseFromString(html , "text/html");
  return doc.body.textContent
}

  return (
    <div className="single">
      <div className="content">
        <img src={`../../public/upload/${post?.img}`} alt="" />
        <div className="user">
     {
      post.userimg && <img
      src={post.userimg}
      alt=""
    />
     }  
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
       {}
            {
            currentUser && currentUser.username == post.username && <div className="edit">
              <Link to={`/write?edit=2`} state={post} >
                <img src={'https://raw.githubusercontent.com/safak/youtube2022/blog-app/client/src/img/delete.png'} alt="" />
              </Link>
              <img onClick={handleDelete}  src={'https://raw.githubusercontent.com/safak/youtube2022/blog-app/client/src/img/delete.png'} alt="" />
            </div>
            }
          
        </div>
        <h1>{post.title}</h1>
        <p  dangerouslySetInnerHTML={{ __html: post.desc }}
         
        ></p>
              </div>
<Menu cat={post.cat} />      
    </div>
  )
}

export default Single
