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
        count: 200,
        tweet_mode: 'extended',
        include_rts: false,
        exclude_replies: true,
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
    // get the tweets in an array in orderly fashion
    let tweets = [];
    data.forEach(tweet => {
        tweets.push({
            text: tweet.full_text,
            date: tweet.created_at
        });
    });

    // replacing words with emojis
    let emojiTweet;
    tweets.forEach(function (tweet, index, array) {
        emojiTweet = tweet.text
            .replace(/nødetatene/i, '🚓🚒🚑')
            .replace('Politiet', '👮')
            .replace('melding', '📞')
            .replace('syklist', '🚲')
            .replace('pistol', '🔫')
            .replace('bil', '🚗')
            .replace('bilen', '🚗')
            .replace('MC', '🏍️')
            .replace('brenner', '🔥')
            .replace(/brann/i, '🔥')
        // get the emojified strings back into the array
        array[index] = {
            text: emojiTweet, 
            date: tweet.date
        };
    });

    // respond with the finished json
    res.json(
        tweets
    );
}

module.exports = router;

// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html