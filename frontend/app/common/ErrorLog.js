(function() {
    'use strict';

    angular.module('common.errorlog', [])
    .factory('ErrorLog', [function() {

        var log = function(name, err) {
            console.log('ErrorLog: ' + name + ' : ' + err);
        };

        return {
            log: log
        };
    }]);
}());
