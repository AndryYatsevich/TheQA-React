
export default {
    userAuth: function(login, password) {
return fetch('http://localhost:8080/app/rest/v2/oauth/token', {
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

}).catch((err) => {
    console.log('An error occurred!', err);
});
    },

    getUserInfo: function() {
        return fetch('http://localhost:8080/app/rest/v2/userInfo', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) =>{
            return response.text();
        }).catch((err) => {
            console.log('An error occurred!', err);
        });
    }
}