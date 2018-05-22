import homeAction from './constants';
import Axios from 'axios';


export const getUserCredential = () => (dispatch) => {
    console.log('action home');
    function httpGet(url) {

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
        });
};

