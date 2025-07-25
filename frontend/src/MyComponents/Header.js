import React from 'react'
import { Link } from 'react-router-dom';

function Header({openLoginModal}) {
  return (
    <div id='main'>
   <div className='name'>
    <h2>Welcome to <span>DineSmart</span></h2>
    <p className='details'>Simplifying meal planning and payments for your convenience</p>
    <div className='header-btns'>
        <button onClick={openLoginModal} className='header-btn'>Sign-in</button>
    </div>
    
   </div>

    </div>
  )
}

export default Header;