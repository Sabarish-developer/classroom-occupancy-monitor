import passport from "passport";
import {config} from '../config/config.js';
import userModel from '../models/user.js';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

passport.use(new GoogleStrategy(
    {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackUrl
    },
    async(accessToken, refreshToken, profile, done) => {
        try{

            const email = profile.emails[0].value;
            if(!email.endsWith("@rajalakshmi.edu.in")){
                return done(new Error('Unauthorized email domain - only (@rajalakshmi.edu.in)'), null);
            }

            const username = email.split('@')[0];
            const role = /^[0-9]+$/.test(username) ? 'student' : 'faculty';

            let user = await userModel.findOne({googleId: profile.id}); // If user already exists

            if(!user){  // New user to store in db
                user = await userModel.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email,
                    role
                });
            }
            console.log(user);
            return done(null, user);
        }
        catch(e){
            console.error("Error in passport-google-oauth", e);
            return done(e, null);
        }
    }
));
