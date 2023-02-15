const GoogleStratery = require('passport-google-oauth20').Strategy
const { profile } = require('console');
const mongoose = require('mongoose');
const Admin = require('../admin/model')
const adminService = require('../admin/service');
const GOOGLE_CLIENT_ID = '866116120788-8bv42ecls7urfm8fbk9lt75t5diet3rn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

module.exports = function(passport){

    passport.use(new GoogleStratery({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/admin/google/callback"
    },
    async(accessToken, email,profile,done) => {
        const newAdmin = {
            googleId: profile.id,
            email:profile.emails[0].value,
            image:profile.photos[0].value,
        }
        console.log("admin: "+profile)
        var admin_id = global.admin_id;
        try {
            let admin = await Admin.findById(admin_id)
            let adminsv = await adminService.getAdminGGID(newAdmin.googleId); 
            if (!admin || adminsv) {
                done(null,admin)
            }else{
                admin = await Admin.findByIdAndUpdate(admin_id,newAdmin)
                done(null,admin)
            }
        } catch (error) {
            console.error(error)
        }
    }
    )
    )

    passport.serializeAdmin((admin, done) => {
        done(null, admin.id);
    });

    passport.deserializeAdmin((id, done) => {
        Admin.findById(id,(err, admin) => done(err, admin))
    })

}