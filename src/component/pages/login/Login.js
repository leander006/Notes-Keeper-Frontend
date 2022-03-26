import React, {useContext, useState } from 'react'
import "./login.css";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import {Context} from '../../../Context/ContextProvider';
import { useToast } from '@chakra-ui/react'
const axios = require('axios')

const Login =()=> {
  const navigate = useNavigate();
  const toast = useToast()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext( Context);
const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const {data }= await axios.post("http://localhost:4000/api/auth/login",
    {
      username,
      password
    })
    localStorage.setItem("userInfo",JSON.stringify(data));
    navigate('/');
    toast({
      title: 'Login successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setUsername("");
    setPassword("");
    setUser(data);
    
  } catch (error) {
    if(!username || !password){
      return(
      toast({
        title: 'Enter all fields',
       
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      )
    }
    if(username.length>5){
      return(
      toast({
        title: 'Enter atleast 5 characters',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      )
    }
    if(password.length>5){
      return(
      toast({
        title: 'Enter atleast 5 characters',
 
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      )
    }
    else{
      return(
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      )
    }
   
  }

  
  };



return (
<>
<Navbar/>   
<div class="container">

    <div class="forms-container">
      <div class="signin">
        <form class="sign-in" onSubmit={handleSubmit}>
          <div class="input-field1">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} value={username} />
          </div>
          <div class="input-field1">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" value={password} className="form-control" onChange={e=>setPassword(e.target.value)}  name="password" />
          </div>
          <input type="submit" value="Login" class="btn1 solid" />
        </form>

      </div>
    </div>
  </div>
  </>
    )
}

export default Login
