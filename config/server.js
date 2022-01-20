const express = require('express');
var bodyParser = require('body-parser');
const { body } = require('express-validator');
var consign = require('consign'); //loader
const crypto = require("crypto");


var logger = function(req, res, next) {
    const id = crypto.randomBytes(16).toString("hex");
    console.log('RequestID: ' + id); // => f9b327e70bbcf42494ccb28b2d98e00e
    next(); // Passing the request to the next handler in the stack.
}

const app = express();

/*  Midlewares  */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger);

/*Load routes, controllers, models... */
consign() 
    .include('app/routes')
    .then('app/models')
    .into(app);

module.exports = app;
