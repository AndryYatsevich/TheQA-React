import homeAction from './constants';


export default (state = [], action) => {
    console.log('reducer');
    switch (action.type) {
        case homeAction.GET_USER_CREDENTIALS:
            console.log('reducer GET_USER_CREDENTIALS', typeof action.payload);
            return JSON.parse(action.payload);
        default:
            console.log('reducer default');
            return state;
    }
};