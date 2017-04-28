/*
* Projects module
*/
(function() {
    'use strict';
    angular.module('projects', [
        'projects.data',
        'common.crud',
        'common.errorlog'
    ])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/projects', {
            templateUrl: 'views/projects.tpl.html',
            controller: 'ProjectsListCtrl',
        })
        .when('/projects/new', {
            templateUrl: 'views/projects-new.tpl.html',
            controller: 'ProjectsCreateCtrl',
        })
        .when('/projects/:id', {
            templateUrl: 'views/projects-edit.tpl.html',
            controller: 'ProjectsEditCtrl'
        });
    }])

    .controller('ProjectsListCtrl', ['$scope', 'ProjectsData', function($scope, ProjectsData, ErrorLog) {
        $scope.projects = false;

        ProjectsData.all()
        .success(function(data){
            console.log(data);
            $scope.projects = data;
        })
        .error(function(err){
            console.log(err);
        });

    }])

    .controller('ProjectsCreateCtrl', ['$scope', 'ProjectsData', function($scope, ProjectsData) {
        $scope.submit = function() {
            try {
                ProjectsData.save($scope.project)
                .success(function(data) {
                    document.location.href = '#/projects';
                })
                .error(function(data) {
                    alert(data);
                });
            } catch (err) {
            }
        };
    }])

    .controller('ProjectsEditCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.id = $routeParams.id;
    }]);
}());
