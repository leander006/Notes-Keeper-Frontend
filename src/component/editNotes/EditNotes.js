import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './editNotes.css';
import {Context} from '../../Context/ContextProvider';
import { useToast } from '@chakra-ui/react'
function EditNotes() {

    const toast = useToast()
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDesc, setUpdatedDesc] = useState("")
    const [showNote, setShowNote] = useState(true)
   
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
  
    const {user,setEdit,edit, setDelete,setVisible} = useContext( Context);
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    // https://localhost:3000/342134231
    // [https://localhost:3000, 342134231]


    const handleEdit = (e) =>{
        e.preventDefault();
        setShowNote(false);
     
    }
    const handledelete =async(e) =>{
        e.preventDefault();
        try {
            const config = {
                headers:{
                  "Content-type" :"application/json",
                  Authorization:`Bearer ${user.token}`
                }
              }
            await axios.delete("http://localhost:4000/api/note/deletenote/"+path,config);
            setVisible(false);
            setDelete(true);
            toast({
              title: 'Deleted successfully',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
        } catch (error) {
          toast({
            title: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
       
    }

    const handleupdate = async(e) =>{
        e.preventDefault();
        try {
            const config = {
                headers:{
                  "Content-type" :"application/json",
                  Authorization:`Bearer ${user.token}`
                }
              }
              await axios.put("http://localhost:4000/api/note/updatenote/" + path,{
                title:updatedTitle,
                description:updatedDesc,
                userId:user.others._id
              },config);
              // setNotes([...notes]);
              setEdit(true);
              setShowNote(false);
              setVisible(false);
              if(!updatedTitle && !updatedDesc){
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
                  title: 'Updated successfully',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                })
              )
            }    
        }catch (error) {
            toast({
                  title: error.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
          }
      }   

    useEffect(() => {
        const getNote = async() =>{
          const config = {
            headers:{
              "Content-type" :"application/json",
              Authorization:`Bearer ${user.token}`
            }
          }
          const {data} = await axios.get("http://localhost:4000/api/note/getNote/" + path,config);

          setTitle(data.title);
          setDesc(data.description);
          setDate(data.createdAt);
        }
        getNote();
      },[edit,path]);

  return (
      <>
   
<div className='edit'>
 {showNote && <div className='mainPart'>
       <div className='upperPart'>
            <div className='date'>
                <h5 style={{textTransform: 'capitalize'}}>{new Date(date).toDateString()}</h5>
            </div>
            <div className='setting'>
                <i className="fa-solid fa-trash-can" id='delete' onClick={handledelete} ></i>
                <i className="fa-solid fa-pen-to-square" id='edit' onClick={handleEdit}></i>
            </div> 
        </div>
        <div className='lowerPart'>
            <h1 style={{textTransform: 'capitalize'}} className='addtitle'>{title}</h1>
            <p  style={{textTransform: 'capitalize'}} className='desc'>{desc} </p>
        </div> 
</div> } 
{!showNote && <div>
<div className='lowerPart'>
            <input type='text' placeholder={title} className='titleEdit' value={updatedTitle} onChange={e =>{setUpdatedTitle(e.target.value)}}></input>
            <textArea placeholder={desc}  className='descEdit' value={updatedDesc} onChange={e =>{setUpdatedDesc(e.target.value)}}></textArea>
            <button type='submit' className='update' onClick={handleupdate}>Update</button>
        </div>  
        </div>}
    </div>
    </>
  ) 
}

export default EditNotes