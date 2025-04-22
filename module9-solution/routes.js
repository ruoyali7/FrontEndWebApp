(function() {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      
      $stateProvider
      .state('home', {
        url: '/',
        template: '<h2>Welcome to our Restaurant</h2><a ui-sref="categories">View Menu Categories</a>'
      })
      .state('categories', {
        url: '/categories',
        template: '<categories categories="$ctrl.categories"></categories>',
        controller: 'CategoriesController as $ctrl',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories()
              .then(function(response) {
                return response.data;
              });
          }]
        }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items items="$ctrl.items" category="$ctrl.category"></items>',
        controller: 'ItemsController as $ctrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', 
                  function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
              .then(function(response) {
                return response.data.menu_items;
              });
          }],
          category: ['$stateParams', 'MenuDataService', 
                    function($stateParams, MenuDataService) {
            return MenuDataService.getAllCategories()
              .then(function(response) {
                var categories = response.data;
                return categories.find(function(category) {
                  return category.short_name === $stateParams.categoryShortName;
                });
              });
          }]
        }
      });
    }
    
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController)
    .controller('ItemsController', ItemsController);
    
    CategoriesController.$inject = ['categories'];
    function CategoriesController(categories) {
      var $ctrl = this;
      $ctrl.categories = categories;
    }
    
    ItemsController.$inject = ['items', 'category'];
    function ItemsController(items, category) {
      var $ctrl = this;
      $ctrl.items = items;
      $ctrl.category = category;
    }
  })();