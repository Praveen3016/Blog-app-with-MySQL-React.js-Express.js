import React, { useState } from 'react'
import { AuthContext } from '../context/authcontext'
import { useContext } from 'react'
import FormDate from 'form-data'
import axios from 'axios'

function EditProfile() {
  const { personalProfile, setpersonalProfile , setShowProfileEdit } = useContext(AuthContext)
  const [file, setFile] = useState(null);
console.log(personalProfile.uid)
  const [editedProfile , setEditedProfile] = useState({
    userimg : "" ,
    username : personalProfile.username,
    bio : personalProfile.bio,
    links : personalProfile.links
  })


function handleChange(e)
{
   setEditedProfile((prev) =>({...prev , [e.target.name] : e.target.value }))
}

const upload = async () => {
  try {
    const formDate = new FormDate();
    formDate.append("file", file);
    const res = await axios.post("http://localhost:8888/api/upload", formDate)
    console.log(res.data)
    return res.data;

  } catch (error) {
    console.log(error)
  }
}


const submitHandle = async (e) => {
  e.preventDefault();
  const imgURL = await upload();
  
console.log(imgURL)
editedProfile.userimg = imgURL ? imgURL : personalProfile.userimg ; 
console.log(editedProfile)

const res = await axios.put(`http://localhost:8888/api/pesonalprofile/update/${personalProfile.uid}`, editedProfile)
console.log(res.data)

const ress = await axios.put(`http://localhost:8888/api/auth/update/${personalProfile.uid}`, editedProfile)
console.log(ress.data)

setShowProfileEdit(false)
}



  return (
    <div className='absolute flex items-center z-50  h-screen w-screen bg-opacity-50 bg-black'>

      <div class="   sm:max-w-[37%]  sm:mx-auto ">

        <div className="relative  p-[4px] bg-white  rounded-md md:mx-0 shadow  sm:px-7 sm:py-5">
          <svg onClick={() => setShowProfileEdit(false)} className="absolute right-0 top-2 text-gray-600  w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          <h2 className='text-center text-xl py-3 font-medium text-black-700'> Profile information</h2>

          <div class="max-w-md mx-auto">
            <div class="flex items-center space-x-5">
              {
                personalProfile ? <img className="h-24 w-24 bg-white p-2 rounded-full   " src={`../public/upload/${personalProfile.userimg}`} alt="" />
                  :
                  <FaUserCircle className="h-32 w-32 p-2 rounded-full object-cover bg-white  " />
              }
              <div class="flex items-center justify-center pl-2 font-semibold text-xl  text-gray-700">
                <div>
                  <p class=" text-sm font-normal flex gap-4"><label htmlFor='image' className='text-green-600 cursor-pointer'>Update</label>
                  <input type="file" name='image' id='image' className='hidden' onChange={(e) => setFile(e.target.files[0])} />
                   <span className='text-red-600'>Delete</span></p>
                  <p class="text-sm text-gray-500 font-normal leading-relaxed">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                </div>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4  text-gray-700 sm:text-lg sm:leading-7">
                <div class="flex flex-col mb-7">
                  <label class=" text-sm">Name*</label>
                  <input value={editedProfile.username} onChange={(e) => handleChange(e)} name='username'
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-1 pb-1 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                  <p className="text-sm text-gray-500">Appears on your Profile page, as your byline, and in your responses.</p>
                </div>

                <div class="flex flex-col mb-7">
                  <label class=" text-sm">Bio</label>
                  <input placeholder='Write Bio..'  value={editedProfile.bio}  onChange={(e) => handleChange(e)} name='bio'
                    class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-1 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                  <p className="text-sm text-gray-500">Appears on your Profile and next to your stories..</p>
                </div>

                <div class="flex flex-col">
                  <label class=" text-sm">Link</label>
                  <input placeholder='Enter Link..'  value={editedProfile.links}  onChange={(e) => handleChange(e)} name='links'
                    class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-1 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                </div>

              </div>
              <div class="pt-4 flex items-center justify-end space-x-4 ">


                <button onClick={() => setShowProfileEdit(false)} class="border text-green-800 px-4 py-1 rounded-2xl border-green-700 hover:border-green-700 ...">
                  Cancel
                </button>

                <button onClick={submitHandle} class="border text-white px-4 py-1 rounded-2xl border-green-700 bg-green-700 hover:border-green-700 ...">
                  Save
                </button>            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
