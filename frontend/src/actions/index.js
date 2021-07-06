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

export const addToCartItems = (itemList) => {
    return {
        type: 'ADD_ITEM_TO_CART',
        payload: itemList
    }
}


export const editQuantity = (idx, num) => {
    return {
        type: 'EDIT_QUANTITY',
        payload: {
            idx: idx,
            quantity: num
        }
    }
}

export const totalPrice = (cart) => {
    return {
        type: 'TOTAL_PRICE',
        payload: cart
    }
}


export const totalOff = (cart) => {
    return {
        type: 'TOTAL_OFF',
        payload: cart

    }
}

export const final = (cart) => {
    return {
        type: 'FINAL',
        payload: cart
    }
}

export const authenticate = (status) => {
    return {
        type: 'AUTHENTICATED',
        payload: status
    }
}


export const orderInfo = (info) => {
    return {
        type: "ADD_ADDRESS",
        payload: info
    };
};


export const setMerchantId = (merchantId) => {
    return {
        type: 'FOUND',
        payload: merchantId
    }
}

export const disableForm = () => {
    return {
        type: 'DISABLE'
    };
};

export const enableForm = () => {
    return {
        type: 'ENABLE'
    };
};








