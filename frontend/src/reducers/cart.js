const cartCountReducer = (state=0, action) => {
    switch(action.type) {
        case "ADD":
            return state + action.payload;
        
        case "DELETE":
            return state - 1;
        
        default:
            return state;
    }
}

export default cartCountReducer;