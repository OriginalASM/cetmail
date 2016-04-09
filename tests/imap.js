/*
 * @doc: https://github.com/mscdex/node-imap
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var Imap = require('imap'),
  inspect = require('util').inspect,
  Q = require('q');

var MailParser = require("mailparser").MailParser;
var fs = require("fs");

var IMAP_test_object = {
  getMail : function(username, password, startIndex, endIndex){

    var result = Q.defer();
    var Mails = [];


    var imap = new Imap({
      user: username + '@mail.zairza.in',
      password: password,
      host: 'mail.zairza.in',
      port: 993,
      tls: true
    });

    var mailparser = new MailParser('debug');

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
      openInbox(function(err, box) {
        if (err) result.reject(err);

        var QueryIndex ;

        if (startIndex === 'latest') { QueryIndex = box.messages.total.toString() + ':*' ;}
        else if (!endIndex) { QueryIndex = startIndex.toString() ;}
        else {QueryIndex = startIndex.toString() + ':' + endIndex.toString() ; }

        console.log(QueryIndex);

        var f = imap.seq.fetch(QueryIndex, { bodies: '' });
        f.on('message', function (msg) {
          var z = {} ;
          mailparser.on("end", function(mail_object){
            z['details' ] = mail_object;
            Mails.push(z);
          });
          msg.on('body', function (stream) {
            var buffer = '';
            stream.on('data', function (chunk) {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', function () {
              mailparser.write(buffer.toString());
            });
          });
          msg.once('attributes', function (attrs) {
            z['attributes'] = inspect(attrs, false, 8);
          });
          msg.once('end', function () {
            mailparser.end();
          });
        });
        f.once('error', function (err) {
          result.reject('Fetch error: ' + err);
        });
        f.once('end', function () {
          imap.end();
        });
      });
    });

    imap.once('error', function(err) {
      result.reject(err);
    });

    imap.once('end', function() {
      result.resolve(Mails);
    });

    imap.connect();

    return result.promise ;
  },

  getheaders : function(username, password, startIndex, endIndex){

    var result = Q.defer();
    var Mails = [];
    //var mailparser = new MailParser();

    var imap = new Imap({
      user: username + '@mail.zairza.in',
      password: password,
      host: 'mail.zairza.in',
      port: 993,
      tls: true
    });

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
      openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch(startIndex + ':' + endIndex, {
          bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
          struct: true
        });
        f.on('message', function(msg, seqno) {
          var Msg = {} ;
          /*
          mailparser.on("end", function(mail_object){
            Msg['header' ] = mail_object;
            Mails.push(Msg);
          });
          */
          msg.on('body', function(stream, info) {
            var buffer = '';
            stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', function() {
              Msg['header' ] = buffer.replace(/\r?\n|\r/,"") ;
            });
          });
          msg.once('attributes', function(attrs) {
            Msg['attributes'] = inspect(attrs, false, 8) ;
          });
          msg.once('end', function() {
            //mailparser.end();
            Mails.push(Msg);
          });
        });
        f.once('error', function(err) {
          result.reject(err);
        });
        f.once('end', function() {
          imap.end();
        });
      });
    });

    imap.once('error', function(err) {
      result.reject(err);
    });

    imap.once('end', function() {
      result.resolve(Mails);
    });

    imap.connect();

    return result.promise ;
  }

};

IMAP_test_object.getMail('rishav.159','rishi',3)
  .then(
    function(a){
    console.log(a)
  },
  function(b){
    console.log(b)
  });
