import React from 'react'
import './notes.css';
import { Link } from "react-router-dom";

function Note(note) {

  return (
   
        <div className='noteElements' >
                <div className='elementTitle'>
                <Link style={{textTransform: 'capitalize'}} to={`/${note.note._id}`} className="link">
                    {(note.note.title).length>16?(note.note.title).substring(0, 18).concat(".."):(note.note.title).substring(0, 100)}
                </Link>
                </div>
                <div className='elementDesc'>
                    <p style={{textTransform: 'capitalize'}}>{note.note.description.length>100?(note.note.description).substring(0, 100).concat(".."):(note.note.title).substring(0, 100)}</p>
                </div>
                <div className='elementDate'>
                    <h6>{new Date(note.note.createdAt).toDateString()}</h6>
                </div>
         </div>
    
  )
}

export default Note;