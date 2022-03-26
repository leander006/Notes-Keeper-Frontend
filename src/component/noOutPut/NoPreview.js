import React from 'react'
import './nopreview.css';
function NoPreview() {
  return (
    <div className='not'>
        <img src='unfound.svg' alt='not found'></img>
        <h1>Nothing Selected</h1>
    </div>
  )
}

export default NoPreview