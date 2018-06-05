import {combineReducers} from 'redux';
import devices  from './components/journal/reducer';
import userInfo from './components/home/reducer';
import deviceOS from './components/settings/reducer';

export default combineReducers({
    devices,
    userInfo,
    deviceOS
});