(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Q = require('q');

    var TagsSchema = new mongoose.Schema({
        id: String,
        tag: { type: String },
        createdAt: { type: Date, default: Date.now }
    });

    var TagsData = mongoose.model('TagsData', TagsSchema);

    module.exports.add = function(id, tag) {
        TagsData.update({ id: id }, { $set: {
            tag: tag
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

        TagsData.aggregate([ { $group: { _id: "$tag", count: { $sum: 1 }}} ],
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
