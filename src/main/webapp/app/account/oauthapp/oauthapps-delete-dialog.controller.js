(function() {
    'use strict';

    angular
        .module('frontendApp')
        .controller('OauthAppsDeleteController',OauthAppsDeleteController);

    OauthAppsDeleteController.$inject = ['$uibModalInstance', 'entity', 'OauthApps'];

    function OauthAppsDeleteController($uibModalInstance, entity, OauthApps) {
        var vm = this;

        vm.oauthapps = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            OauthApps.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
