import homeAction from './constants';
import Axios from 'axios';


export const getUserInfo = (login, password) => (dispatch) => {
    console.log('action home');
/*    function token(response) {
        if (response.status >= 200 && response.status < 300) {
            console.log(response);
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }*/
    let getUserInfo = () => {
        return fetch('http://localhost:8080/app/rest/v2/userInfo', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) =>{
            return response.text();
        }).then((userInfo) => {
            console.log(userInfo);
            dispatch({
                type: homeAction.GET_USER_CREDENTIALS,
                payload: userInfo
            });
        })
    };

    if (localStorage.getItem('token')) {
        getUserInfo();
    } else {
        fetch('http://localhost:8080/app/rest/v2/oauth/token', {
            method: "POST",
            headers: {
                "Authorization": "Basic Y2xpZW50MzE0OkhYYTM1VA==",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=password&username=" + login + '&password=' + password
        }).then((response) => {
            return response.text();
        }).then(function(user) {
            localStorage.setItem('token', JSON.parse(user).access_token);
            getUserInfo();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    }


/*    function httpGet(url) {

        return new Promise(function(resolve, reject) {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });

    }

    httpGet('http://localhost:8080/app/rest/v2/userInfo')
        .then((res) => {
        console.log(res);
            dispatch({
                    type: homeAction.GET_USER_CREDENTIALS,
                    payload: res
                }
            );
            console.log('action: ', res);
        })
        .catch((err) => {
            console.log('An error occurred!', err);
        });*/
};

