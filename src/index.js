import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import GlobalState from './2.reducers'
import './index.css';
import './support/css/bootstrap/css/bootstrap.min.css';
import './support/fontawesome-free/css/fontawesome.min.css'
import './support/fontawesome-free/css/all.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

const variableGlobal = createStore(GlobalState)
ReactDOM.render(<Provider store={variableGlobal}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();