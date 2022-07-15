import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
// import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Alluser from '../pages/dashboard/Alluser';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/dashboard/Profile';
import ChangePassword from '../pages/dashboard/ChangePassword';
import CreateUser from '../pages/dashboard/CreateUser';
import Roles from '../pages/dashboard/Roles';


const IndexRoutes = () => {

    return (
        <>

            {/* <Navbar /> */}

            <Routes>

                <Route exact path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path="/admin" element={"adminhome"} />
                <Route path="/user" element={"user"} />

                <Route path='/' element={<PrivateRoute />} >

                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/alluser' element={<Alluser />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='admin/changepassword' element={<ChangePassword />} />
                    <Route path='admin/create/user' element={<CreateUser />} />
                    <Route path='admin/roles' element={<Roles />} />
                
                </Route>


            </Routes>
        </>
    )
}

export default IndexRoutes;