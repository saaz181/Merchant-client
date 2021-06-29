const calcPrice = (data) => {
    let totalPrice = 0;
        for (const {quantity, product} of data) {
          totalPrice += (quantity * product.price)
      }
      return totalPrice;
    
  }

const calcOff = (data) => {
    let totalOff = 0;
    for (const {quantity, product} of data) {
          totalOff += (quantity * product.off)
      }
      return totalOff;
}


const calctotalPrice = (data) => {
    return calcPrice(data) - calcOff(data);
}

const totalReducer = (state={total: 0, off: 0, final: 0}, action) => {
    switch(action.type) {
        case 'TOTAL_PRICE':
            let totalPrice = calcPrice(action.payload); 
            return  {...state, total: totalPrice};
                
        case 'TOTAL_OFF':
            let totalOff = calcOff(action.payload);         
            return {...state, off: totalOff};

        case 'FINAL':
            return {...state, final: calctotalPrice(action.payload)};
        
        default: 
            return state;
    }
}

export default totalReducer;