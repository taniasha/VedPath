import React, { useState } from 'react';
import '../index.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
console.log(form)
  
  const handleSignupUser=()=>{
     axios.post("http://localhost:5000/auth/signup",{
      name: form.name,
      email: form.email,
      password: form.password
     })
    .then((resp)=> {
        console.log(resp.data);

        // Store token and user details
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        toast.success("Signup Successfull!");
        navigate("/");
    })
    .catch((e)=>{
       console.log('error',e.message)
       toast.error("Signup failed!");
      })
  }

  const handleSubmit = (e) => {
    // console.log(form);
    handleSignupUser();
    setForm({name:'', email:'', password:''});
  };


  return (
    <div className="login-container" id="signup-container">
      <div className="login-form" >
        <h2 className="login-title">🔱 VedPath Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  );
}
