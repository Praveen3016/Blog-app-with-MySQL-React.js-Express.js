import React, { useContext, useEffect, useState  } from 'react'
import { AuthContext } from '../context/authcontext'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { CiMail } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";


function Profile() {
  const { currentUser ,setShowProfileEdit , personalProfile , setpersonalProfile } = useContext(AuthContext)
  const [value, setValue] = React.useState(0);
  const [username , seUsername] = useState("username");
  const [userData , setUserData] = useState()
  const { id } = useParams();

  const [posts, setPosts] = useState([]);

   console.log(id)
  useEffect(() => {
    //for user all post
    async function getProfileData() {
      try {
        const res = await axios.get(`http://localhost:8888/api/posts/profile/${id}`);
        console.log(res.data);
        seUsername(res.data[0].username)
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching personal data:', error);
      }
    }

    getProfileData();
  // console.log(posts[0].username)   
  }, [id]);

  useEffect(() => {
    async function getPersonalProfileData() {
          //for user all personal profile

      try {
        const res = await axios.get(`http://localhost:8888/api/pesonalprofile/${id}`);
        console.log(res.data[0]);
        setpersonalProfile(res.data[0])
      } catch (error) {
        console.error('Error fetching personal data:', error);
      }
    }

    getPersonalProfileData();
  // console.log(posts[0].username)   
  }, [id]);


  // useEffect(() => {
  // }, [posts]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
   
    <div className='border-t'>
      <div className="grid grid-cols-12  h-fit w-full">
        <div className="col-span-8 ">
          <div className=''>
            <h1 className='text-4xl font-semibold my-8 text-gray-900 '>{personalProfile.username}</h1>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label=" Home" {...a11yProps(0)} />
                <Tab label=" Linst " {...a11yProps(1)} />
                <Tab label="About" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {posts.map((post) => (
                <div className="post flex flex-row-reverse justify-between w-full mb-10 border-b pb-10"  key={post.id}>
                  <div className="img flex items-center w-3/4">
                    <Link className=" link w-full" to={`/posts/${post.id}`}>
                      <img className='h-24 float-end m-auto hover:brightness-50 cursor-pointer' src={`../public/upload/${post.img}`} alt="" />
                    </Link>
                  </div>
                  <div className="content  justify-center">
                    <div className="flex  items-center space-x-2 cursor-pointer mb-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                        {
                          post.userimg ? <img src={`../public/upload/${post.userimg}`} alt="" className="w-full h-full object-cover" />
                            : <FaUserCircle className="w-full h-full object-cover opacity-50" />
                        }

                      </div>
                      <div className="font-semibold  text-gray-900 text-sm ">
                        <div className="cursor-pointer text-gray-800 font-thin">{post.username}</div>
                      </div>
                    </div>
                    <Link className="link" to={`/posts/${post.id}`}>
                      <h1 className=' font-semibold text-xl text-gray-900 mb-2 py-0'>{post.title}</h1>
                    </Link>
                    <p className='mb-3 text-sm text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus vel molestiae eius? Maiores, quaerat fuga!</p>

                    {/* <div dangerouslySetInnerHTML={{ __html: post.desc }} /> */}
                    <Link className="link" to={`/posts/${post.id}`}>
                      <button className='text-sm border-b border-blue-600'>Read More</button>
                    </Link>

                  </div>
                </div>
              ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Linst
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              About
            </CustomTabPanel>
          </div>
        </div>
        <div className="col-span-4 border-l ">
        
            <div className="container  w-full    bg-white transform   duration-200 easy-in-out z-0">
                {/* <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                </div> */}
                <div className="flex justify-start px-5  mt-12">
                  {
                    personalProfile.userimg ? <img className="h-32 w-32 bg-white p-2 rounded-full   " src={`../public/upload/${personalProfile.userimg}`} alt="" /> 
                    :
                    <FaUserCircle className="h-32 w-32 p-2 rounded-full object-cover bg-white opacity-50 " />
                  }  

                </div>
                <div className=" ">
                    <div className=" px-8">
                        <h2 className="text-gray-800 text-2xl font-semibold">{personalProfile.username}</h2>
                        <p className='text-gray-500'><span className="font-semibold text-gray-500">{personalProfile.followers}</span> Followers</p>
                        
                        <p className="mt-2 text-gray-500 text-sm">{personalProfile.bio}</p>
                        <a className="text-gray-400 mt-2 border-b text-sm  hover:text-blue-500" href={personalProfile.links} target="BLANK()">{personalProfile.links ? personalProfile.links : "enter link"}</a>
                        <div className="flex justify-between mt-2 ">
                          
                        <p onClick={() => setShowProfileEdit(true)} className='flex justify-center items-center  gap-1 cursor-pointer' ><CiEdit className='text-green-600' /><span  className='text-green-600 text-sm' >Edit Profile</span></p> 
                        
                        <a href={`mailto:${personalProfile.mail}`} className='flex justify-center items-center  gap-1' ><CiMail className='text-green-600' /><span  className='text-green-600 text-sm' >Mail </span></a>

                        <p></p>
                          
                                                  </div>
                    </div>
                    <hr className="mt-6" />
                    

                    
                    {/* <div className="flex  bg-gray-50 ">
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p><span className="font-semibold">{personalProfile.followers}</span> Followers</p>
                        </div>
                        <div className="border"></div>
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p> <span className="font-semibold">2.0 k </span> Following</p>
                        </div>

                    </div>  */}
                </div>
            </div>
        </div>
        </div>
      
    </div>
    </>
  )
}

export default Profile

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
