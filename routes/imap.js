/*
* @doc: https://github.com/mscdex/node-imap
*/
var Imap = require('imap'),
  inspect = require('util').inspect,
  q = require('q');

var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser('debug');
var fs = require("fs");

mailparser.on("end", function(mail_object){
  console.log(mail_object);
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var imap = new Imap({
  user: 'shubham@mail.zairza.in',
  password: 'shubham',
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
    var f = imap.fetch('1:8', { bodies: '' });
    f.on('message', function (msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function (stream, info) {
        var buffer = '';
        stream.on('data', function (chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function () {
          //console.log(buffer);
          mailparser.write(buffer.toString());
          mailparser.end();
        });
      });
      msg.once('attributes', function (attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function () {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function (err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function () {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();
