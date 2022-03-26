import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./navbar.css";
import { useToast } from '@chakra-ui/react'

import {Context} from '../../Context/ContextProvider';

function Navbar() {

    const[display,setDisplay]=useState(false);
    const {user,setUser} = useContext( Context);
    const navigate = useNavigate();
    const toast = useToast()
   const handleClick =(e)=>{
    e.preventDefault();
       setDisplay(true);
   }
   
   const handleLogout =()=>{
    
    localStorage.removeItem("userInfo");
    setUser(null);
    toast({
        title: 'Logout',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    navigate("/login");
}
   const handleClose =(e)=>{
    e.preventDefault();
    setDisplay(false);
}
const handleLogin = () =>{
    navigate("/login");
}

const handleRegister = () =>{
    navigate("/register");
}
// const {user} = useContext( Context);

  return (
 
         
    <nav className={display?"navbar":""}>
    {display?<i className="fa-solid  fa-xl fa-xmark"  id="closeicon" onClick={handleClose} ></i>: <i className="fa-solid fa-xl fa-bars " id={!display?"icon":""} onClick={handleClick}></i> }
        <div className='itemLeft' id="left">
       
            <h1>Notes-Keeper</h1>
        </div>
        <div className='itemCenter' id="center">
            <div className='item' id={display?"it":""}>
            <Link to="/">HOME</Link>
            </div>
       
            <div className='item'  id={display?"it":""}>
            <Link to="/about">ABOUT</Link>
            </div>
            {user && <div className='itemR' id={display?"it":""} onClick={handleLogout}>LOGOUT</div>}
            {!user && <div className='itemR' id={display?"it":""} onClick={handleLogin}>LOGIN</div>}
            {!user && <div className='itemR' id={display?"it":""} onClick={handleRegister}>REGISTER</div>}
        
        </div>  
    <div className='itemRight'>
           {user && <div>
            <p className='text' id={display?"txt":""} style={{textTransform: 'capitalize'}}>{(user?.others?.username)}</p>
            </div>}
        </div>

    </nav>
   
  )
}

export default Navbar