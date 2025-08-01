import React, { useState } from "react";
import logo from '../images/mylogo.png';
import { Link } from "react-scroll";


const NavBar = () => {
  const [nav, setNav] = useState(false);

 const changeBackground = () => {
    if(window.scrollY >= 50){
        setNav(true);
    }
    else setNav(false);
 }
 window.addEventListener('scroll',changeBackground);

  return (
    <nav className={nav? "nav active": "nav"}>
      <Link to='main' className='logo'>
     <div className="logos"><img src={logo}/> </div> 
      </Link>
      <input className = 'menu-btn' type='checkbox' id='menu-btn'/>
       <label className="menu-icon" for='menu-btn'>
        <span className="nav-icon"></span>
       </label>
       <ul className='menu'>
        <li><Link to='main' smooth={true} duration ={1000}>Home</Link></li>
        <li><Link to='about'smooth={true} duration ={1000}>About</Link></li>
        <li><Link to='features'smooth={true} duration ={1000}>Services</Link></li>
        <li><Link to='support-wrap'smooth={true} duration ={1000}>Support</Link></li>
       </ul>
       
    </nav>
  );
};

export default NavBar;
