var router = require('express').Router();

module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var Account = new Schema({
    regno : Number,
    first_name : String,
    last_name : String,
    username : String,
    gender : enum['male' , 'female'],
    rec-email : String, //Recovery Email
    password : String,
    contact : Number,
    role : {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user'
    }
  });



  // Create a user model with this scheme

  var User = mongoose.model('User', Account);
  var userApi = require('./rest.js')(User);
  var auth = require('./auth.js')(User);
  var policy = require('./policy.js');

  router.get('/api/', userApi.find);
  router.all('/api/insert', userApi.insert);
  router.get('/api/destroy/:id', userApi.destroy);
  router.get('/api/update/:id', userApi.update);
  router.all('/api/login/', function(req,res,next){console.log(req.body);next();},auth.login);
  router.all('/api/logout/', auth.logout);
  router.all('/api/getuser/', auth.getSelfInformation);
  router.get('/api/:id' ,userApi.findOne);



  return router;
};
