import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import History from './components/history';
import Home from './components/home';
import Info from './components/info';
import Journal from './components/journal';
import Settings from './components/settings';
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
