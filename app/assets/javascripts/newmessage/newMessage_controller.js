(function(angular) {
  'use strict';

  angular
    .module('app.newmessage')
    .controller('NewMessageController', NewMessageController);

  NewMessageController.$inject = ['DataService', 'UserAuth','$log'];

  function NewMessageController(DataService, UserAuth, $log) {
    var vm = this;

    vm.activeUser = null;
    vm.getLoginError = UserAuth.getLoginError;
    vm.handleLogin = handleLogin;
    vm.handleLogout = UserAuth.logout;
    vm.isLoggedIn = UserAuth.isLoggedIn;
    vm.title = 'Soundtrack For Your Life';

    activate();

    function activate() {
      vm.activeUser = UserAuth.getActiveUser();

      

    }

    function handleLogin (username, password) {
      return UserAuth.login(username, password).then(function (data) {
        vm.activeUser = data;
        getFeed();
      });
    }
  }

})(angular);
