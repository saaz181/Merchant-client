const formDisableReducer = (state=false, action) => {
    switch (action.type) {
        case 'DISABLE':
            return !state;
        
        case 'ENABLE':
            return false;
        
        default:
            return state;
    };
};

export default formDisableReducer;
