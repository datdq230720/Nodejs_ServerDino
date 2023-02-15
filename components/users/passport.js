const GoogleStratery = require('passport-google-oauth20').Strategy
const { profile } = require('console');
const mongoose = require('mongoose');
const User = require('../users/model')
const userService = require('../users/service');
const GOOGLE_CLIENT_ID = '31313675267-jucsrjm4fb1a5jdpll7gdfn2u3a2ke7d.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

module.exports = function(passport){

    passport.use(new GoogleStratery({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async(accessToken, email,profile,done) => {
        const newUser = {
            googleId: profile.id,
            email:profile.emails[0].value,
            image:profile.photos[0].value,
        }
        console.log("user: "+profile)
        var update = global.update;
        try {
            let user = await User.findById(update)
            let usersv = await userService.getUsersGGID(newUser.googleId); 
            if (!user || usersv) {
                var message = "Tài khoản này đã được sử dụng"
                global.message = message;
                done(null,user)
            }else{
                user = await User.findByIdAndUpdate(update,newUser)
                var message = "Liên kết tài khoản thành công"
                global.message = message;
                done(null,user)
            }
        } catch (error) {
            console.error(error)
        }
    }
    )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => done(err, user))
    })

}