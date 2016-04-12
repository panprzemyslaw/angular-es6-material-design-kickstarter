import angular from 'angular';
import mainPage from '../../src/main-page';

describe('MainPage', function() {

  beforeEach(function() {
    angular.mock.inject.strictDi(true);

    angular.mock.module('akamai.components.i18n');
    angular.mock.module(function($translateProvider) {
      $translateProvider.translations('en_US', {
        example: 'example'
      });
    });

    angular.mock.module(mainPage.name);
    angular.mock.inject(function($rootScope, $controller) {

      this.createController = function() {
        return $controller('MainPage', {
          $scope: $rootScope
        });
      };

    });

  });

  describe('given the constructor', function() {

    describe('when called', function() {

      beforeEach(function() {
        this.$controller = this.createController();
      });

      it('should say "Portal App"', function() {
        expect(this.$controller.title).toEqual('Portal App');
      });

    });

  });

});