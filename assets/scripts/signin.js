const CLIENT_URL = getUrl2();
const SERVER_URL = getUrl1();

$(document).ready(function() {
    $("#signin-form").on("submit", function(event) {
        event.preventDefault();
        var userData = $(this).serialize();
        checkUser(userData)
            .then((data) => {
                window.location.replace(`${CLIENT_URL}/dashboard.html`);
            })
            .catch(errorFunction);
    });
});

function checkUser(formData) {
    return $.post(`${SERVER_URL}/authAPI`, formData);
}

function getUrl1() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://line-waiter-db.herokuapp.com';
    }
}

function getUrl2() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:8080';
    } else {
        return 'https://line-waiter.firebaseapp.com';
    }
}

function errorFunction(err) {
    if (err.status === 401) {
        window.location = '/signin.html';
    } else {
        console.log(err);
    }
}
