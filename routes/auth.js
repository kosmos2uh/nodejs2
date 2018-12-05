const router = require('express').Router();
// const controllers = require('../controllers');
// const authentication = require('../middleware/authentication');

// const passportLinkedIn = require('../middleware/auth/linkedin');
// const passportGithub = require('../middleware/auth/github');
const passportTwitter = require('../middleware/auth/twitter');

// router.get('/linkedin', passportLinkedIn.authenticate('linkedin'));

// router.get('/linkedin/callback',
//   passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/github/callback',
//   passportGithub.authenticate('github', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/google', passportGoogle.authenticate('google', { scope: [ 'user:email' ] }));

// router.get('/google/callback',
//   passportGoogle.authenticate('google', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

// router.get('/facebook', passportFacebook.authenticate('facebook', { scope: [ 'user:email' ] }));

// router.get('/facebook/callback',
//   passportFacebook.authenticate('facebook', { failureRedirect: '/user/login' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(req.user);
//   });

router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/user/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

module.exports = router;
