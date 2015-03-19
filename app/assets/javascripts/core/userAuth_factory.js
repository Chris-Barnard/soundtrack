(function(angular) {
	'use strict';

	angular
		.module('app.core')
		.factory('UserAuth', UserAuth);

	UserAuth.$inject = ['DataService', '$q']

	function UserAuth (DataService, $q) {
    var loginError = null;
    var activeUser = null;
		var service = {
      // returns the activeUser model or null if none logged in
      getActiveUser : getActiveUser
      // returns any login error code or null if no error's been triggered
    , getLoginError : getLoginError
      // returns a boolean : true if logged in, false if not
    , isLoggedIn : isLoggedIn
      // takes a username and password and returns a promise
      // It will resolve to a activeUser model or an error code
		,	login : login
    , logout : logout

		}

    return service;


    function getActiveUser () {
      if (activeUser) { return activeUser; } else { return null }
    }

    function getLoginError () {
      if (loginError) { return loginError; } else { return null }

    }

    function isLoggedIn () {
      if (activeUser) { return true } else { return false }
    }

    function login (user, pass) {
      var deferred = $q.defer();

      DataService.login(user, pass)
        .then(function (data) {
          activeUser = data;
          deferred.resolve(activeUser);
        }, function (err) {
          loginError = err;
          deferred.reject(loginError)
        });
      
      return deferred.promise;

    }

    function logout () {
      loginError = null;
      activeUser = null;
      DataService.logout();
    }
  }
})(angular);