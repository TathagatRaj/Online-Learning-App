const app = angular.module('LoginApp', []);

app.controller('LoginController', function ($scope, $http) {
    $scope.Login = function (event) {
        event.preventDefault();

        const loginData = {
            email: $scope.loginEmail,
            password: $scope.loginPass
        };

        // Send POST request to the backend API for login
        $http.post('http://localhost:5000/api/login', loginData)
            .then(response => {
                alert(response.data.message); 
            })
            .catch(error => {
                if (error.status === 404) {
                    alert('Invalid email or password'); 
                } else {
                    alert('Server error. Please try again later.');
                }
            });
    };
});

