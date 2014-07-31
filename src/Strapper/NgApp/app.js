var app = angular.module('app', [
    'app.authentication',
    'app.navigation',
    'app.home',
    'app.about',
    'app.account',
    'mgcrea.ngStrap',
    'ngRoute',
    'ngAnimate'
]);

app.run(['$route', '$q', '$rootScope',
    function ($route, $q, $rootScope) {
    }
]);
