import axios from "axios";
import { createContext,useContext, useEffect, useState} from "react";

export const Context = createContext();

const ContextProvider =({children}) =>{
const [user, setUser] = useState("");
const [notes, setNotes] = useState([])
const [edit, setEdit] = useState(false);
const [delet, setDelete] = useState(false);
const [visible, setVisible] = useState(false);
useEffect(() => {
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

}, [])

useEffect(() => {
    const getNotes = async() =>{
    const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
    }
  }
        try {
                                   
            const {data}= await axios.get(`http://localhost:4000/api/note/fetchallnotes/${JSON.parse(localStorage.getItem("userInfo"))?.others?._id}`,config);
            setNotes(data);   
        } catch (error) {
            console.log(error.message);
        }
    };
    getNotes ();
 
},[user,delet,edit])

  
    return < Context.Provider value={{user,setUser,notes,setNotes,edit, setEdit,delet, setDelete,visible, setVisible}}>{children}</Context.Provider>

}

export const ContextState = () =>{
    return useContext(ContextProvider);
}


export default ContextProvider;