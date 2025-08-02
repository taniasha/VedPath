import React, { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // This runs once when the app loads, and it:
  // Checks if the user was already logged in (from previous session)
  // If yes, it sets the user state with that data
  // So even on page refresh, your app still remembers the user is logged
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // ✅ parse the string
        setUser({ token, ...parsedUser }); // ✅ spread parsed object
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      } //Spread user data : name, email, _id
    }
  }, []);



  //This calls when user is successfully logged in : it saves data to localstorage --> update user state
  const login = (data) => {
    console.log("💡 Received login data:", data);
    const userData = data.user || data;

    if (!userData._id || !userData.name) {
      console.warn("⚠️ Missing user info in login response.");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser({
      token: data.token,
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    });
    console.log("✅ Login successful for:", userData.name);
  };


  const logout = () => {
    //Clears all login info
    localStorage.clear();
    setUser(null);
    setTimeout(()=>{
      // toast.success("You has been logged out.");
      navigate("/login");
  },1000)
  };

  return (
    //!!user converts user into a true or false:
    // !!{ token: 'abc' } → true
    // !!null → false
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
