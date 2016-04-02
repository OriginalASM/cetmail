/*
* @doc: https://github.com/mscdex/node-imap
*/

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var Q = require('q');
var MailParser = require("mailparser").MailParser;
var ImapClient = require('emailjs-imap-client') ;

module.exports = {
  getMail : function(username, password, startIndex, endIndex){

    var result = Q.defer();
    var Mails = [];


    var client = new ImapClient('mail.zairza.in', 993,
      {
        auth: {
          user: username + '@mail.zairza.in',
          pass: password
        },
        useSecureTransport : true ,
        requireTLS : true
      });


    client.connect().then(function(){
      console.log("connected");
      client.selectMailbox('INBOX').then(function(mailbox){
        //console.log(mailbox);

        if (startIndex === 'latest') { QueryIndex = mailbox.exists.toString()}
        else if (!endIndex) { QueryIndex = startIndex.toString() ;}
        else {QueryIndex = startIndex.toString() + ':' + endIndex.toString() ; }

        client.listMessages('INBOX', QueryIndex , ['flags','envelope','body[]']).then(function(messages) {
          messages.forEach(function(message, index){
            //console.log(message);
            var mailparser = new MailParser();
            var email = message['body[]'];
            mailparser.on("end", function(mail_object){
              //console.log(mail_object);
              Mails.push({'flags':message['flags'],'envelope':message['envelope'],'body':mail_object});
              if (index == messages.length-1){
                result.resolve(Mails);
                client.close();
              }
            });
            mailparser.write(email);
            mailparser.end();
          });
        });
      });
    });

    client.onerror = function(err) {
      result.reject(err);
    };

    return result.promise ;
  },

  getheaders : function(username, password, startIndex, endIndex){

    var result = Q.defer();
    var Mails = [];


    var client = new ImapClient('mail.zairza.in', 993,
      {
        auth: {
          user: username + '@mail.zairza.in',
          pass: password
        },
        useSecureTransport : true ,
        requireTLS : true
      });


    client.connect().then(function(){
      console.log("connected");
      client.selectMailbox('INBOX').then(function(mailbox){
        //console.log(mailbox);

        if (startIndex === 'latest') { QueryIndex = mailbox.exists.toString()}
        else if (!endIndex) { QueryIndex = startIndex.toString() ;}
        else {QueryIndex = startIndex.toString() + ':' + endIndex.toString() ; }

        client.listMessages('INBOX', QueryIndex , ['flags','envelope']).then(function(messages) {
          messages.forEach(function(message, index){
            //console.log(message);
            var mailparser = new MailParser();
            var email = message['body[]'];
            mailparser.on("end", function(mail_object){
              //console.log(mail_object);
              Mails.push({
                'index':message['#'],
                'flags':message['flags'],
                'envelope':message['envelope']
                });
              if (index == messages.length-1){
                result.resolve(Mails);
                client.close();
              }
            });
            mailparser.write(email);
            mailparser.end();
          });
        });
      });
    });

    client.onerror = function(err) {
      result.reject(err);
    };

    return result.promise ;
  },

  getMailBoxes : function(username, password){

    var result = Q.defer();

    var client = new ImapClient('mail.zairza.in', 993,
      {
        auth: {
          user: username + '@mail.zairza.in',
          pass: password
        },
        useSecureTransport : true ,
        requireTLS : true
      });


    client.connect().then(function(){
      console.log("connected");
      client.listMailboxes().then(
        function(mailboxes){
          console.log(mailboxes);
          mailboxes.children.forEach(function(mailbox,index){
            client.selectMailbox(mailbox.path).then(function(props){
              console.log(props);
              mailbox['properties'] = props ;
              if(index == mailboxes.children.length-1){
                result.resolve(mailboxes);
                client.close();
              }
            });
          });
        }
      );
    });

    client.onerror = function(err) {
      result.reject(err);
    };

    return result.promise ;
  }

};
