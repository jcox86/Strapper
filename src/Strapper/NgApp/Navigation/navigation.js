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
        var modalVehicleInstance = $modal.open({
            templateUrl: 'NgApp/Account/_password.html',
            controller: ModalChangePasswordCtrl,
            resolve: {
                changePassword: function () {
                    return changePassword;
                },
            }
        });
        modalVehicleInstance.result.then(function (modal) {
            angular.forEach(modal, function (item, index) {
                assignment.vehicles.push(item);
            });
        });
    };

    $scope.simulateTimeout = function() {
        auth.simulateTimeout();
    };
}