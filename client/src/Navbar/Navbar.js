import React from 'react';
import { Link } from 'react-router-dom';
import BookedSlots from './BookedSlots';
import "./navbar.css";

function Navbar() {

  const handleLinkClick = () =>{
   <BookedSlots/>  
  }  

  

  return (
    <div className='body1'>
    <header className='header'>
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/slotstobook" className="nav-link">Explore Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/bookedslots" className="nav-link" onClick={handleLinkClick}>Booked Products</Link>
        </li>
      </ul>
      </nav>
      </header>
      </div>
      
  );
}

export default Navbar;
