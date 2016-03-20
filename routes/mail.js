var router = require('express').Router();

/*
 * @doc : simpleMail --> route/smtp.js   ## Sends mail
 * @doc :
 *
 */
var policy = require('./policy.js');
var smtp = require('./smtp.js');
var imap = require('./imap.js');

module.exports = function() {

  router.all('/new/simple/', function(req,res){
    smtp.simpleMail ({
      username: req.session.user.username,
      password: req.body.password,
      senderFullName: req.session.user.first_name + ' ' + req.session.user.last_name,
      receiver: req.body.receiver,
      subjectLine: req.body.subjectLine,
      MessageBody: req.body.MessageBody,
      HtmlMessageBody: req.body.MessageBody
    }).then(function(response){
      res.send(response);
    },function(err){
      res.status(502).send(err);
    });
  });

  router.post('/fetch/', function(req, res){
    var uname = req.session.user.username,
        password = req.body.password,
        startIndex = req.body.startIndex,
        endIndex = req.body.endIndex;

    if(!uname || !password || !startIndex){
      console.log(uname+' '+password+' '+startIndex);
      res.status(502).send('Insufficient field values');
    }else {
      imap.getMail(uname, password, startIndex, endIndex).then(
        function(s){
          res.send(s);
        },function(r){
          res.status(502).send(r);
        }
      );
    }
  });

  return router;
};
