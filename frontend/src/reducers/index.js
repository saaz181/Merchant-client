import { combineReducers } from "redux";
import cartCountReducer from "./cart";
import cartItemsReducer from "./cartItems";
import openReducer from "./openSnack";
import totalReducer from "./totalAmount";


const rootReducer = combineReducers({
    open: openReducer,
    counter: cartCountReducer,
    cart: cartItemsReducer,
    calcs: totalReducer,
})

export default rootReducer;