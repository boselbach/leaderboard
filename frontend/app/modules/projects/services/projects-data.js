(function(name) {
    'use strict';

    angular.module('projects.data', [])
    .factory(name, ['$http', 'ErrorLog', function($http, ErrorLog) {
        var all = function() {
            return $http.get('/projects/all');
        };

        var save = function(formdata) {
            try {
                return $http.post('/projects/create', formdata);
            } catch (err) {
                ErrorLog.log(name, err);
            }
        };

        return {
            all: all,
            save: save
        };
    }]);
}('ProjectsData'));
