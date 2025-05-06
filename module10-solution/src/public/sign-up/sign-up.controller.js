(function () {
    'use strict';
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['MenuService', 'UserInfoService'];
    function SignUpController(MenuService, UserInfoService) {
      var signUpCtrl = this;
    
      signUpCtrl.user = {};
      signUpCtrl.completed = false;
      signUpCtrl.invalidFavorite = false;
    
      signUpCtrl.submit = function () {
        var fav = signUpCtrl.user.favorite;
    
        // Validate favorite menu item
        MenuService.getAllMenuItems().then(function (data) {
          let foundItem = null;
          for (let category in data) {
            let items = data[category].menu_items;
            if (items) {
              for (let item of items) {
                if (item.short_name && item.short_name.toLowerCase() === fav.toLowerCase()) {
                  foundItem = item;
                  break;
                }
              }
            }
            if (foundItem) break;
          }
    
          if (foundItem) {
            signUpCtrl.invalidFavorite = false;
            signUpCtrl.completed = true;
            signUpCtrl.user.favoriteItemDetails = foundItem;
            UserInfoService.saveUser(signUpCtrl.user);
          } else {
            signUpCtrl.invalidFavorite = true;
            signUpCtrl.completed = false;
          }
        });
      };

      signUpCtrl.checkFavoriteItem = function () {
        var fav = signUpCtrl.user.favorite;
        if (!fav) {
          signUpCtrl.invalidFavorite = false;
          return;
        }
      
        MenuService.getAllMenuItems().then(function (data) {
          let found = false;
      
          for (let category in data) {
            let items = data[category].menu_items;
            if (items) {
              for (let item of items) {
                if (item.short_name && item.short_name.toLowerCase() === fav.toLowerCase()) {
                  found = true;
                  break;
                }
              }
            }
            if (found) break;
          }
      
          signUpCtrl.invalidFavorite = !found;
        });
      };
      
    }
    })();
    