var express = require('express');
var router = express.Router(); 
var moment = require('moment');

//set up Twit (using ./config.js for credencials)
const Twit = require('twit');
const twitConfig = require('./config.js');
const T = new Twit(twitConfig);

// global variables
let district;

// get api/:district - gets latests tweets from district
router.get('/:district', function (req,res,next) { //request, response, next()
    district = req.params.district;
    console.log('getting', district);

    T.get('statuses/user_timeline', { 
        screen_name: district, 
        count: 200,
        tweet_mode: 'extended',
        include_rts: false,
        exclude_replies: false,
        trim_user: true
    }, (err, data, response) => {
        if (!err) {
            gatherTweets(res, data);
            next();
        } else { //if the request fails
            console.log('Timeline failed: ' + err.message);
            res.json({
                error: err.message
            });
            next(err); //engage error handler with current error
        }
    });
});

function gatherTweets (res, data) {
    console.log('alt:', data);
    // get the tweets in an array in orderly fashion
    let tweets = [];
    data.forEach(tweet => {
        tweets.push({
            text: tweet.full_text,
            timestamp: '@' + district + ' ' + moment(tweet.created_at).format('HH:mm, DD/MM/YY')
        });
    });

    // replacing words with emojis
    let emojiTweet;
    tweets.forEach(function (tweet, index, array) {
        emojiTweet = tweet.text
            .replace(/nødetatene/i, '🚓🚒🚑')
            
            .replace('politibil', '🚓')
            .replace('politiet', '👮')
            .replace('politi', '👮')
            
            
            .replace('ambulansen', '🚑')
            .replace('ambulanse', '🚑')
            
            .replace('melding', '📞')
            .replace('syklist', '🚲')
            .replace('pistol', '🔫')
            
            .replace('biler', '🚘')
            .replace('bilen', '🚗')
            .replace('bil', '🚗')
            
            .replace('MC', '🏍️')
            .replace('motorsykkel', '🏍️')
            
            .replace(/brannbilen/gi, '🚒')
            .replace(/brannbil/gi, '🚒')

            .replace('brannvesenet', '🚒')
            .replace('brann', '🔥')
            
            .replace(/smellet/gi, '💥')
            .replace(/smell/gi, '💥')
            
            .replace(/bussen/gi, '🚌')
            .replace(/buss/gi, '🚌')

            .replace(/fotgjengeren/gi, '🚶')
            .replace(/fotgjenger/gi, '🚶')

        // get the emojified strings back into the array
        array[index] = {
            text: emojiTweet, 
            timestamp: tweet.timestamp,
        };
    });

    // respond with the finished json
    res.json(
        tweets
    );
}

module.exports = router;

// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html