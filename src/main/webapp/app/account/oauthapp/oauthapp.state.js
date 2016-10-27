(function() {
    'use strict';

    angular
        .module('frontendApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('oauthapp', {
            parent: 'account',
            url: '/apps',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'OauthApps'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/oauthapp/oauthapp.html',
                    controller: 'OauthAppController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('oauthapp.new', {
            parent: 'account',
            url: '/apps/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/account/oauthapp/oauth-dialog.html',
                    controller: 'OauthAppDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                applicationname: null,
                                callbackurl: null,
                                applicationdescription: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('oauthapp', null, { reload: true });
                }, function() {
                    $state.go('oauthapp');
                });
            }]
        })
        .state('oauthapp.delete', {
            parent: 'oauthapp',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/account/oauthapp/oauthapps-delete-dialog.html',
                    controller: 'OauthAppsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['OauthApps', function(OauthApps) {
                            return OauthApps.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('oauthapp', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
