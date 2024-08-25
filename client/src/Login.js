import React, { useState } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css'
export default function Login() {
  const hii=()=>{
    console.log("huu");
  }
  const navigate=useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const login=async(event)=>{
    try {
      console.log("login");
      const res=await axios.post('http://localhost:9001/login',{username:username,password:password}).then((response)=>{console.log(response)
    if (response.data=='success')
    {
      navigate('/main');
    }
    else{
      alert("wrong credentials");
    }
    
    });
     
      
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login">
        <br />
        <br />
       
        <div class="login-container">
    <h2>Login</h2>
    <form class="login-form"  method="post">
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required onChange={(e)=>{console.log(hii);setUsername(e.target.value)}}/>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required onChange={(e)=>{console.log(hii);setPassword(e.target.value)}}/>
        </div>
        <div class="form-group">
            <button type="button" onClick={login}>Login</button>
        </div>
    </form>
</div>
    </div>
  )
}
