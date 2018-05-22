import {combineReducers} from 'redux';
import devices  from './components/journal/reducer';
import userInfo from './components/home/reducer';

export default combineReducers({
    devices,
    userInfo
});