import settingsAction from './constants';

export const getDeviceOS = () => (dispatch) => {
    console.log('action setting');


fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$OperationSystem', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.text();
        }).then((deviceOs) => {
            console.log(deviceOs);
            dispatch({
                type: settingsAction.GET_DEVICES_OS,
                payload: deviceOs
            });
        })

};