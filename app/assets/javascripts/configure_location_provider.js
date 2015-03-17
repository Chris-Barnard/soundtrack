(function() {
  'use strict';

  angular.module('app').config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false});
  }]);

})();
