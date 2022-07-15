import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Sidebar from '../../components/dashboard/Sidebar';
import apiConfig from '../../config/apiConfig';
import { Input, Button, SpanError } from '../../components/style/style';
import validation from '../../utils/validation';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../../utils/Toastfy';


const Profile = () => {
    // const initialValues = { name: '', email: '', password: '', username: '' };
    const [formValues, setFormValues] = useState({ name: '', email: '', role: '', username: '', roleId: '' });
    const [formError, setFormError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const loginUser = useSelector((state) => state.UserReducer);
    // console.log(loginUser)

    const userProfile = async () => {
        try {
            const res = await apiConfig.get('/api/v0/profile', {
                headers: {
                    'Authorization': 'Bearer ' + loginUser.token
                }
            });
            if (res.data.status) {
                // console.log(res)
                setFormValues(res.data.user);
            }
        } catch (error) {
            errorToast("Something went wrong");
        }
    }

    useEffect(() => {
        userProfile();
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const err = validation(formValues);
            // console.log(err)
            setFormError(err);
            if (err.email || err.username || err.name) {
                console.log("validation failed");
                return false;
            } else {
                const res = await apiConfig.put('/api/v0/profileupdate', formValues, {
                    headers: {
                        'Authorization': 'Bearer ' + loginUser.token
                    }
                });
                if (res.data.status) {
                    loginUser.name = formValues.name;
                    loginUser.email = formValues.email;
                    successToast(res.data.message);
                }
            }
        } catch (error) {
            errorToast("Something went wrong")
        }
    }


    return (
        <>
            <div>
                <DashboardNavbar />
                <Sidebar />
                <div className="dashboard-body">
                    <h1>profile</h1>
                    <div className='  d-flex justify-content-center vh-100 align-center'>
                        <div className='pdd-5 shadow cl-3 border-radius'>
                            <h1 className='text-center color-theme'>Update profile</h1>
                            <form onSubmit={handleSubmit}>
                                <Input placeholder='Name' name='name' value={formValues.name} onChange={handleChange} type="text" />
                                <SpanError>{formError.name}</SpanError>
                                <Input placeholder='User Name' name='username' value={formValues.username} onChange={handleChange} type="text" />
                                <SpanError>{formError.username}</SpanError>
                                <Input placeholder='Email' name='email' value={formValues.email} onChange={handleChange} type="text" />
                                <SpanError>{formError.email}</SpanError>
                                <Input placeholder='role' name='role' value={formValues.role} disabled onChange={handleChange} type="text" />
                                <div className='text-center mt-5'>
                                    <Button type='submit'>update</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Profile;