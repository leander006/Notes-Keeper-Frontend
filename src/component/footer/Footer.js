import React from 'react'
import './footer.css';
function Footer() {
  return (
    <footer>
        <div className='body'>
            <h5>Made by <i className="fa-solid fa-heart love"></i> </h5>   
        </div>
        <div className='socials'>
        <a href='https://www.linkedin.com/feed/' target="_blank" ><i className="fa-brands  fa-2xl fa-linkedin" id='linkedin'></i></a> 
        <a href='https://github.com/' target="_blank" ><i className="fa-brands  fa-2xl fa-github" id='github'></i></a>
        <a href='https://mail.google.com' target="_blank" ><i className="fa-solid  fa-2xl fa-envelope" id='emai'> </i>  </a>
             
        </div>
    </footer>
  )
}

export default Footer