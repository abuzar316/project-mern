import React, { useState } from 'react';
import { Input, Button, SpanError } from '../components/style/style';
import validation from '../utils/validation';
import { ToastContainer } from 'react-toastify';
import apiConfig from '../config/apiConfig';
import { successToast, errorToast } from '../utils/Toastfy';



const Signup = () => {
    const initialValues = { name: '', email: '', password: '', username: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});

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
        <>
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
                        <div className='text-center mt-5'>
                            <Button type='submit'>Sign Up</Button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Signup;