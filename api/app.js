var express = require('express');
var app = express();
var routes = require('./routes');

const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser');

// connect to database
var db;
MongoClient.connect('mongodb://politibil:tuttut69@ds223253.mlab.com:23253/politibil', (err, client) => {
    if (err) return console.log(err);
    db = client.db('politibil');
    console.log('mongoLab database connected!');
});

// use router
app.use('/api', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// start server
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Server listening! On port', port);

// ROUTES

// create new user
app.post('/api/user/new', (req, res) => {
    db.collection('users').insertOne({
        username: req.body.username,
        district: req.body.district,
        favorites: []
    }, (err, result) => {
        if (err) return console.log(err)
        res.json(
            req.body
        );
    });
});

// save a favorite tweet
app.post('/api/user/favorites/:username', (req, res) => {
    db.collection('users').updateOne(
        { username: req.params.username },
        { $push: { favorites: req.body } }, 
        (err, result) => {
            if (err) return console.log(err)
            res.json(
                req.body
            );
        }
    )
});

// get all user data
app.get('/api/user/:username', (req, res) => {
    db.collection('users')
        .find({ username: req.params.username })
        .toArray(function(err, result) {
            if (err) return console.log(err)
            res.json(result);
        });
});