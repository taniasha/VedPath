import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
   const[form,setForm] = useState({
     email:'',
     password:''
   });
   const {login} = useAuth();


   const handleChange=(e)=>{
      setForm({...form, [e.target.name]: e.target.value})
   }


   const handleLoginUser=()=>{
    axios.post(`${API_URL}/auth/login`,{
       email: form.email,
       password:form.password
    })
    .then((response)=> {
      const { user, token } = response.data;
      console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        if(user.email === 'vedpath@gmail.com'){
          toast.success("Welcome Admin")
          login(response.data);
          navigate('/adminpanel');
        }else{
          login(response.data);  // using AuthContext()
          setForm({email:'', password:''});
          toast.success("Login successfull!")

          setTimeout(() => {
            navigate("/") 
          }, 1000);
        }
    })
    .catch((e) => {
      toast.error("Login Failed")
      if (e.response) {
        console.log("Backend error:", e.response.data);
      } else {
        console.log("Error:", e.message);
      }
    });
   }


   const handleSubmit=(e)=>{
    e.preventDefault();
    handleLoginUser();
    console.log(form);
  }

  return (
    <>

        <div className="login-container mt-0">
            <div className="login-form" >
                <h2 className="login-title">🔱 VedPath Login</h2>
                <input type="text" id="email" onChange={(handleChange)} name="email" value={form.email} placeholder="Enter Email"/>
                <br />
                <input type="password" id="Password" onChange={handleChange} name="password" value={form.password} placeholder='Enter Password'/>
                <button onClick={handleSubmit}>Submit</button>
                <h5><Link to="/signup" style={{textDecoration:'none',color: '#a67c00'}}>Not Register? Signup</Link></h5>
            </div>
        </div>
    </>
  )
}
