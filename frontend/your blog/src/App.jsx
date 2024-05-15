
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Profile from "./pages/Profile";
import { Outlet } from "react-router-dom";
import { useLocation , useNavigate} from "react-router-dom";
import { AuthContext } from "./context/authcontext";
import EditProfile from "./Component/EditProfile";

import React , {useContext} from 'react'

import '../style.scss';
import { useEffect, useState } from "react";


const Layout = () =>{
const [width , setWidth] = useState(window.innerWidth)

const {currentUser , setShowProfileEdit , showProfileEdit } = useContext(AuthContext)
const navigate = useNavigate();
const location = useLocation();
console.log()

useEffect(()=>{
 async function userMiddle(){ 
  const user =  localStorage.getItem("user") 
  const users = await JSON.parse(user)
   if(location.pathname == '/write')
   {
    if(!users){
      navigate("/login");
    }
   } }
   userMiddle();
},[location.pathname])

setInterval(()=>{
  setWidth(window.innerWidth)
},1000)
useEffect(()=>{
  setWidth(window.innerWidth)
}, [width])
 
console.log(window.innerWidth)
  if(width <= 700)
  {
    return(
      <h1>please open in window or laptop</h1>
    )
  }else{
    return(
      <>

      {/* <h1 className=" helo text-3xl font-bold underline text-red-400 ">hello</h1> */}
      <div>
      <Header/>
    
      
      <Outlet/> 
      <Footer/>
      </div>
      </>
    )
  }

  
 
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children : [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/posts/:id",
        element: <Single/>,
      },
      {
        path: "/profile/:id",
        element: <Profile/>,
      }
    ] 
  },

  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
 
 
  
  {
    path: "*",
    element: <h1>not allow</h1>,
  },
]);

function App() {
  const {currentUser , setShowProfileEdit , showProfileEdit  } = useContext(AuthContext)

 

  return (
    <>
    {
      showProfileEdit ? 
        <EditProfile /> 
      : ""
    }
    <div className="app">
   <div className="container">
   <RouterProvider router={router} />
   </div>
    </div>
        
    </>
  )
}

export default App
