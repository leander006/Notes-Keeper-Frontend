import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import './register.css';
import { useToast } from '@chakra-ui/react'
const Register = () => {
    const toast = useToast()
    const navigate = useNavigate();
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:4000/api/auth/register',{
            username,
            email,
            password
          })
          toast({
            title: 'Registers successfully',
          
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          navigate('/login');
         
        } catch (error) {
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
          if(!username || !password || ! email){
            return(
            toast({
              title: 'Enter all fields',
             
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
      }
    return (
      <>
  <Navbar/>   
<div class="container1">

      <div class="forms-container">
        <div class="signup">
          <form action="#" class="sign-up" onSubmit={handleSubmit}>
            <div class="input-field2">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div class="input-field2">
            <i class="fa-solid fa-envelope"></i>
              <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
            </div>
            <div class="input-field2">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Register" class="btn2 solid" />
          </form>

        </div>
      </div>

     
    </div>
    </>
    )
}

export default Register
