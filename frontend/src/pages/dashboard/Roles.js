import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import apiConfig from '../../config/apiConfig';
import { useSelector } from 'react-redux';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from 'sweetalert2';
import { errorToast, successToast } from '../../utils/Toastfy';
import { ToastContainer } from 'react-toastify';
import { Input, Button } from '../../components/style/style';


// let permi = {
//     CREATE_USER: "CREATE USER",
//     READ_USER: "READ USER",
//     DELETE_USER: "DELETE USER",
//     UPDATE_USER: "UPDATE USER",
// }

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState({ roleName: '', id: "" });
    const [permissions, setPermissions] = useState([])
    const [allPermission, setAllPermission] = useState([])

    const loginUser = useSelector((state) => state.UserReducer);


    const deleteUser = async (userId) => {
        try {
            const swAlert = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                // icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })

            if (!swAlert.value) {
                return false;
            }

            const result = await apiConfig.delete(`api/v0/deleteuser/${userId}`, {
                headers: {
                    // 'Authorization': 'Bearer ' + loginUser.token,
                },
            });

            if (result.data.status) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                return false;
            } else {
                errorToast("User not deleted");
            }
        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    const getRoles = async () => {
        try {
            const res = await apiConfig.get(`/api/v0/allroles`, {
                headers: {
                    "Authorization": "Bearer " + loginUser.token,
                }
            });
            const resp = await apiConfig.get(`/api/v0/user/permission`, {
                headers: {
                    "Authorization": "Bearer " + loginUser.token,
                }
            });

            const respo = await apiConfig.get(`/api/v0/all/permission`, {
                headers: {
                    "Authorization": "Bearer " + loginUser.token,
                }
            });

            if (res.data.status && resp.data.status && respo.data.status) {
                setAllPermission(respo.data.permissions)
                setPermissions(resp.data.rolePermissions);
                return setRoles(res.data.roles);
            } else {
                return errorToast("something went wrong");
            }
        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    const editUser = async (e) => {
        try {
            e.preventDefault();
            const results = await apiConfig.put(`/api/v0/edituser/${userRole.id}`, userRole, {
                headers: {
                    'Authorization': 'Bearer ' + loginUser.token,
                }
            });
            if (results.data.status) {
                setOpen(false);
                successToast("user updated successfully");
                return false;
            }
            errorToast("Something went wrong");

        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    const modalOpneHide = () => {
        setOpen(!open)
    }

    const selectUser = async (role) => {
        setUserRole({ roleName: role.roleName, id: role.id });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserRole({ ...userRole, [name]: value });
    }

    useEffect(() => {
        getRoles()
        // eslint-disable-next-line
    }, [])

    // console.log(roles)
    // console.log(permissions)
    // console.log(allPermission)
    return (
        <>
            <div>
                <ToastContainer />
                <DashboardNavbar />
                <Sidebar />
                <div className="dashboard-body">
                    <h1>All Roles</h1>
                    <div className='user-table pdd-5'>
                        <table className='cl-12' border="1" collapse="collapse">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Role Name</th>
                                    {
                                        allPermission.map((e, i) => {
                                            return (
                                                <th key={i}>{e.permissionName}</th>
                                            )
                                        })
                                    }
                                    {/* <th>{permi.READ_USER}</th>
                                    <th>{permi.CREATE_USER}</th>
                                    <th>{permi.UPDATE_USER}</th>
                                    <th>{permi.DELETE_USER}</th> */}
                                    <th>action</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    permissions.map((e, i) => {
                                        console.log(e)
                                        return (
                                            <tr key={i}>
                                                <th>{e.role.id}</th>
                                                <th>{e.role.roleName}</th>
                                                <th> <button onClick={() => deleteUser(e.role.id)} className='btn color-delete'><AiFillDelete /></button> </th>
                                                <th> <button onClick={() => { selectUser(e.role); modalOpneHide() }} className='btn color-edit'><AiFillEdit /></button> </th>
                                            </tr>
                                        )
                                    })
                                } */}
                                {
                                    roles.map((role, index) => {
                                        // console.log(role)
                                        return (
                                            <tr key={index}>
                                                <th>{role.id}</th>
                                                <th>{role.roleName}</th>
                                                {
                                                    allPermission.map((e, i) => {
                                                        // console.log(e.permissionName)
                                                        // console.log("first")
                                                        if(permissions[i] !== undefined ){
                                                            console.log(permissions[i].role.roleName)
                                                            // console.log(permissions[i].permission.permissionName)
                                                            
                                                        }

                                                    })
                                                }
                                                <th> <button onClick={() => deleteUser(role.id)} className='btn color-delete'><AiFillDelete /></button> </th>
                                                <th> <button onClick={() => { selectUser(role); modalOpneHide() }} className='btn color-edit'><AiFillEdit /></button> </th>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
                <div className={open ? "model-overlay visible-show" : 'model-overlay'} onClick={modalOpneHide}></div>
                <div className={open ? "model-container border-radius visible-show" : 'model-overlay'} >
                    <div className='model pdd-4'>
                        <form method='POST' onSubmit={editUser}>
                            <Input type="text" value={userRole.roleName} name="email" placeholder='Email' onChange={handleChange} />
                            {/* <Input type="text" value={userRole.name} name="name" placeholder='Name' onChange={handleChange} /> */}
                            {/* <Input type="text" value={userRole.username} name="username" placeholder='username' onChange={handleChange} /> */}
                            <div className='text-center mt-5'>
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Roles;