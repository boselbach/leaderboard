module.exports = {
    apiKey: "xx",
        "project": {
        "filters": {"networks": ["twitter"]},
        "topicIds": ["xx"],
        "limit": 1000,
        "offset": 0,
        "since": "2015-03-13",
        "until": "2015-03-19",
        "sort": "date"
    },
    path: {
        models: __dirname + '/../app/models/',
        routes: __dirname + '/../app/routes/',
    },
    database: {
        url: "mongodb://localhost/socialleaderboard"
    },
    twitterClients: [
        {
    		consumer_key: 'xx',
    		consumer_secret: 'xx',
    		access_token_key: 'xx',
    		access_token_secret: 'xx'
        },
        {
    		consumer_key: 'xx',
    		consumer_secret: 'xx',
    		access_token_key: 'xx',
    		access_token_secret: 'xx'
        },
        {
    		consumer_key: 'xx',
    		consumer_secret: 'xx',
    		access_token_key: 'xx',
    		access_token_secret: 'xx'
        }
    ],
    twitterInterval: 5000
};
