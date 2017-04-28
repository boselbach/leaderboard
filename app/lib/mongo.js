(function() {
    'use strict';

    var util = require('util');
    var EventEmitter = require('events').EventEmitter;
    var MongoClient = require('mongodb').MongoClient;
    var db = false;


    function MongoDb() {

        EventEmitter.call(this);
    }

    util.inherits(MongoDb, EventEmitter);

    MongoDb.prototype.connect = function(dbUrl) {
        var self = this;

        if (!db) {
            MongoClient.connect(dbUrl, function(err, mongodb) {
                if (err) {
                    throw err;
                }

                self.emit('ready', mongodb);
                // db = mongodb;
            });
        }

        // return db;
    };

    module.exports = MongoDb;

    // module.exports = {
    //     connect: function(dbUrl) {
    //         if (!db) {
    //             MongoClient.connect(dbUrl, function(err, mongodb) {
    //                 if (err) {
    //                     throw err;
    //                 }
    //                 console.log('db connect');
    //                 db = mongodb;
    //             });
    //         }
    //
    //         return db;
    //     }
    // };
}());
