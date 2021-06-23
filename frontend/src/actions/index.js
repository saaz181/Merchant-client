/*export const increment = (mul) => {
    return {
        type: 'INCREMENT',
        payload: mul
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    };
};
*/

export const openSnack = () => {
    return {
        type: 'OPEN'
    };
};


export const close = () => {
    return {
        type: 'CLOSE'
    };
};


export const addToCartCount = (count) => {
    return {
        type: 'ADD',
        payload: count
        
    };
};

export const removeFromCartCount = () => {
    return {
        type: "DELETE",
        
    };
};












