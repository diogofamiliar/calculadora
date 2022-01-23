const express = require('express');
const app = express();

var bodyParser = require('body-parser');

/*atlas free dont allow this command*/
//global.uselogs = "off"; //SET DATABASE PROFILING level for logging all queries

/*  Midlewares  */
app.use(bodyParser.urlencoded({ extended: true }));

/*Load*/
var consign = require('consign');
consign()
    .include('app/routes')
    .then('app/models')
    .into(app);

module.exports = app;
