// sette opp express
var express = require('express');
var app = express();
var routes = require('./routes');

// bruk routeren
app.use('/api', routes);

// sette opp server
var port = process.env.PORT || 5000;
app.listen(port);
console.log('listening on port', port);