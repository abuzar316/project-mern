import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const user = useSelector((state) => state.UserReducer);
  // console.log(user)
  return (
    <>
      <div>
        <DashboardNavbar />
        <Sidebar />
        <div className="dashboard-body">
          <h1>Dashboard body</h1>
          <h1>Name : {user.name}</h1>
        </div>
      </div>
    </>
  )
}

export default Dashboard