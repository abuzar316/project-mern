import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    const user = useSelector((state) => state.UserReducer);

    if (user.token === undefined || user.token === null) return <Navigate to="login" />

    return <Outlet />
}

export default PrivateRoute;