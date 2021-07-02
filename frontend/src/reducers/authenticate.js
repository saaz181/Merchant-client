const authReducer = (state=false, action) => {
    switch(action.type) {
        case "AUTHENTICATED":
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;