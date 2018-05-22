import deviceAction from './constants';
import Axios from 'axios';


export const getAllDevices = () => (dispatch) => {
    console.log('action');

    Axios
        .get('/devices.json')
        .then((res) => {
            dispatch({
                    type: deviceAction.GET_ALL_DEVICES,
                    payload: res.data
                }
            );
        })
        .catch((err) => {
            console.log('An error occurred!', err);
        });
};

export const changeStatusToWork = (device) => {
    return {
        type: deviceAction.CHANGE_STATUS_TO_WORK,
        payload: device
    }
};

