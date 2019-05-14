var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/login.html",
    })
   .when("/profile", {
        templateUrl : "views/profile.html",
    })
   .otherwise({
        redirectTo : "/",
    });
     
});

