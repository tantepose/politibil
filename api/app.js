// sette opp express
var express = require('express');
var app = express();
var routes = require('./routes');

// sette opp server
var port = process.env.PORT || 3000;
app.listen(port);

// bruk routeren
app.use('/api', routes);

