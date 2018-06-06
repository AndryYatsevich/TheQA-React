import deviceAction from './constants';



export const getAllDevices = () => (dispatch) => {

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

