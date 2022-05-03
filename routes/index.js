var router = require('express').Router();
//var router = express.Router();
let passport = require('passport')

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('employees', { title: 'Express' });
//});

//router.get('/', function(req, res) {
  //res.redirect('/employees');
//})

//router.get('/', function(req, res) {
  //res.redirect('/employees');
//})

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router;
