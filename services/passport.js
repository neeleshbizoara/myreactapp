const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const key = require('../config/keys');
//const userModel = require('../models/User');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id)
    .then( user => {
        done(null, user)
    });
});

passport.use(new GoogleStrategy({
    clientID: key.googleClientID,
    clientSecret: key.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, /*(accessToken, refreshToken, profile, done) => {
   // console.log(profile)
   User.findOne( {googleId: profile.id} ).then( existingUser => {
       if(existingUser){
           //User id is already exist
           done(null, existingUser);
       } else {
           new User({ googleId: profile.id })
           .save()
           .then( user => done(null, user));
       }
   })
}*/
async (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    const existingUser = await User.findOne( {googleId: profile.id} )
    
    if(existingUser){
        //User id is already exist
        return done(null, existingUser);
    } 
    const user = await new User({ googleId: profile.id }).save()
    done(null, user);
 }
));