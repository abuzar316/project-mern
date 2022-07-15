import React, { useState } from 'react';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import Sidebar from '../../components/dashboard/Sidebar';
import apiConfig from '../../config/apiConfig';
import { Input, Button, SpanError } from '../../components/style/style';
import validation from '../../utils/validation';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../../utils/Toastfy';
import { useSelector } from 'react-redux';


const ChangePassword = () => {
    const [formValues, setFormValues] = useState({ oldPassword: "", newPassword: "", newCPassword: "", });
    const [formError, setFormError] = useState({})

    const loginUser = useSelector((state) => state.UserReducer);


    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let err = validation(formValues);
            setFormError(err);
            if (err.sPassword || err.matchPassword) {
                console.log("validation failed");
                return false;
            }
            const results = await apiConfig.put('/api/v0/changepassword', formValues, {
                headers: {
                    'Authorization': 'Bearer ' + loginUser.token,
                }
            });
            if (results.data.status) {
                successToast("Password updated successfully");
            } else {
                errorToast("something went wrong");
            }
        } catch (error) {
            // console.log(error.response.data.message);
            errorToast(error.response.data.message);
        }


    }

    return (
        <div>
            <DashboardNavbar />
            <Sidebar />
            <div className="dashboard-body">
                <h1> Change Password</h1>
                <div className='  d-flex justify-content-center vh-100 align-center'>
                    <div className='pdd-5 shadow cl-3 border-radius'>
                        <h1 className='text-center color-theme'>Update profile</h1>
                        <form onSubmit={handleSubmit}>
                            <Input placeholder='old Password' name='oldPassword' value={formValues.oldPassword} onChange={handleChange} type="password" />
                            <SpanError>{formError.sPassword}</SpanError>
                            <Input placeholder='new Password' name='newPassword' value={formValues.newPassword} onChange={handleChange} type="password" />
                            <SpanError>{formError.matchPassword}</SpanError>
                            <Input placeholder='new Confirm Password' name='newCPassword' value={formValues.newCPassword} onChange={handleChange} type="password" />
                            <SpanError>{formError.matchPassword}</SpanError>
                            <div className='text-center mt-5'>
                                <Button type='submit'>update Password</Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default ChangePassword