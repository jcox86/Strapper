angular.module('app.account', ['app.authentication']);

angular.module('app.account')
    .controller('AccountCtrl', ['$scope', 'authService', AccountCtrl]);

function AccountCtrl($scope, authService) {
    $scope.title = 'Account Page';

    //TODO: Set up your account page

    function validate() {
        authService.validate();
    }

    validate();
}
