(function(){
      'use strict';
      angular
            .module('frontendApp')
            .factory('OauthApps',OauthApps);


      OauthApps.$inject = ['$resource'];

      function OauthApps ($resource){

            var resourceUrl = 'api/account/apps/:id';

            return $resource(resourceUrl, {}, {

                  'query': { method: 'GET', isArray: true},

                   'get': {
                        method: 'GET',
                        isArray: false,
                        transformResponse: function (data) {
                                if (data){
                                    data = angular.fromJson(data);
                                }
                                return data;
                        }
                   },



            });


      }




})();
