var app = angular.module('app', [
    'app.authentication',
    'app.navigation',
    'app.home',
    'app.about',
    'app.account',
    'ngMaterial',
    'ngRoute',
    'ngAnimate'
]);

app.filter('moment', function () {
    return function (dateString, format) {
        return moment(dateString).format(format);
    };
});

app.filter('capitalize', function () {
    return function (input, scope) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    };
});

app.factory('geolocation', function($q, $window, $rootScope) {
    var geoCapable = false;
    if ($window.navigator && $window.navigator.geolocation) {
        geoCapable = true;
    }
    if (!geoCapable) {
        $rootScope.$broadcast('geo:error', 'Geolocation not supported');
    }
    var service = {
        getPosition: function() {
            var d = $q.defer();
            if (!geoCapable) {
                return d.reject();
            }
            $window.navigator.geolocation.getCurrentPosition(function(pos) {
                d.resolve(pos);
                $rootScope.$apply();
            }, function(err) {
                $rootScope.$broadcast('geo:error', err);
                d.reject(pos);
                $rootScope.$apply();
            });
            return d.promise;
        },
        watchPosition: function(cb) {
            if (!geoCapable) {
                $rootScope.$broadcast('geo:error', 'Geolocation not supported');
                if (cb) {
                    cb('Geolocation not supported');
                }
                return;
            }
            $window.navigator.geolocation.watchPosition(function(pos) {
                $rootScope.$broadcast('geo:positionChanged', pos);
                if (cb) {
                    cb(null, pos);
                    $rootScope.$apply();
                }
            });
        }
    };
    return service;
});

app.factory('cameraService', function($window) {
    var hasUserMedia = function() {
        return !!getUserMedia();
    };
    var getUserMedia = function() {
        navigator.getUserMedia = ($window.navigator.getUserMedia ||
            $window.navigator.webkitGetUserMedia ||
            $window.navigator.mozGetUserMedia ||
            $window.navigator.msGetUserMedia);
        return navigator.getUserMedia;
    };
    return {
        hasUserMedia: hasUserMedia(),
        getUserMedia: getUserMedia
    };
});

app.directive('camera', function ($document, cameraService, toastr) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            onSnapshot: '&'
        },
        controller: function ($scope, $q, $timeout) {
            this.takeSnapshot = function () {
                var canvas = document.querySelector('canvas'),
                    ctx = canvas.getContext('2d'),
                    videoElement = document.querySelector('video'),
                    d = $q.defer();

                canvas.width = $scope.w;
                canvas.height = $scope.h;

                $timeout(function () {
                    // Define the size of the rectangle that will be filled (basically the entire element)
                    ctx.fillRect(0, 0, $scope.w, $scope.h);
                    // Grab the image from the video
                    ctx.drawImage(videoElement, 0, 0, $scope.w, $scope.h);

                    var dataUrl = canvas.toDataURL();
                    d.resolve(dataUrl);
                }, 0);
                return d.promise;
            };
        },
        template: '<div class="camera"><video class="camera" autoplay="" /><canvas style="display:block"></canvas><div ng-transclude></div></div>',
        link: function (scope, ele, attrs) {
            var w = attrs.width || 320,
                  h = attrs.height || 200;

            if (!cameraService.hasUserMedia) return;
            var userMedia = cameraService.getUserMedia(),
                videoElement = document.querySelector('video');
            var onSuccess = function (stream) {
                if (navigator.mozGetUserMedia) {
                    videoElement.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    videoElement.src = window.URL.createObjectURL(stream);
                }
                // Just to make sure it autoplays
                videoElement.play();
            };
            var onFailure = function (err) {
                toastr.error(err);
            };
            navigator.getUserMedia({
                video: {
                    mandatory: {
                        maxHeight: h,
                        maxWidth: w
                    }
                },
                audio: true
            }, onSuccess, onFailure);

            scope.w = w;
            scope.h = h;
        }
    };
});

app.directive('cameraControlSnapshot', function () {
    return {
        restrict: 'EA',
        require: '^camera',
        scope: true,
        template: '<a class="btn btn-info" ng-click="takeSnapshot()">Take snapshot</a>',
        link: function (scope, ele, attrs, cameraCtrl) {
            scope.takeSnapshot = function () {
                cameraCtrl.takeSnapshot()
                .then(function (image) {
                });
            };
        }
    };
});

app.run(['$route', '$q', '$rootScope',
    function ($route, $q, $rootScope) {
    }
]);