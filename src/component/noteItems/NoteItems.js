import React, { useContext, useState } from 'react';
import EditNotes from '../editNotes/EditNotes';
import Navbar from '../navbar/Navbar';
import { useToast } from '@chakra-ui/react'
import Note from '../notes/Note';
import './noteItems.css';

import {  Context } from "../../Context/ContextProvider";
import axios from 'axios';

import NoPreview from '../noOutPut/NoPreview';
function NoteItems() {
    const toast = useToast()
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const {user,notes,setNotes,visible,setVisible} = useContext( Context);


    const handleEdit  = (e) =>{
        e.preventDefault();

        setVisible(true);
        setAddNotes(false);
    } 
    const [addNotes, setAddNotes] = useState(false)
    const handleClick  = async(e) =>{
        e.preventDefault();
        
        setAddNotes(true);
    } 

    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${user.token}`
            }
          }
    try {
        
        const {data} = await axios.post("http://localhost:4000/api/note/addnote",{
                title:title,
                description:desc,
                userId:user.others._id

        },config)

        setTitle("");
        setDesc("");
        toast({
            title: 'Note addedd successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        setNotes([data,...notes]);
        setAddNotes(false);
        setVisible(false);

    } catch (error) {
        if(!title && !desc){
            return(
                toast({
                    title: 'Please enter atleast one field',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                  })
                
            )
        }
        else{
            return(
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  })
        )}} 
    }   
  return (
<>

    <Navbar/>
    <div className='notes' >
       
    <div className='slideBar' >
    
        <button type='submit' className='addButton' onClick={handleClick}> Add new notes</button>
        <div className='box' >   
        <div className='wrapper' onClick={handleEdit}>
            {notes.map((n) =>(
                <Note key={n._id} note={n}/>
            ))}
        </div>
    </div>         
        
    </div>

    {addNotes?<div className='notesPreview' >
        
            <input type='text' className='title' placeholder='Enter Title' onChange={e=>setTitle(e.target.value)} value={title}></input>
         
            <textarea className='desc' placeholder='Enter Description' onChange={e=>setDesc(e.target.value)} value={desc}></textarea>
            
            <button className='add' type='submit' onClick={handleSubmit}>Add Notes</button>
    
   
    </div> :visible?<EditNotes />:<NoPreview/>
    }
    
</div>

</>

  )
}

export default NoteItems