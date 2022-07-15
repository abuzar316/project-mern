const initialValues = 0;

const addTodo = (state = initialValues, action) => {
    // console.log("action")
    // console.log(action)
    switch (action.type) {
        case "AddTodo": return state + 1; 
        default: return state;
    }
}

export default addTodo;