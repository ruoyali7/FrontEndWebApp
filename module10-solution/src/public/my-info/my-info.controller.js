(function () {
    'use strict';
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['UserInfoService'];
    function MyInfoController(UserInfoService) {
      var myInfoCtrl = this;
    
      myInfoCtrl.signedUp = UserInfoService.isSignedUp();
      if (myInfoCtrl.signedUp) {
        myInfoCtrl.user = UserInfoService.getUser();
      }
    }
    })();
    