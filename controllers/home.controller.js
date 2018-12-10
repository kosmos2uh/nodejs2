const nodemailer = require('nodemailer');
const models = require('../models');
const config = require('../config');

module.exports = {
    index: (req, res, next) => {

        models.Post.find()
            .sort([['title', 'ascending']])
            .exec((err, posts) => {
                if (err) {
                    return next(err);
                }
                res.render('home/index',
                    {
                        title: 'Posts List',
                        posts: posts,
                    });
            });
    },

  about: (req, res) => {
    res.render('home/about', { appTitle: process.env.APP_TITLE, title: 'About Page', data: '' });
  },

  contact: (req, res) => {
    res.render('home/contact/index', { appTitle: process.env.APP_TITLE, title: 'Contact Page', data: '', csrf: req.csrfToken() });
  },

  send: (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,//config.get('transport:user'),
        pass: process.env.SMTP_PASSWORD,//config.get('transport:pass'),
      },
    });

    const mailOptions = {
      from: `"${req.body.name}<${req.body.email}>"`,
      to: 'kosmos2uh@gmail.com',
      subject: req.body.subject,
      text: `You have a new submission with the following details... ${req.body.message}`,
      html: `<p>You have a new submission with the following details... ${req.body.message}</p>`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      res.redirect('/success');
    });
  },
}