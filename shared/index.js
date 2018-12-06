const config = require('../config');
const crypto = require('crypto');
// const Sendgrid = require('sendgrid')(config.email.apiKey);
const sgMail = require('@sendgrid/mail');//(config.email.apiKey);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SendgridClient = require('@sendgrid/client');
SendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

exports.constructUrl = function(req, path) {
	return req.protocol + '://' + req.get('host') + path;
};

exports.createRandomToken = function() {
	return crypto.randomBytes(20).toString('hex');
};

exports.getUserId = function(req, res) {
	if (typeof req.user !== 'undefined') {
		return req.user.id;
	}

	return false;
};

exports.sendEmail = function(to, from, subject, contents, contentType, callback) {

    /*const msg = {
        to: to,
        from: from,
        subject: subject,
        text: '',
        html: contents,
    };
    sgMail.send(msg);*/

    const request = {
        method: 'POST',
        uri: '/v3/mail/send',
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: to
                        }
                    ],
                    subject: subject
                }
            ],
            from: {
                email: from
            },
            content: [
                {
                    type: contentType,
                    value: contents
                }
            ]
        }
    };
    SendgridClient.request(request, (err, res) => {
        /*if (err) {
            next(err);
            return;
        }*/
        // Render the index route on success
        callback(err, res)
    });

    /*const request = Sendgrid.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: to
                        }
                    ],
                    subject: subject
                }
            ],
            from: {
                email: from
            },
            content: [
                {
                    type: contentType,
                    value: contents
                }
            ]
        }
    });

    Sendgrid.API(request, (err, res) => {
        if (err) {
          next(err);
          return;
        }
        // Render the index route on success
        callback(err, res)
      });*/

};
