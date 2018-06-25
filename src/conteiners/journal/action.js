import deviceAction from './constants';
import commonAction from "../../common/constants";
import services from "../../common/services";



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

export const createNewTesting = (date, deviceId) => (dispatch) => {
    console.log('-----------------------', date, deviceId);
    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Testing', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(date)
    }).then((response) =>{
        return response.json();
    }).then((devices) => {
        console.log('device++++++++++++', devices, deviceId);
        fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + deviceId, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: "TAKEN"
            })
        }).then((response) => {
            return response.text();
        }).then((response) => {
            console.log(response);
            services.getAllDevice()
                .then((devices) => {
                    console.log(devices);
                    dispatch({
                        type: commonAction.GET_ALL_DEVICE,
                        payload: devices
                    });
                })
        })
    })

};
