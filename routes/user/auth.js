const express = require('express');
const passport = require('passport');
const router =express.Router();
const authentication = require('../../components/middle/authentication');
const jwt = require('jsonwebtoken');
const userController = require('../../components/users/controller');


router.get('/google',[authentication.checkLogin], passport.authenticate('google',{scope: ['profile','email']}))

router.get('/google/callback',[authentication.checkLogin], passport.authenticate('google',{failureRedirect:'/'}),
async function (req, res, next) {
    var update = global.update;
    const user = await userController.getUsersById(update);
    const token = jwt.sign({ id: update, username: user.username }, 'token')
    req.session.token = token;
    var message = global.message;
    req.flash('checkGmail', `${message}`)
  res.redirect('/user');
})



router.get('/logout',(req, res) => {
    req.logout();
  req.session.destroy();
    res.redirect('/login')

})

module.exports = router