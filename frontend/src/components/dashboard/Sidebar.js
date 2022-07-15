import React from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    return (
        <div className="dashboard-sidebar">
            <ul className="item">
                <li><Link to='/dashboard' >dashboard</Link></li>
                <li><Link to='/alluser' >All User</Link></li>
                <li><Link to='/admin/create/user' >Create User</Link></li>
                <li><Link to='/profile' >profile</Link></li>
                <li><Link to='/admin/changepassword' >Change Password</Link></li>
                <li><Link to='/admin/roles' >Roles</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;