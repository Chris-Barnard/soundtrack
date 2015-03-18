(function(angular) {
  'use strict';

  angular
    .module('app.core')
    .directive('soundtrackNavBar', SoundtrackNavBarDirective);

  SoundtrackNavBarDirective.$inject = ['DataService', '$log'];

  function SoundtrackNavBarDirective () {
    var directive = {
      restrict : 'EA'
    , templateUrl : '/assets/core/soundtrackNavBar_directive.html'
    , controller : SoundtrackNavBarController
    , controllerAs : 'nav'
    , bindToController : true
    };

    SoundtrackNavBarController.$inject = ['DataService', '$log']

    return directive;

    function SoundtrackNavBarController (DataService, $log) {
      var nav = this;
      
      nav.logout = activate;

      activate();

      function activate () {
        nav.inputUserName = '';
        nav.inputPassword = '';        
      }
    }
  }

})(angular);