// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; 

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

const store = createStore( reducers, {}, applyMiddleware(reduxThunk));

//ReactDOM.render(<App />, document.querySelector('#root'));
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
     document.querySelector('#root')
);

/*const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;    
        default:
            return state;
    }
}
const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);
const store = createStore(counter);
const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()} onIncrement={ () => store.dispatch({type: 'INCREMENT'}) }
        onDecrement={ () => store.dispatch({type: 'DECREMENT'}) }/>,
        document.querySelector('#root')
    );
};

store.subscribe(render);
render();*/