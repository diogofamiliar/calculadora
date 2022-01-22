const express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign'); //loader

const app = express();

/*  Midlewares  */
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(logger);

/*Load routes, controllers, models... */
consign() 
    .include('app/routes')
    .then('app/models')
    .into(app);

module.exports = app;
