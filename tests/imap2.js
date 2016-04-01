process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var MailParser = require("mailparser").MailParser;
var ImapClient = require('emailjs-imap-client') ;

var client = new ImapClient('mail.zairza.in', 993,
  {
    auth: {
      user: 'shubham@mail.zairza.in',
      pass: 'shubham'
    },
    useSecureTransport : true ,
    requireTLS : true
  });

client.connect().then(function(){
  console.log("connected");
  client.listMailboxes().then(
    function(mailboxes){
      //console.log(console.log(mailboxes));
      client.selectMailbox('INBOX').then(function(mailbox){
        console.log(mailbox);
        client.listMessages('INBOX', '1', ['body[]']).then(function(messages) {
          messages.forEach(function(message){
            console.log();
            var mailparser = new MailParser();

            var email = message['body[]'];

            mailparser.on("end", function(mail_object){
              console.log(mail_object);
            });

            mailparser.write(email);
            mailparser.end();
          });
          client.close().then(function () {
            console.log("disconnected");
          });
        });

      });
    })
});
