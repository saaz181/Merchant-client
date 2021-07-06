import { combineReducers } from "redux";
import authReducer from "./authenticate";
import cartCountReducer from "./cart";
import cartItemsReducer from "./cartItems";
import formDisableReducer from "./formDisable";
import merchantIdReducer from "./merchantID";
import openReducer from "./openSnack";
import orderInfoReducer from "./orderInfo";
import totalReducer from "./totalAmount";


const rootReducer = combineReducers({
    open: openReducer,
    counter: cartCountReducer,
    cart: cartItemsReducer,
    calcs: totalReducer,
    isAuthenticated: authReducer,
    info: orderInfoReducer,
    merchantId: merchantIdReducer,
    disableForm: formDisableReducer,
})

export default rootReducer;