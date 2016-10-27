(function(){
    'use strict';

    angular
        .module('frontendApp')
        .controller('OauthAppController', OauthAppController);

    OauthAppController.$inject = ['$scope', '$state', 'OauthApps', 'AlertService' ];

    function OauthAppController ($scope, $state, OauthApps,AlertService) {

        var vm = this;

        vm.loadAll = loadAll;

        loadAll();

        function loadAll () {

          OauthApps.query({}, onSuccess, onError);

           function onSuccess(response) {
               console.log(response);
               vm.oauthapps = response;
           }

           function onError(response) {
                console.log(response);
            AlertService.error(response.data.message);
           }
        }

    }


})();
