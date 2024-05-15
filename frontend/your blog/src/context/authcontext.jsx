import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();



export const AuthContexProvider = ({ children }) => {
  const [showProfileEdit , setShowProfileEdit] = useState(false)
  const [personalProfile, setpersonalProfile] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8888/api/auth/login", inputs, { withCredentials: true  });
     
    setCurrentUser(res.data );
    console.log(res.data.username)
    return res.data.username
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8888/api/auth/logout" , { withCredentials: true  });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout , setShowProfileEdit , showProfileEdit , personalProfile , setpersonalProfile}}>
      {children}
    </AuthContext.Provider>
  );
};