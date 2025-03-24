(function() {
    'use strict';
  
    angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
      .filter('customCurrency', CustomCurrencyFilter);
  
    // To Buy Controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var toBuy = this;
  
      toBuy.items = ShoppingListCheckOffService.getToBuyItems();
      
      toBuy.buyItem = function(index) {
        ShoppingListCheckOffService.buyItem(index);
      };
    }
  
    // Already Bought Controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var bought = this;
  
      bought.items = ShoppingListCheckOffService.getBoughtItems();
    }
  
    // Shopping List Service
    function ShoppingListCheckOffService() {
      var service = this;
  
      // Initial list of items to buy
      var toBuyItems = [
        { name: 'Cookies', quantity: 10, pricePerItem: 2 },
        { name: 'Apples', quantity: 5, pricePerItem: 1.5 },
        { name: 'Bananas', quantity: 6, pricePerItem: 1 },
        { name: 'Milk', quantity: 2, pricePerItem: 3 },
        { name: 'Bread', quantity: 1, pricePerItem: 2.5 }
      ];
  
      var boughtItems = [];
  
      service.buyItem = function(index) {
        var item = toBuyItems.splice(index, 1)[0];
        boughtItems.push(item);
      };
  
      service.getToBuyItems = function() {
        return toBuyItems;
      };
  
      service.getBoughtItems = function() {
        return boughtItems;
      };
    }
  
    // Custom Currency Filter
    function CustomCurrencyFilter() {
      return function(input) {
        return "$$$" + input.toFixed(2);
      };
    }
  })();
  