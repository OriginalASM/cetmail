var connection_string = '127.0.0.1:27017/zairzaMail';

module.exports = function (mongoose) {
  //try connection to database
  mongoose.connect("mongodb://"+connection_string);

  //see what was result
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connection established to db");
  });
} ;
