import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogoutAction } from '../../redux/action/userAction';


const DashboardNavbar = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const Logout = () => {
        Navigate('/login');

        dispatch(userLogoutAction());
    }

    return (
        <div className='dashboard-navbar d-flex justify-content-space align-center'>
            <div className='logo'>
                <h1><Link to='/dashboard'>dashboard</Link></h1>
            </div>
            <ul className='item'>
                <li onClick={Logout} >Logout</li>
            </ul>
        </div>
    )
}

export default DashboardNavbar