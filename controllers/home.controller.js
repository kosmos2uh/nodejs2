const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {
  index: (req, res) => {
    res.render('home/index', { appTitle: config.get('app:appTitle'), title: 'Home Page', data: '' });
  },

  about: (req, res) => {
    res.render('home/about', { appTitle: config.get('app:appTitle'), title: 'About Page', data: '' });
  },

  contact: (req, res) => {
    res.render('home/contact/index', { appTitle: config.get('app:appTitle'), title: 'Contact Page', data: '' });
  },

  send: (req, res) => {
    const transporter = nodemailer.createTransport({
      // host: config.get('transport:host'),
      // port: config.get('transport:port'),
      // secure: config.get('transport:secure'),
      service: 'Gmail',
      auth: {
        user: config.get('transport:user'),
        pass: config.get('transport:pass'),
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