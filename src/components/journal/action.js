import deviceAction from './constants';
import Axios from 'axios';


export const getAllDevices = () => (dispatch) => {
    console.log('action');

    /*Axios
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
        });*/

    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device?view=device-with-all', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) =>{
        return response.json();
    }).then((devices) => {
        console.log(devices);
        dispatch({
            type: deviceAction.GET_ALL_DEVICES,
            payload: devices
        });
    })
};

export const changeStatusToWork = (device) => {
    return {
        type: deviceAction.CHANGE_STATUS_TO_WORK,
        payload: device
    }
};

