(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Q = require('q');

    var twitterSchema = new mongoose.Schema({
        projectId: { type: String },
        id: { type: String, index: true },
        contentsPostedTime: Date,
        name: String,
        handle: String,
        description: String,
        link: String,
        body: String,
        thumbnail: String,
        tags: Array,
        twitter_id: String,
        followers_count: Number,
        retweet_count: Number,
        favorite_count: Number,
        mentions_count: Number,
        replies_count: Number,
        score: Number
    });

    var TwitterData = mongoose.model('TwitterData', twitterSchema);

    module.exports.add = function(projectId, mention) {
        var def = Q.defer();

        TwitterData.update({ id: mention.id },
            { $set: {
                projectId: projectId,
                id: mention.id,
                contentsPostedTime: mention.contentsPostedTime,
                name: mention.author.name,
                handle: mention.author.handle,
                description: '',
                link: mention.content.link,
                body: mention.content.body,
                thumbnail: mention.author.thumbnail,
                tags: mention.content.tags,
                twitter_id: mention.content.link.substr(mention.content.link.lastIndexOf('/') + 1),
                followers_count: 0,
                retweet_count: 0,
                favorite_count: 0,
                mentions_count: 0,
                replies_count: 0,
                score: 0,
                createdAt: { type: Date, default: Date.now }
            }},
            {upsert: true},
            function(err, data) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(data);
                }
        });

        return def.promise;
    };

    module.exports.getLatest = function() {
        var def = Q.defer();

        TwitterData
        .findOne()
        .sort({'contentsPostedTime': 1})
        .exec(function(err, data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data);
            }
        });

        return def.promise;
    };

    module.exports.getAll = function() {
        var def = Q.defer();

        TwitterData
        .find()
        .exec(function(err, data) {
            def.resolve(data);
        });

        return def.promise;
    };

}());
