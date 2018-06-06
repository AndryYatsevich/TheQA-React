import commonAction from './constants';
import services from "./services";
import homeAction from "../components/home/constants";

export const actionUserAuth = (login, pass) => (dispatch) => {

    services.userAuth(login, pass)
        .then((token) => {
            services.getUserInfo(token)
                .then((userInfo) => {
                    console.log(userInfo);
                    dispatch({
                        type: commonAction.GET_USER_INFO,
                        payload: userInfo
                    });
                })
        })
};

export const actionGetUserInfo = () => (dispatch) => {

    services.getUserInfo()
            .then((userInfo) => {
            console.log(userInfo);
            dispatch({
                type: commonAction.GET_USER_INFO,
                payload: userInfo
            });
        })
};

export const getAllDevice = () => (dispatch) => {
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
            type: commonAction.GET_ALL_DEVICE,
            payload: devices
        });
    })


};

