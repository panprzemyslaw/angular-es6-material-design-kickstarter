import angular from '../node_modules/angular';
import 'angular-ui-router';
import 'angular-material';
import MainModule from './modules/Main/Main.module.js';

function config($stateProvider) {
  $stateProvider.state('base', {
    abstract: true,
    template: '<ui-view/>'
  });
}
config.$inject = ['$stateProvider'];

export default angular.module('leapopt-ui', [
  'ui.router',
  'ngMaterial',
  MainModule.name
])
  .config(config);