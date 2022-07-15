
const addTodo = (payload) => {
    console.log("payload");
    console.log(payload);
    return {
        type: "AddTodo",
        payload: payload
    }
}


export default addTodo;