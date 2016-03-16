var nodemailer = require('nodemailer');
var Q = require('q');
module.exports = {
  /*
  * @doc : simpleMail // can be used to send simple mail without attachments, supports multiple recipients
  *
  * Format : simpleMail ({
  *                        username:            // username without @mail.zairza.in           !required
  *                        password:            // proper password                            !required
  *                        senderFullName:      // sender's full name                         #Optional
  *                        receiver:            // String eg. 'shubham@mail.com,lua@mail.com' !required
  *                        subjectLine:         // Subject for message                        !required
  *                        MessageBody:         // Fully Qualified message string.            !required
  *                        HtmlMessageBody:     // HTML formatted string message              #Optional
  *                     })
  */

  simpleMail : function(args) {
    var deferred = Q.defer();
    console.log(args);

    if (!args['username']||!args['password']||!args['receiver']||!args['subjectLine']||!args['MessageBody']){
      deferred.reject('one or more required arguments missing');
    } else {
      // create reusable transporter object using the default SMTP transport
      var transporter = nodemailer.createTransport({
        host: 'mail.zairza.in',
        port: 25,
        secure: false, // do not use SSL for local transport
        auth: {
          user: args['username'] + '@mail.zairza.in',
          pass: args['password']
        }
      });

      //setup e-mail data with unicode symbols
      var mailOptions = {
        from: (args['senderFullName']||args['username']) + ' <' + args['username'] + '@mail.zairza.in>', // sender address
        to: args['receiver'], // list of receivers
        subject: args['subjectLine'], // Subject line
        text: args['MessageBody'] // plaintext body
      };

      if (args['HtmlMessageBody']){
        mailOptions['html'] = args['HtmlMessageBody']; // html body
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve(info.response);
        }
      });
    }

    return deferred.promise;
  }
};

