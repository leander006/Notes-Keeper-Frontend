
import "./App.css";
import React, {useContext} from "react"

import Home from "./component/pages/home/Home";
import About from "./component/pages/about/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from './component/pages/login/Login'
import {  Context } from "./Context/ContextProvider";

import Register from "./component/pages/register/Register";


function App() {

  const {user} = useContext( Context);


  return (
    <>
    

        <Router>
            <Routes>
            <Route exact path="/*" element={!user?<Login/>:<Home/>}></Route>
              <Route  path="/register" element={<Register/>}></Route>
              <Route path="/about" element={!user?<Register/>:<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/home" element={user?<Login/>:<Home/>}></Route>
            </Routes>
        </Router>
  
    </>
  );
}

export default App;

