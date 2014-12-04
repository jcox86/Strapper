angular.module('app.home', ['ngSanitize', 'app.authentication']);

angular.module('app.home')
    .controller('HomeCtrl', ['$scope', '$http', '$rootScope', '$timeout', 'authService', HomeCtrl]);

function HomeCtrl($scope, $http, $rootScope, $timeout, authService) {

    $rootScope.$apply(function() {
        $rootScope.title = 'Home';
    });
    
    $scope.isActive = function (route) {
        return route === $location.path();
    };
    
    $scope.alerts = [
        { type: 'success', message: 'Well done! You successfully set up this project.' },
        { type: 'danger', message: 'Guess what... This is only the beginning!' },
        { type: 'info', message: 'Strapper uses <a href="http://angularjs.org" target="_blank">AngularJS</a>, <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="http://mgcrea.github.io/angular-strap/" target="_blank">Angular Strap</a>, and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>.  Visit these sites to see what else you can do!' }
    ];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.wait = function () {
        //TODO: Broken?
        $scope.myPromise = $timeout(function () {
            var stuff = 'stuff';
        }, 8000);
    };

    $scope.activate = function() {
        authService.validate();
    };

    $scope.activate();
}
