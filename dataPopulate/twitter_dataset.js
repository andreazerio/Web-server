const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv').config({path: './twitter_keys.env' });
var Twit = require('twit');
const request_options = {
    hostname: 'northwitter-api-wqhhzdeecj.now.sh',
    path: '/handles',
    method: 'GET',
};
const currentPath = process.cwd();
var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});

//Creating dataset with Twitter data

const twitterData = https.request(request_options, function(response) {
    response.on('data', function(dataset) {
        fs.writeFile(`${currentPath}/data/handles_name.json`,dataset, function (err) {
            if(err) throw err;
        })
        JSON.parse(dataset).handles.forEach(function(screen_name) { 
            T.get('statuses/user_timeline', {screen_name: screen_name, count : 50}, function(err, data, response) {
                            fs.writeFile(`${currentPath}/data/tweets/${screen_name}.json`, JSON.stringify(data), function(err) {
                                if(err) throw err;
                            }); 
                     
                });
            T.get('users/show',{screen_name: screen_name}, function(err, data, response) {
                fs.writeFile(`${currentPath}/data/users/${screen_name}.json`, JSON.stringify(data), function(err) {
                    if(err) throw err;
                }); 
        })
    });
});

twitterData.on('error', function(error) {
    console.log(error);
});
});
twitterData.end();