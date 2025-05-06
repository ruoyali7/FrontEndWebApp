describe('SignUpController', function () {
    var $controller, $rootScope, $httpBackend, MenuService, UserInfoService;
    var ApiPath = 'https://coursera-jhu-default-rtdb.firebaseio.com';
  
    beforeEach(module('common'));
    beforeEach(module('public'));
  
    beforeEach(module(function ($provide) {
      $provide.constant('ApiPath', ApiPath);
    }));
  
    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _MenuService_, _UserInfoService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      MenuService = _MenuService_;
      UserInfoService = _UserInfoService_;
    }));
  
    it('should recognize a valid favorite item short_name', function () {
      var ctrl = $controller('SignUpController', {
        MenuService: MenuService,
        UserInfoService: UserInfoService
      });
  
      ctrl.user.favorite = 'L1';
  
      var mockData = {
        L: {
          menu_items: [
            { short_name: 'L1', name: 'Orange Chicken' }
          ]
        }
      };
  
      $httpBackend.expectGET(ApiPath + '/menu_items.json').respond(mockData);
      ctrl.checkFavoriteItem();
      $httpBackend.flush();
  
      expect(ctrl.invalidFavorite).toBe(false);
    });
  
    it('should flag invalid favorite item short_name', function () {
      var ctrl = $controller('SignUpController', {
        MenuService: MenuService,
        UserInfoService: UserInfoService
      });
  
      ctrl.user.favorite = 'ZZZ';
  
      var mockData = {
        L: {
          menu_items: [
            { short_name: 'L1', name: 'Orange Chicken' }
          ]
        }
      };
  
      $httpBackend.expectGET(ApiPath + '/menu_items.json').respond(mockData);
      ctrl.checkFavoriteItem();
      $httpBackend.flush();
  
      expect(ctrl.invalidFavorite).toBe(true);
    });
  });
  