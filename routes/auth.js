/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing authentications
 * @help        :: helps in authentication of users and managing roles currently local only
 */

var bcrypt = require("bcryptjs");

function CheckPasswordIntegrity(password) {
  var re = /^\w+$/;
  return re.test(password);
}

module.exports = function(User){
  return {
    login: function (req, res) {
      if (!(req.body && (req.body.email || req.body.username) && req.body.password)) {
        res.status(400).send({error: true, message: 'Insufficient fields'});
      } else {
        var email = req.body.email || req.body.username || '',
          password = req.body.password || '' ;
        //noinspection JSUnresolvedVariable
        User.findOne({username: email}).exec(function (err, user) {
          if (err || !user) {
            console.log(err || 'Login : user not found');
            res.send({error: true, message: err || 'No user registered with this email'});
          } else if (!CheckPasswordIntegrity(password)) {
            console.log('Login : Regular Expression check failed');
            res.send({error: true, message: 'Regular Expression check failed'});
          } else {
            bcrypt.compare(password, user.password, function (error, match) {
              if (match) {
                req.session.user = user;
                res.send({message: 'success'});
              } else {
                console.log('match failed');
                res.send({error: true, message: 'Password match failed'});
              }
            });
          }
        });
      }
    },

    logout: function (req,res){
      req.session.user = false ;
      res.send({message: 'success'});
    },

    getSelfInformation : function(req, res){
      if(req.session.user){
        res.send(req.session.user);
      }else{
        res.status(403).send('access denied');
      }
    }
  };
};
