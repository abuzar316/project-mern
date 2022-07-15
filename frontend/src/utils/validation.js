const validation = (values) => {
    const errors = {};
    // console.log(values)
    const emailValidation = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]+.[a-z0-9]{2,}$/;
    const passwordValidate = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const emailTest = emailValidation.test(values.email);
    // console.log("emailTest " + emailTest)
    
    const passwordTest = passwordValidate.test(values.password);
    const passwordTest2 = passwordValidate.test(values.oldPassword);
    // console.log("passwordTest " + passwordTest)
    // console.log("first")
    // console.log(values)
    if (values.name === '') {
        errors.name = "name is required";
    }
    if (values.password === '') {
        errors.password = "password is required";
    }
    if (values.username === '') {
        errors.username = "username is required";
    }
    if (values.email === '') {
        errors.email = "Enter Is required";
    }
    if (!emailTest && values.email !== undefined) {
        console.log(values.email)
        errors.email = "please enter a valid email";
    }
    if (!passwordTest && values.password !== undefined) {
        errors.password = "please Enter Strong password";
    }
    if (!passwordTest2) {
        errors.sPassword = "please Enter Strong password";
    }
    if (values.newPassword !== values.newCPassword) {
        errors.matchPassword = "Password Not Match";
    }

    // switch (true) {
    //     case (values.name === ''):
    //         errors.name = "name is required";
    //     // eslint-disable-next-line
    //     case (values.password === ''):
    //         errors.password = "password is required";
    //     // eslint-disable-next-line
    //     case (values.username === ''):
    //         errors.username = "username is required";
    //     // eslint-disable-next-line
    //     case (values.email === ''):
    //         errors.email = "Enter Is required";
    //     // eslint-disable-next-line
    //     case (!emailTest):
    //         errors.email = "please enter a valid email";
    //     // eslint-disable-next-line
    //     case (!passwordTest):
    //         errors.password = "please Enter Strong password";
    //     // eslint-disable-next-line
    //     default:
    //         break;
    // }

    return errors;
}

export default validation