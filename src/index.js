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



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/journal' component={Journal}/>
                    <Route path='/settings' component={Settings} />
                    <Route path='/history' component={History} />
                    <Route path='/info' component={Info} />
                </Switch>
            </App>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
