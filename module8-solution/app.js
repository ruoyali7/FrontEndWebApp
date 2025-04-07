(function () {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', FoundItemsDirective);
  
    function FoundItemsDirective() {
      return {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
          foundItems: '<',
          onRemove: '&'
        }
      };
    }
  
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var ctrl = this;
      ctrl.searchTerm = '';
      ctrl.found = [];
      ctrl.emptyMessage = '';
  
      ctrl.narrowDown = function () {
        if (!ctrl.searchTerm.trim()) {
          ctrl.found = [];
          ctrl.emptyMessage = 'Nothing found';
          return;
        }
  
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (items) {
          ctrl.found = items;
          ctrl.emptyMessage = items.length === 0 ? 'Nothing found' : '';
        });
      };
  
      ctrl.removeItem = function (index) {
        ctrl.found.splice(index, 1);
      };
    }
  
    MenuSearchService.$inject = ['$http'];
        function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
            method: 'GET',
            url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
            }).then(function (response) {
            var rawData = response.data;
            var foundItems = [];

            if (!rawData) {
                return foundItems;
            }

            Object.keys(rawData).forEach(function (categoryKey) {
                var category = rawData[categoryKey];
                var items = category.menu_items;

                if (Array.isArray(items)) {
                items.forEach(function (item) {
                    if (
                    item.description &&
                    item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
                    ) {
                    foundItems.push(item);
                    }
                });
                }
            });

            return foundItems;
            }).catch(function (error) {
            console.error("Error fetching or parsing menu items:", error);
            return [];
            });
        };
        }

  })();
  