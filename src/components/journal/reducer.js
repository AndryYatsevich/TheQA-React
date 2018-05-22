import deviceAction from './constants';


export default (state = [], action) => {
    console.log('reducer');
    switch (action.type) {
        case deviceAction.GET_ALL_DEVICES:
            console.log('reducer');
            return action.payload;
        case deviceAction.CHANGE_STATUS_TO_WORK:
            console.log('reducer CHANGE_STATUS_TO_WORK', action.payload, state);
            return action.payload;
        default:
            console.log('reducer default');
            return state;
    }
};