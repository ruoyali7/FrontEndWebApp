(function () {
    'use strict';
    
    angular.module('common')
    .service('UserInfoService', UserInfoService);
    
    function UserInfoService() {
      var service = this;
      var user = null;
    
      service.saveUser = function (userData) {
        user = userData;
      };
    
      service.getUser = function () {
        return user;
      };
    
      service.isSignedUp = function () {
        return user !== null;
      };
    }
    })();
    