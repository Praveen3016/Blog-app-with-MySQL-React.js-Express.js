import React , {useContext ,useState} from 'react'
import { Link } from "react-router-dom";
import Logo from '../../public/images/logo.png'
import { AuthContext } from '../context/authcontext'
import { useLocation , useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";


function Header() {

  const {currentUser , logout } = useContext(AuthContext)
  const [showPopover, setShowPopover] = useState(false);

const navigate = useNavigate();

  function handleWrite()
  {
    currentUser ? navigate('/write')
    
    : navigate("/login")
  }

  return (
    <div className="navbar">
    <div className="container">
      <div className="logo">
        <Link to="/">
        <img src={Logo} alt="" />
        {/* <h1>blogsss</h1> */}
        </Link>
      </div>
      <div className="links d-flex align-items-center  ">
        <Link className="link" to="/?cat=art">
          <h6>ART</h6>
        </Link>
        <Link className="link" to="/?cat=science">
          <h6>SCIENCE</h6>
        </Link>
        <Link className="link" to="/?cat=technology">
          <h6>TECHNOLOGY</h6>
        </Link>
        <Link className="link" to="/?cat=cinema">
          <h6>CINEMA</h6>
        </Link>
        <Link className="link" to="/?cat=design">
          <h6>DESIGN</h6>
        </Link>
        <Link className="link" to="/?cat=food">
          <h6>FOOD</h6>
        </Link>
       
       
        {currentUser ? <div className="relative">
      <div
        className="userHover position-relative"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        <div className="user flex gap-1 items-center justify-center">
          <span className="font-mediuam text-gray-700">{currentUser.username}</span>
          <FaUserCircle className="h-8 w-8 opacity-50" />
        </div>
        {showPopover && (
          <div 
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
           className="userprofile mx-auto right-[-60px] pt-10 mt-2 w-60 absolute top-1 z-10">
            <div className="bg-white rounded overflow-hidden shadow-lg">
            <div class="border-b">
                        <Link to={`/profile/${currentUser.id}`} >
                            <a class="px-4 py-2 hover:bg-gray-100 flex">
                            <div class="text-gray-800">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    class="w-5 h-5"
                                >
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                </div>
                                <div class="pl-3">
                                <p class="text-sm font-medium text-gray-800 leading-none">
                                    Profile
                                </p>
                                <p class="text-xs text-gray-500">View your Profile</p>
                                </div>
                            </a>
                        </Link>
                        <Link href="/account/donations" >
                            <a class="px-4 py-2 hover:bg-gray-100 flex">
                                <div class="text-gray-800">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    class="w-5 h-5"
                                >
                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                </div>
                                <div class="pl-3">
                                <p class="text-sm font-medium text-gray-800 leading-none">Settings</p>
                                <p class="text-xs text-gray-500">Change your Settings</p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div class="">
                        <button href="#" onClick={logout} class="w-full px-4 py-2 pb-4 hover:bg-gray-100 flex">
                            <p class="text-sm font-medium text-gray-800 leading-none">Logout
                                    </p>
                        </button>
                    </div>
            </div>
          </div>
        )}
      </div>
    </div> : <Link to="/login" >Login</Link> } 
      
        
        
        <span className="write" onClick={handleWrite}>
         Write
     </span>
      </div>
    </div>
  </div>
  )
}

export default Header
