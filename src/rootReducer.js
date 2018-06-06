import {combineReducers} from 'redux';
import userInfo from './components/home/reducer';
import deviceOS from './components/settings/reducer';
import common from './common/reducer';

export default combineReducers({
    common,
    userInfo,
    deviceOS
});