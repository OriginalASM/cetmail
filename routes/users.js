var router = require('express').Router();

module.exports = function(mongoose) {
  var Schema = mongoose.Schema;

  var Account = new Schema({
    email    : String,
    name     : String,
    password : String,
    role     : {
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
  router.get('/api/:id', userApi.findOne);
  router.all('/api/insert', userApi.insert);
  router.get('/api/destroy/:id', userApi.destroy);
  router.get('/api/update/:id', userApi.update);
  router.all('/api/login/', auth.login);
  router.all('/api/logout/', auth.logout);
  router.all('/api/getuser/', auth.getSelfInformation);



  return router;
};
