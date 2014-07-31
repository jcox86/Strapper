﻿angular.module('app.navigation')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'NgApp/Home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/about', {
                templateUrl: 'NgApp/About/about.html',
                controller: 'AboutCtrl'
            })
            .when('/account', {
                templateUrl: 'NgApp/Account/account.html',
                controller: 'AccountCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
