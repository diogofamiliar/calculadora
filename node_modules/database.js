var MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://calculator:witcalculator@calculator.gg2rv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var _db;
var _collection;
var _client;

module.exports = {

  connectToServer: function( callback ) {
    
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('test_db');
      _collection = _db.collection('loggerCollection');
      _client = client;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  },

  getCollection: function() {
    return _collection;
  },

  getClient: function() {
    return _client;
  }
};