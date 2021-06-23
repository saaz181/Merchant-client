```jsx
import {createStore} from 'redux';

//STORE -> GLOBALIZATION OF STATE

//ACTION -> 
const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

// REDUCER
// base on name of action it will do something for us
const counter = (state = 0, action) => {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;

        case "DECREMENT":
            return state - 1;
    }
}

let store = createStore(counter);


//Display it in console
store.subscribe(() => console.log(store.getState()));

//DISPATCH
store.dispatch(increment());


// USAGE IN COMPONENT
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { increment, decrement } from '../actions';


function snackBar() {
  const counter = useSelector(state => state.counter)
  const isLogged = useSelector(state => state.isLogged)
  const dispatch = useDispatch();
  return (
    <div>
        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <h1>Counter: {console.log(counter)} </h1>
    </div>
  )
}

export default snackBar;



```
