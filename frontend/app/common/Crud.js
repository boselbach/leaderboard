(function() {
    'use strict';

    angular.module('common.crud', [])
    .factory('Crud', ['$http', function($http) {
        var save = function() {
            return $http.post('/projects/create', {name:'123', description:'qwert'});
        };

        var get = function() {
            try {
                return $http.get('/api/');
            } catch (err) {
                throw err;
            }
        };

        var update = function() {

        };

        var remove = function() {

        };

        return {
            save: save,
            get: get,
            update: update,
            remove: remove
        };
    }]);
}());
