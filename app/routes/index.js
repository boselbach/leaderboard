(function() {
    'use strict';

    module.exports = function(app) {
        console.log('loaded');

        app.get('/', function(req, res) {
            res.render('index', {
                title: "Social Leaderboard"
            });
        });
    };
}());
