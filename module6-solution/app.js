(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchItems = "";
        $scope.message = "";
        $scope.messageClass = "";

        $scope.checkLunch = function() {
            if (!$scope.lunchItems.trim()) {
                $scope.message = "Please enter data first";
                $scope.messageClass = "red red-border";
                return;
            }

            var items = $scope.lunchItems.split(',')
                .map(item => item.trim())
                .filter(item => item.length > 0); // Remove empty items

            if (items.length === 0) {
                $scope.message = "Please enter data first";
                $scope.messageClass = "red red-border";
            } else if (items.length <= 3) {
                $scope.message = "Enjoy!";
                $scope.messageClass = "green green-border";
            } else {
                $scope.message = "Too much!";
                $scope.messageClass = "green green-border";
            }
        };
    }
})();
