    import React , {useState , useContext}from 'react'
    import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authcontext'



    function Login() {

const {login , currentUser } = useContext(AuthContext)
  const [inputs, setInputs] = useState({
    email  :"" ,
    password : "" 
  })
  const [err , seterr] = useState("")

  const navigate = useNavigate();

  const handleInputs = (e) =>{
    setInputs(prev => ({...prev , [e.target.name] : e.target.value }))
  }

 const handleSubmit = async (e) =>{
  e.preventDefault()
  try {
 let data = await login(inputs);
    console.log(data)
    if(currentUser.username == data)
      {
        navigate("/")
      }
  } catch (error) {
    seterr(error.response.data)
    console.log(error.response.data)
  }
 }

      return (
   
    <>
    <div className='h-full w-full mt-20 flex justify-center'>
   <form class="flex flex-col w-1/3   h-full pb-6 text-center bg-white rounded-3xl">
            <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
            <p class="mb-4 text-grey-700">Enter your email and password</p>
            <a class="flex bg-gray-300 items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900  hover:bg-gray-400 focus:ring-4 focus:ring-grey-300">
              <img class="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt=""/>
              Sign in with Google
            </a>
            <div class="flex items-center mb-1">
              <hr class="h-0 border-b border-solid border-grey-500 grow"/>
              <p class="mx-4 text-grey-600">or</p>
              <hr class="h-0 border-b border-solid border-grey-500 grow"/>
            </div>
            <label for="email" class="mb-2 text-sm text-start text-grey-900">Email*</label>
            <input id="email"  name="email" onChange={handleInputs}
 type="email" placeholder="mail@loopple.com" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-400 mb-5 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl"/>
            <label for="password" class="mb-2 text-sm text-start text-grey-900">Password*</label>
            <input id="password"    name="password"        
 onChange={handleInputs}
 type="password" placeholder="Enter a password" class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-400 mb-7 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl"/>
            <div class="flex flex-row justify-between mb-8">
              <label class="relative inline-flex items-center mr-3 cursor-pointer select-none">
                <input type="checkbox" checked value="" class="sr-only peer"/>
                <div
                  class="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                  <img class="" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png" alt="tick"/>
                </div>
                <span class="ml-3 text-sm font-normal text-grey-900">Keep me logged in</span>
              </label>
              <a href="javascript:void(0)" class="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</a>
            </div>
            <button onClick={handleSubmit} class="w-full  py-5 mb-2 text-sm font-bold leading-none text-black transition duration-300  rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-500">Sign In</button>
            {
           err && <p className='text-red-500'>{err}</p>
         }
            <p class="text-sm leading-relaxed text-grey-900">Not registered yet? <Link to="/register" class="font-bold text-grey-700">Create an Account</Link></p>
          </form>
          </div>
    </>
      )
    }
    
    export default Login
         {/* <div className="auth">
       <h1>Login</h1>
       <form>
         <input
    //       required
    //       type="text"
    //       placeholder="email"
    //       name="email"
    //       onChange={handleInputs}
    //     />
    //     <input
    //       required
    //       type="password"
    //       placeholder="password"
    //       name="password"        
    //       onChange={handleInputs}

    //     />
    //     <button onClick={handleSubmit} >Login</button>
    //     {
    //       err && <p>{err}</p>
    //     }
    //     <span>
    //       Don't you have an account? <Link to="/register">Register</Link>
    //     </span>
    //   </form>
    // </div> */}