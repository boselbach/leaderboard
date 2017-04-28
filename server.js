(function(){
    'use strict';

    var EventEmitter = require('events').EventEmitter;
    var fs = require('fs');
    var http = require('http');
    var cons = require('consolidate');
    var swig = require('swig');
    var express = require('express');
    var mongoose = require('mongoose');
    var cors = require('cors');
    var bodyParser = require('body-parser');
    var app = express();
    var config = require('./config/config.js');
    var Rehydrate = require('rehydrate');
    var Listen = require('listen');

    /*
    * Configuration
    */
    // module.exports = new EventEmitter();
    mongoose.connect(config.database.url);

    // Assign swig engine to .html files
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/public/views');
    app.set('view options', { layout: false });
    app.set('port', process.env.PORT || 3000);

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    /*
    * Load routes
    */
    mongoose.connection.on('error', console.error.bind(console), 'connection error:');
    mongoose.connection.once('open', function() {
        fs.readdirSync(config.path.routes).forEach(function(route) {
            require(config.path.routes + route)(app);
        });
    });

    /*
    * Create server
    */
    var server = http.createServer(app).listen(app.get('port'), function(error) {
        if (error) {
            throw "Error in creating server!";
        }
    });

    /*
    * Create twitter clients
    */
    // config.twitterClients.forEach(function(config) {
    //     new Rehydrate(config, 10000);
    // });

    /*
    * Load all projects
    */
    var projectModel = require(config.path.models + 'projects.js');
    var twitterModel = require(config.path.models + 'twitterdata.js');
    var mentionsModel = require(config.path.models + 'mentions.js');
    var tagsModel = require(config.path.models + 'tags.js');

    projectModel.all()
    .then(function(projects) {
        projects.forEach(function(project) {
            new Listen({
                project: project,
                apiKey: config.apiKey,
                interval: 10000,
                db: {
                    twitterModel: twitterModel,
                    projectModel: projectModel,
                    mentionsModel: mentionsModel,
                    tagsModel: tagsModel
                },
                debug: true
            });
        });
    });

}());
