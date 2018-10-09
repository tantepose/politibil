var express = require('express');
var app = express();
var routes = require('./routes');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser');
// connecting database
var db;
MongoClient.connect('mongodb://politibil:tuttut69@ds223253.mlab.com:23253/politibil', (err, client) => {
    if (err) return console.log(err);
    db = client.db('politibil');
    console.log('mongoLab database connected!');
});

// use rouyter
app.use('/api', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// start server
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Server listening! On port', port);

// post api/save - saves a favorite tweet
app.post('/api/user/:username', (req, res) => {
    db.collection('users').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        res.json({
            message: 'Tweet saved to database!',
            user: req.params.username,
            text: req.body.text,
            date: req.body.date
        });
    });
});

app.get('/api/user/:username', (req, res) => {
    console.log('henter fra database!');
    db.collection('users').find().toArray(function(err, results) {
        if (err) return console.log(err)
        res.json(results);
    });
});
