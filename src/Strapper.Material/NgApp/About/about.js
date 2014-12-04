angular.module('app.about', ['app.authentication']);

angular.module('app.about')
    .controller('AboutCtrl', ['$scope', '$rootScope', 'authService', AboutCtrl]);

function AboutCtrl($scope, $rootScope, authService) {
    $rootScope.$apply(function () {
        $rootScope.title = 'About';
    });

    //$scope.getPosition = function() {
    //    geolocation.getPosition()
    //        .then(function(pos) {
    //            $scope.position = pos;
    //        });
    //};
    $scope.hidePosition = function() {
        $scope.position = undefined;
    };

    //$scope.hasUserMedia = cameraService.hasUserMedia;
    //$scope.snapshotTaken = function(image) {

    //};

    authService.validate();
}
