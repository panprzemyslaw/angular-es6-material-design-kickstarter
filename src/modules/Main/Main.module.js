import angular from 'angular';
import MainTemplate from '../../modules/Main/Main.template.html';
import MainController from '../../modules/Main/Main.controller.js';

function config($stateProvider) {
  $stateProvider.state('base.main', {
    url: '',
    template: MainTemplate,
    controller: 'MainController',
    controllerAs: 'main'
  });
}
config.$inject = ['$stateProvider'];

export default angular.module('MainModule', [
  'ui.router'
])
  .controller('MainController', MainController)
  .config(config);