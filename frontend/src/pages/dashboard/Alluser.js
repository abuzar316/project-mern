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


const Alluser = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({ name: '', email: "", username: '', id: "" });

    const [allUser, setAllUser] = useState([])

    const loginUser = useSelector((state) => state.UserReducer);

    const getAllUsers = async () => {

        const result = await apiConfig.get("api/v0/allusers", {
            headers: {
                'Authorization': 'Bearer ' + loginUser.token,
            },
        });
        if (result.data.status) {
            // console.log(result.data.all);
            setAllUser(result.data.alluser);
        }

    }

    useEffect(() => {
        getAllUsers()
        // eslint-disable-next-line
    }, [])

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
                    'Authorization': 'Bearer ' + loginUser.token,
                },
            });

            if (result.data.status) {
                getAllUsers()
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

    const modalOpneHide = () => {
        setOpen(!open)
    }

    const selectUser = async (user) => {
        setUser({ name: user.name, email: user.email, username: user.username, id: user.id });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const editUser = async (e) => {
        try {
            e.preventDefault();
            const results = await apiConfig.put(`/api/v0/edituser/${user.id}`, user, {
                headers: {
                    'Authorization': 'Bearer ' + loginUser.token,
                }
            });
            if (results.data.status) {
                setOpen(false);
                successToast("user updated successfully");
                getAllUsers()
                return false;
            }
            errorToast("Something went wrong");

        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    return (
        <>
            <div>
                <ToastContainer />
                <DashboardNavbar />
                <Sidebar />
                <div className="dashboard-body">
                    <h1>All user</h1>
                    <div className='user-table pdd-5'>
                        <table className='cl-12' border="1" collapse="collapse">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>Email</th>
                                    <th>username</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUser.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{user.id}</th>
                                                <th>{user.name}</th>
                                                <th>{user.email}</th>
                                                <th>{user.username}</th>
                                                <th> <button onClick={() => deleteUser(user.id)} className='btn color-delete'><AiFillDelete /></button> </th>
                                                <th> <button onClick={() => { selectUser(user); modalOpneHide() }} className='btn color-edit'><AiFillEdit /></button> </th>
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
                            <Input type="text" value={user.email} name="email" placeholder='Email' onChange={handleChange} />
                            <Input type="text" value={user.name} name="name" placeholder='Name' onChange={handleChange} />
                            <Input type="text" value={user.username} name="username" placeholder='username' onChange={handleChange} />
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

export default Alluser