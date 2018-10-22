var express = require('express');
var router = express.Router(); 
var moment = require('moment');

//set up Twit (using ./config.js for credencials)
const Twit = require('twit');
const twitConfig = require('./config.js');
const T = new Twit(twitConfig);

// global district variable
let district;

// get api/:district - gets latests tweets from district
router.get('/tweets/:district', function (req,res,next) { //request, response, next()
    district = req.params.district;

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
            console.error('Timeline failed: ' + err.message);
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
            timestamp: '@' + district + ', ' + moment(tweet.created_at).format('HH:mm DD/MM/YYYY')
        });
    });

    // replacing words with emojis
    let emojiTweet;
    tweets.forEach(function (tweet, index, array) {
        emojiTweet = tweet.text
            .replace(/\bnødetatene\b/gi, '🚓🚒🚑')
            
            .replace(/\bambulanse\b/gi, '🚑')
            .replace(/\bambulansen\b/gi, '🚑')

            .replace(/\bsykehus\b/gi, '🏥')
            .replace(/\bsykehuset\b/gi, '🏥')
            .replace(/\blegevakt\b/gi, '🏥')
            .replace(/\blegevakten\b/gi, '🏥')
            .replace(/\blegevakta\b/gi, '🏥')
            
            .replace(/\bpolitibil\b/gi, '🚓')
            .replace(/\bpolitibilen\b/gi, '🚓')
            .replace(/\bpolitipatrulje\b/gi, '🚓')
            .replace(/\bpolitipatruljen\b/gi, '🚓')

            .replace(/\bpoliti\b/gi, '👮')
            .replace(/\bpolitiet\b/gi, '👮')
            .replace(/\bvi\b/gi, '👮')
            
            .replace(/\bmelding\b/gi, '📞')

            .replace(/\bsykkel\b/gi, '🚲')
            .replace(/\bsykkelen\b/gi, '🚲')
            .replace(/\bsyklist\b/gi, '🚲')
            .replace(/\bsyklisten\b/gi, '🚲')

            .replace(/\bbåt\b/gi, '🛥️')
            .replace(/\bbåten\b/gi, '🛥️')
            
            .replace(/\bpistol\b/gi, '🔫')
            .replace(/\bpistolen\b/gi, '🔫')

            .replace(/\bkniv\b/gi, '🔪')
            .replace(/\bkniven\b/gi, '🔪')

            .replace(/\bnarkotika\b/gi, '💉')
            .replace(/\bnarkotikaen\b/gi, '💉')
            .replace(/\bnarko\b/gi, '💉')

            .replace(/\bhund\b/gi, '🐕')
            .replace(/\bhunden\b/gi, '🐕')

            .replace(/\bkatt\b/gi, '🐈')
            .replace(/\bkatten\b/gi, '🐈')
            .replace(/\bkatta\b/gi, '🐈')
            
            
            .replace(/\bbil\b/gi, '🚗')
            .replace(/\bbilen\b/gi, '🚗')
            .replace(/\bbiler\b/gi, '🚗')
            .replace(/\bbilene\b/gi, '🚗')
            .replace(/\bpersonbil\b/gi, '🚗')
            .replace(/\bpersonbilen\b/gi, '🚗')
            
            .replace(/\blastebil\b/gi, '🚚')
            .replace(/\blastebilen\b/gi, '🚚')
            
            .replace(/\bbuss\b/gi, '🚌')
            .replace(/\bbussen\b/gi, '🚌')
            
            .replace(/\bMC\b/gi, '🏍️')
            .replace(/\bmotorsykkel\b/gi, '🏍️')
            .replace(/\bmotorsykkelen\b/gi, '🏍️')
            
            .replace(/\bbrannbil\b/gi, '🚒')
            .replace(/\bbrannbilen\b/gi, '🚒')
            .replace(/\bbrannvesen\b/gi, '🚒')
            .replace(/\bbrannvesenet\b/gi, '🚒')

            .replace(/\bbrann\b/gi, '🔥')
            .replace(/\bbrannen\b/gi, '🔥')
            
            .replace(/\bsmell\b/gi, '💥')
            .replace(/\bsmellet\b/gi, '💥')

            .replace(/\bfotgjenger\b/gi, '🚶')
            .replace(/\bfotgjengeren\b/gi, '🚶')

            .replace(/\bperson\b/gi, '😐')
            .replace(/\bpersonen\b/gi, '😐')

            .replace(/\bmann\b/gi, '👨')
            .replace(/\bmannen\b/gi, '👨')

            .replace(/\bkvinne\b/gi, '👩')
            .replace(/\bkvinnen\b/gi, '👩')

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