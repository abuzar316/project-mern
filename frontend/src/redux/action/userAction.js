

const userAction = (payload) => {
    // console.log("payload");
    // console.log(payload);
    return {
        type: "LOGIN_USER",
        payload: payload,
    }
}

export const userLogoutAction = () => {
    return {
        type: "LOGOUT_USER",
    }
}


export default userAction;