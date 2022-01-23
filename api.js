var app = require('./config/server');
var db = require('database');


db.connectToServer(function (err, client) {
  if (err) console.log(err);
  const port = 3000;
  app.listen(port, () => console.log('Server is listening...'));

});
