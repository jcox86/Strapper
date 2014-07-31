angular.module('app.navigation', ['app.authentication', 'ngRoute']);

angular.module('app.navigation')
    .controller('NavigationCtrl', ['$scope', '$location', '$modal', 'authService', NavigationCtrl]);

function NavigationCtrl($scope, $location, $modal, auth) {
    $scope.title = 'Strapper logo';
    $scope.navItems = [
            {
                title: " Home", icon: "fa fa-empire fa-fw", items: [
                  { title: " Home Item 1", route: "/item1", icon: "fa fa-glass fa-fw" },
                  { title: " Home Item 2", route: "/item2", icon: "fa fa-gamepad fa-fw" }]
            },
            {
                title: " Nav", icon: "fa fa-rebel fa-fw", items: [
                  { title: " Nav Content 1", route: "/content1", icon: "fa fa-crosshairs fa-fw" },
                  { title: " Super Awesome Content", route: "/content2", icon: "fa fa-rocket fa-spin fa-fw" }]
            },
            { title: " About", icon: "fa fa-beer fa-fw", route: "/about" }
    ];

    $scope.isCollapsed = true;
    $scope.$on('event:auth-loginConfirmed', function () {
        $scope.username = auth.getUsername();
    });

    $scope.search = function (query) {
        $location.path('/search/' + query);
    };

    $scope.setRoute = function (route) {
        $location.path(route);
        $scope.isCollapsed = true;
    };

    $scope.isActive = function(route) {
        return ($location.path() == route);
    };
    
    $scope.logout = function () {
        auth.logout();
    };
    
    $scope.manageUserAccount = function () {
        $location.path('/account');
    };

    $scope.changeUserPassword = function () {
        var modalPasswordInstance = $modal.open({
            templateUrl: 'NgApp/Account/_password.html',
            controller: ModalChangePasswordCtrl,
            size: 'sm',
            backdrop: 'static',
            resolve: {
                username: function() {
                    return $scope.username;
                }
            }
        });
        modalPasswordInstance.result.then(function (modal) {
            confirm('Works?');
        });
    };

    $scope.simulateTimeout = function() {
        auth.simulateTimeout();
    };
}

var ModalChangePasswordCtrl = function($scope, $http, $location, $modalInstance, username) {
    $scope.username = username;

    $scope.changePassword = function(password) {
        if (password.first === password.second) {
            //TODO: Submit change password to server and remove this line below
            $modalInstance.dismiss('cancel');
        }
    };
    
    $scope.cancel = function (form) {
        if (form.$dirty) {
            var con = confirm("You have made changes.\nAre you sure you wish to cancel?");
            if (con) {
                $modalInstance.dismiss('cancel');
            }
        } else {
            $modalInstance.dismiss('cancel');
        }
    };
};