import { combineReducers } from "redux";
import cartCountReducer from "./cart";
import openReducer from "./openSnack";


// import counterReducer from "./counter";
// import loggedReducer from "./isLogged";


// const rootReducer = combineReducers({
//     counter: counterReducer,
//     isLogged: loggedReducer
// })

// export default rootReducer;


const rootReducer = combineReducers({
    open: openReducer,
    counter: cartCountReducer,
})

export default rootReducer;