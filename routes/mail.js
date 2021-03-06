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
      password: req.session.atp,
      senderFullName: req.session.user.first_name + ' ' + req.session.user.last_name,
      receiver: req.body.receiver,
      subjectLine: req.body.subjectLine,
      MessageBody: req.body.MessageBody,
      HtmlMessageBody: req.body.HtmlMessageBody
    }).then(function(response){
      res.send(response);
    },function(err){
      res.status(502).send(err);
    });
  });

  router.post('/fetch/body/', function(req, res){
    var uname = req.session.user.username,
        password = req.session.atp,
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

  router.post('/fetch/headers/', function(req, res){
    var uname = req.session.user.username,
      password = req.session.atp,
      startIndex = req.body.startIndex,
      endIndex = req.body.endIndex;

    if(!uname || !password || !startIndex){
      console.log(uname+' '+password+' '+startIndex);
      res.status(502).send('Insufficient field values');
    }else {
      imap.getheaders(uname, password, startIndex, endIndex).then(
        function(s){
          res.send(s);
        },function(r){
          res.status(502).send(r);
        }
      );
    }
  });

  router.get('/fetch/mailboxes/', function(req, res){
    var uname = req.session.user.username,
      password = req.session.atp ;

    if(!uname || !password ){
      res.status(502).send('Insufficient field values');
    }else {
      imap.getMailBoxes(uname, password).then(
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
