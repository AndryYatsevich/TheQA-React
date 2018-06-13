import {combineReducers} from 'redux';
import userInfo from './components/home/reducer';
import settings from './components/settings/reducer';
import common from './common/reducer';

export default combineReducers({
    common,
    userInfo,
    settings
});