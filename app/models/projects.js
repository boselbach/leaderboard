(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Q = require('q');

    var ProjectsSchema = new mongoose.Schema({
        title: { type: String, required: true },
        filters: { type: Array, required: true },
        projectId: { type: String, required: true },
        topicIds: { type: Array, required: true },
        limit: { type: Number, required: true },
        offset: { type: Number, required: true },
        since: { type: String, required: true },
        until: { type: String, required: true },
        lastUpdate: { type: String },
        totalMentionCount: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    });

    var ProjectData = mongoose.model('ProjectData', ProjectsSchema);

    module.exports.all = function() {
        var def = Q.defer();

        ProjectData
        .find()
        .sort([['createdAt', 'ascending']])
        .exec(function(err, data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    };

    module.exports.create = function(formdata) {
        var def = Q.defer();
        var data = new ProjectData(formdata);

        data.save(function(err, data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    };


    module.exports.update = function(data) {
        var def = Q.defer();

        ProjectData.update({_id: data.id}, { $set: data.fields || data }, { upsert: true }, function(err, data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    };


    module.exports.get = function(data) {
        var def = Q.defer();

        ProjectData.findOne({_id: data.id}, data.fields || {})
        .exec(function(err, data) {
            if (err) {
                def.reject(err);
            }

            def.resolve(data);
        });

        return def.promise;
    };

    module.exports.getTotalMentionCount = function(projectId) {
        var def = Q.defer();

        ProjectData.findOne({_id: projectId}, { _id: false, totalMentionCount: true })
        .exec(function(err, data) {
            if (err) {
                def.reject(err);
            }

            def.resolve(data);
        });

        return def.promise;
    };

    module.exports.totalMentionCount = function(projectId, totalMentionCount) {
        ProjectData.update({ _id: projectId }, { $set: { totalMentionCount: totalMentionCount }}, { upsert: true }, function(err, data) {
            if (err) {
                throw err;
            }

            return true;
        });
    };

    module.exports.updateTotalMentionCount = function(projectId, totalMentionCount) {
        ProjectData.update({_id: projectId}, { $inc : { totalMentionCount: totalMentionCount}}, { upsert: true }, function(err, data) {
            if (err) {
                throw err;
            }

            return true;
        });
    };

    module.exports.setLastUpdate = function(data) {
        var def = Q.defer();

        ProjectData.update({_id: data.id}, { $set : {
            'lastUpdate': data.date
        }},
        { upset: true },
        function(err, data) {
            if (err) {
                def.reject(err);
            }

            def.resolve(data);
        });

        return def.promise;
    };

    module.exports.getLastUpdate = function(projectId) {
        var def = Q.defer();

        ProjectData.find({_id: projectId}, {_id: false, lastUpdate: true})
        .exec(function(err, data) {
            if (err) {
                def.reject(err);
            }

            def.resolve(data);
        });

        return def.promise;
    };

}());
