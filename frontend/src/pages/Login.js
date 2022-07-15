import React, { useState } from 'react';
import { Input, Button, SpanError } from '../components/style/style';
import validation from '../utils/validation';
import apiConfig from '../config/apiConfig';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../utils/Toastfy';
import { useDispatch ,useSelector} from "react-redux";
import userAction from '../redux/action/userAction';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const initialValues = { email: '', password: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const dispatch = useDispatch();

    const loginUser = useSelector((state) => state.UserReducer);
    console.log(loginUser);

    const navigation = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }


    const userLogin = async () => {
        try {
            const res = await apiConfig.post(`api/v0/login`, formValues);
            // console.log("res", res)
            if (res.data.status) {
                // console.log(res.data.user)
                dispatch(userAction(res.data.user));
                setFormValues(initialValues)
                navigation('/dashboard');
                return successToast("Login successfully");
            } else {
                return errorToast("login failed")
            }
        } catch (error) {
            errorToast(`${error.response.data.msg}`);
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = validation(formValues);
        setFormError(err);
        if (err.email || err.password) {
            errorToast(`validation failed`);
            console.log("validation failed");
            return false
        }
        userLogin();
        // console.log("all done");
    }

    return (
        <>
            <div className='  d-flex justify-content-center vh-100 align-center'>
                <div className='pdd-5 shadow cl-3 border-radius'>
                    <h1 className='text-center color-theme'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <Input placeholder='Email' name='email' value={formValues.email} onChange={handleChange} type="text" />
                        <SpanError>{formError.email}</SpanError>
                        <Input placeholder='Password' name='password' value={formValues.password} onChange={handleChange} type="password" />
                        <SpanError>{formError.password}</SpanError>
                        <div className='text-center mt-5'>
                            <Button type='submit'>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login;