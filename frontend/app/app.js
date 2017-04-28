(function() {
    'use strict';

    angular.module('socialLeaderBoardApp', [
        'ngRoute',
        'projects'
    ])

    .run([function() {
        console.log('App just got bootstrapped!!!');
    }]);

    angular.element(window).bind('load', function() {
        angular.bootstrap(document, ['socialLeaderBoardApp']);
    });
}());
