import React from 'react';
import './body.css';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <footer className='myfoot'>
        <div className="container">
            <div className="footer-content">
                <div className="footer-logo">
                    <h1>Explore Products</h1>
                </div>
                <div className="footer-links">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/bookedslots">Explore Products</a></li>
                        <li><a href="/slotstobook">Booked Products</a></li>
                    </ul>
                </div>
            </div>
            <p>&copy; 2024 Explore Products. All rights reserved.</p>
        </div>
    </footer>
    );
  }
  
  export default Footer;