(function(angular) {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['DataService', '$log'];

  function HomeController(DataService, $log) {
    var vm = this;
    var loginError = false;

    vm.activeUser = null;
    vm.getLoginError = getLoginError;
    vm.handleLogin = handleLogin;
    vm.handleLogout = handleLogout;
    vm.inputUserName = '';
    vm.inputPassword = '';
    vm.isLoggedIn = isLoggedIn;
    vm.title = 'Soundtrack For Your Life';

    activate();

    function activate() {
    	// handleLogin();
      vm.activeUser = null;
      vm.inputUserName = '';
      vm.inputPassword = '';
    }

    function getLoginError () {
      return loginError;
    }

    function handleLogin (username, pass) {
      DataService.login(username, pass)
        .then(function (data) {
          vm.activeUser = data;
          DataService.getFeed()
            .then(function (data) {
              vm.activeUser.feed = data;
              $log.log(data);
            }, function (reason) {
              $log.log('Could not load feed: ' + reason.message);
            });
        }, function (reason) {
          logInError = true;
        });
    }
    function handleLogout () {
      activate();
    }

    function isLoggedIn () {
      if (vm.activeUser) { return true } else { return false }
    }
  }

})(angular);
