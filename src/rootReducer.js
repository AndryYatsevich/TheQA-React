import {combineReducers} from 'redux';
import userInfo from './conteiners/home/reducer';
import settings from './conteiners/settings/reducer';
import common from './common/reducer';

export default combineReducers({
    common,
    userInfo,
    settings
});