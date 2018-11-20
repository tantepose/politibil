/* 
the express backend of politibil.no 
    by Ole Petter Baugerød Stokke

features:
    * fetching tweets using Twit
    * emojifying tweets using my own .replace bonanza
    * reading and writing to a mlab database using MongoDB driver for Node.js 
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

// set up Twit, using enviromental variables from heroku for credencials
// const twitConfig = require('./twitter-config.js'); // use this for credencials in development
const Twit = require('twit');
const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});
console.log('Twitter configured!');

// connect to database, using enviromental variables from heroku for credencials
// const mlab_config = require('./mlab-config.js'); // use this for credencials in development
const MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(process.env.mlab_uri, 
    { useNewUrlParser: true }, 
    (err, client) => {
        if (err) return console.log(err);
        db = client.db('politibil2');
        console.log('mongoLab database connected!');
    }
);

// set up body parser
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server listening! Port:', port);
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

// get and style latests tweets from district
app.get('/api/tweets/:district', function (req,res) {
    console.log('fetching tweets from:', req.params.district);

    T.get('statuses/user_timeline', { // get all tweets
        screen_name: req.params.district, 
        count: 200,
        tweet_mode: 'extended',
        include_rts: false,
        exclude_replies: false,
        trim_user: true
    }, (err, data) => {
        if (err) return console.log(err);
        res.json(styledTweets(data, req.params.district)); // return all styled tweets
    });
});

// create new user
app.post('/api/user/new', (req, res) => {
    console.log('creating user:', req.body.username);

    db.collection('users').insertOne({
        username: req.body.username,
        district: req.body.district,
        favorites: []
    }, (err, result) => {
        if (err) return console.log(err)
        res.json(req.body);
    });
});

// save a favorite tweet
app.post('/api/user/favorites/:username', (req, res) => {
    console.log('saving favorite tweet for:', req.params.username);

    db.collection('users').updateOne(
        { username: req.params.username }, // find this user
        { $push: { favorites: req.body } }, // push favorite there
        (err, result) => {
            if (err) return console.log(err)
            res.json(req.body);
        }
    )
});

// set district
app.post('/api/user/:username', (req, res) => {
    console.log('setting ' + req.body.district + ' as district for ' + req.params.username);

    db.collection('users').updateOne({ username: req.params.username },
        { $set: { district: req.body.district } }, 
        (err, result) => {
            if (err) return console.log(err)
            res.json(req.body);
        }
    )
});

// get user from username
app.get('/api/user/:username', (req, res) => {
    console.log('getting user:', req.params.username);

    db.collection('users').find({ 
        username: req.params.username 
    })
    .toArray(function(err, result) {
        if (err) return console.log(err)
        res.json(result);
    });
});

// get all users (for development only)
app.get('/api/user/', (req, res) => {
    console.log('getting all users');

    db.collection('users').find()
    .toArray(function(err, result) {
        if (err) return console.log(err)
        res.json(result);
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
function styledTweets (data, district) {

    // populate our array with only the tweet-text and custom timestamp
    let tweets = [];
    data.forEach(tweet => {
        tweets.push({
            text: tweet.full_text,
            timestamp: '@' + district + ', ' + moment(tweet.created_at, 'ddd MMM DD HH:mm:ss +ZZ YYYY').format('HH:mm DD/MM/YYYY') // "Wed Nov 07 18:57:44 +0000 2018
        });
    });

    // replace words with emojis
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

    return tweets; // return all styled tweets as JSON 
}