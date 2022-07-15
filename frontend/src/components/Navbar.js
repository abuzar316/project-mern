import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className="navigation">
            <div className='custom-container '>
                <div className='d-flex justify-content-space align-center'>
                    <div className='Logo'>
                        <Link to="/"><h1>Chetu</h1></Link>
                    </div>
                    <div className='item'>
                        <ul className='d-flex'>
                            <li><Link to="/" className='pdd-4' >Home</Link></li>
                            <li><Link to="/signup" className='pdd-4' >Sign Up</Link></li>
                            <li><Link to="/login" className='pdd-4' >Login</Link></li>
                            <li><Link to="/" className='pdd-4' >Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;