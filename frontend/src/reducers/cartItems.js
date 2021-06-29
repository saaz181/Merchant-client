

const cartItemsReducer = (state=[], action) => {
    switch(action.type){
        case 'ADD_ITEM_TO_CART':
            let data = [
                ...state,
                ...action.payload
            ]
        return data;    
        
        case 'EDIT_QUANTITY':
            const newObj = state.find(item => item.id === action.payload.idx);
            newObj.quantity = action.payload.quantity;
            return state;
            
        default:
            return state;
    }
}


export default cartItemsReducer;