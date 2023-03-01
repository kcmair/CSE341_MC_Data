const router = require('express').Router();
const passport = require('passport');

router
  .get('/google', passport.authenticate('google', { scope: ['profile'] }))
  .get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/api-docs');
    }
  )
  .get('/logout', (req, res) => {
    req.logout;
    res.redirect('/');
  });

module.exports = router;
