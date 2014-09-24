angular.module('app.about', ['app.authentication']);

angular.module('app.about')
    .controller('AboutCtrl', ['$scope', 'authService', 'geolocation', 'cameraService', AboutCtrl]);

function AboutCtrl($scope, authService, geolocation, cameraService) {
    $scope.title = 'About Strapper';

    $scope.getPosition = function() {
        geolocation.getPosition()
            .then(function(pos) {
                $scope.position = pos;
            });
    };
    $scope.hidePosition = function() {
        $scope.position = undefined;
    };

    $scope.hasUserMedia = cameraService.hasUserMedia;
    $scope.snapshotTaken = function(image) {

    };

    authService.validate();
}
