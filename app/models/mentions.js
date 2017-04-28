(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Q = require('q');

    var mentionsSchema = new mongoose.Schema({
        id: String,
        handle: String,
        createdAt: { type: Date, default: Date.now }
    });

    var MentionsData = mongoose.model('MentionsData', mentionsSchema);

    module.exports.add = function(id, handle) {
        MentionsData.update({ id: id }, { $set: {
            handle: handle
        }},
        { upsert: true },
        function(err, data) {
            if (err) {
                throw err;
            }

            return true;
        });
    };

    module.exports.getAll = function(handle) {
        var def = Q.defer();

        MentionsData.aggregate([ { $group: { _id: "$handle", count: { $sum: 1 }}} ],
            function (err, data) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(data);
                }
            }
        );

        return def.promise;
    };

}());
