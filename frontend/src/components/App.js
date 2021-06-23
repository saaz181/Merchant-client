import React, { Component } from 'react';
import { render } from 'react-dom';
import Homepage from './Homepage';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
                <Homepage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    appDiv );


