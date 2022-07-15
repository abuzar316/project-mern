import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Sidebar from '../../components/dashboard/Sidebar';
import apiConfig from '../../config/apiConfig';
import { Input, Button, SpanError } from '../../components/style/style';
import validation from '../../utils/validation';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../../utils/Toastfy';
import { useSelector } from 'react-redux';

const CreateUser = () => {
    const initialValues = { name: '', email: '', password: '', username: '', roleId: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [roles, setRoles] = useState([]);

    const loginUser = useSelector((state) => state.UserReducer);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const registerUser = async () => {
        try {
            const res = await apiConfig.post(`api/v0/register`, formValues);
            // console.log("res", res)
            if (res.data.status) {
                setFormValues(initialValues)
                return successToast("registered successfully");
            } else {
                return errorToast("register failed")
            }

        } catch (error) {
            // console.log("error",error.response.data)
            // console.log(error)
            errorToast(`${error.response.data.msg}`);
            // setFormError(initialValues)
        }
    }

    const userRoleGet = async () => {
        try {
            const res = await apiConfig.get(`/api/v0/allroles`, {
                headers: {
                    "Authorization": "Bearer " + loginUser.token
                }
            });
            if (res.data.status) {
                return setRoles(res.data.roles);
            } else {
                return errorToast("something went wrong");
            }
        } catch (error) {
            errorToast(`${error.response.data.msg}`);
        }
    }

    useEffect(() => {
        userRoleGet();
        // eslint-disable-next-line
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()
        const err = validation(formValues);
        setFormError(err);
        if (err.email || err.password || err.username || err.name) {
            console.log("validation failed");
            return false;
        }
        // console.log("all done");
        registerUser()
    }


    return (
        <div>
            <DashboardNavbar />
            <Sidebar />
            <div className="dashboard-body">
                <h1> Create User</h1>
                <div className='  d-flex justify-content-center vh-100 align-center'>
                    <div className='pdd-5 shadow cl-3 border-radius'>
                        <h1 className='text-center color-theme'>SignUp</h1>
                        <form onSubmit={handleSubmit}>
                            <Input placeholder='Name' name='name' value={formValues.name} onChange={handleChange} type="text" />
                            <SpanError>{formError.name}</SpanError>
                            <Input placeholder='User Name' name='username' value={formValues.username} onChange={handleChange} type="text" />
                            <SpanError>{formError.username}</SpanError>
                            <Input placeholder='Email' name='email' value={formValues.email} onChange={handleChange} type="text" />
                            <SpanError>{formError.email}</SpanError>
                            <Input placeholder='Password' name='password' value={formValues.password} onChange={handleChange} type="password" />
                            <SpanError>{formError.password}</SpanError>
                            <select className="cl-12 pdd-3" name="roleId" onChange={handleChange} id="">
                                {
                                    roles.map((role) => {
                                        return (
                                            <option key={role.id} value={role.id}>{role.roleName}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className='text-center mt-5'>
                                <Button type='submit'>Create User</Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateUser;