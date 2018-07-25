var express = require('express');
var router = express.Router(); 

//set up Twit (using ./config.js for credencials)
const Twit = require('twit');
const twitConfig = require('./config.js');
const T = new Twit(twitConfig);

let district;

// routes

router.get('/:district', function (req,res,next) { //request, response, next()
    district = req.params.district;
    console.log('getting', district);

    T.get('statuses/user_timeline', { 
        screen_name: district, 
        count: 10,
        tweet_mode: 'extended',
        include_rts: false,
        exclude_replies: true
    }, (err, data, response) => {
        if (!err) {
            outputTweets(res, data);
            next();
        } else { //if the request fails
            console.log('Timeline failed: ' + err.message);
            res.json({
                district: district,
                error: err.message
            });
            next(err); //engage error handler with current error
        }
    });
});

// burde sikkert være middleware
function outputTweets (res, data) {
    let tweets = [];

    data.forEach(tweet => {
        tweets.push({
            text: tweet.full_text,
            date: tweet.created_at
        });
    });

    res.json({
        district: district,
        tweets: tweets
    });
}

module.exports = router;

// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html