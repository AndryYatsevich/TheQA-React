import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import History from './conteiners/history';
import Home from './conteiners/home';
import Info from './conteiners/info';
import Journal from './conteiners/journal';
import Settings from './conteiners/settings';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const RouteWishApp = (props) => {
    const {Component} = props;
    return <Route {...props} component={() => {
        return <App><Component/></App>;
    }}/>
};


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <RouteWishApp exact path='/' Component={Home}/>
                <RouteWishApp path='/journal' Component={Journal}/>
                <RouteWishApp path='/settings' Component={Settings} />
                <RouteWishApp path='/history' Component={History} />
                <RouteWishApp path='/info' Component={Info} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
