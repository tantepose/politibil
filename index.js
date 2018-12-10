/* 
the NodeJS/Express backend of politibil.no 
    by Ole Petter Baugerød Stokke

features:
    * fetching tweets using Twit
    * emojifying tweets using my own emojifier function
    * reading and writing to a mlab database, using MongoDB driver for Node.js 
*/

/***
 *               _               
 *              | |              
 *      ___  ___| |_ _   _ _ __  
 *     / __|/ _ \ __| | | | '_ \ 
 *     \__ \  __/ |_| |_| | |_) |
 *     |___/\___|\__|\__,_| .__/ 
 *                        | |    
 *                        |_|    
 */

 // general requirements
const express = require('express');
const app = express();
const moment = require('moment');
const path = require('path');

// use local .env file for credencials when running on local server
// provide "consumer_key", "consumer_secret", "access_token" & "access_token_secret" from Twitter for Twit
// and "mlab_uri" for connection to mLab database
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

// set up Twit
const Twit = require('twit');
const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});
console.log('Twitter configured!');

// connect to database
const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(process.env.mlab_uri, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db();
        console.log('mongoLab database connected!');
    }
);

// set up body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server listening! Port: ', port);
});

/***
 *                      _            
 *                     | |           
 *      _ __ ___  _   _| |_ ___  ___ 
 *     | '__/ _ \| | | | __/ _ \/ __|
 *     | | | (_) | |_| | ||  __/\__ \
 *     |_|  \___/ \__,_|\__\___||___/
 *                                   
 *                                   
 */

// GET /api/tweets/:district
// get latest tweets from district
app.get('/api/tweets/:district', function (req, res) {
    console.log('fetching tweets from: ', req.params.district);

    T.get('statuses/user_timeline', { // get the 200 latest tweets
        screen_name: req.params.district, 
        count: 200,
        tweet_mode: 'extended',
        include_rts: false,
        exclude_replies: false,
        trim_user: true
    }, (err, data) => {
        if (err) return console.log(err);
        res.json(emojifyTweets(data, req.params.district)); // return all tweets emojified
    });
});

// POST /api/user/new
// create a new user
app.post('/api/user/new', (req, res) => {
    console.log('creating user: ', req.body.username);

    db.collection('users').insertOne({ // insert new user to database
        username: req.body.username,
        district: req.body.district,
        favorites: []
    }, (err, result) => {
        if (err) return console.log(err)
        res.end(); // close request 
    });
});

// POST /api/user/favorites/:username
// save a favorite tweet on user in database
app.post('/api/user/favorites/:username', (req, res) => {
    console.log('saving favorite tweet for: ', req.params.username);

    db.collection('users').updateOne( // update user in database
        { username: req.params.username }, // find the user
        { $push: { favorites: req.body } }, // push tweet to favorites array
        (err, result) => {
            if (err) return console.log(err)
            res.end(); // close request
        }
    )
});

// POST /api/user/:username
// set district on user in database
app.post('/api/user/:username', (req, res) => {
    console.log('setting ' + req.body.district + ' as district for ' + req.params.username);

    db.collection('users').updateOne( // update user in database
        { username: req.params.username }, // find the user
        { $set: { district: req.body.district } }, // set district
        (err, result) => {
            if (err) return console.log(err)
            res.end(); // close request
        }
    )
});

// GET /api/user/:username
// get user from database
app.get('/api/user/:username', (req, res) => {
    console.log('getting user:', req.params.username);

    db.collection('users').findOne({ // find user in database
        username: req.params.username 
    }, (err, result) => {
        if (err) return console.log(err);
        res.json(result); // return user
    });
});

// serving the react app from the express server
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

/***
 *                _          
 *               (_)         
 *      _ __ ___  _ ___  ___ 
 *     | '_ ` _ \| / __|/ __|
 *     | | | | | | \__ \ (__ 
 *     |_| |_| |_|_|___/\___|
 *                           
 *                           
 */

// format and emojify tweets
function emojifyTweets (data, district) {

    // formating: use only tweet-text, and add custom timestamp
    let tweets = [];
    data.forEach(tweet => {
        tweets.push({
            text: tweet.full_text,
            timestamp: '@' + district + ', ' + moment(tweet.created_at, 'ddd MMM DD HH:mm:ss +ZZ YYYY').format('HH:mm DD/MM/YYYY') // "Wed Nov 07 18:57:44 +0000 2018
        });
    });

    // emojifying: replace words with emojis
    let emojiTweet;
    tweets.forEach(function (tweet, index, array) { // loop through all tweets
        emojiTweet = tweet.text // replace words with emojis
            .replace(/\bnødetatene\b/gi, '🚓🚒🚑')
            
            .replace(/\bambulanse\b/gi, '🚑')
            .replace(/\bambulansen\b/gi, '🚑')

            .replace(/\bsykehus\b/gi, '🏥')
            .replace(/\bsykehuset\b/gi, '🏥')
            .replace(/\blegevakt\b/gi, '🏥')
            .replace(/\blegevakten\b/gi, '🏥')
            .replace(/\blegevakta\b/gi, '🏥')
            
            .replace(/\bpatrulje\b/gi, '🚓')
            .replace(/\bpatruljen\b/gi, '🚓')

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

            .replace(/\btraktor\b/gi, '🚜')
            .replace(/\btraktoren\b/gi, '🚜')
            
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

        // get the emojified string back into the array
        array[index] = {
            text: emojiTweet, 
            timestamp: tweet.timestamp,
        };
    });

    return tweets; // return all styled tweets
}