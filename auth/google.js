
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../Classes/Model/user');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: "210454834521-286u1e3lqm43k609l09hg7sqmpnid28a.apps.googleusercontent.com",
        clientSecret: "KiTtxH3ovJo0Jq9QvcCNN1U9",
        callbackURL: 'https://college-project-madadi.herokuapp.com/google/callback'
    },
    
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken)
      console.log(refreshToken)
      const newUser = {
        name: profile.displayName,
        image: profile.photos[0].value,
        accessToken: accessToken,
        googleId: profile.id
      }

      try {
        let user = await User.findOne({ googleId: profile.id })

        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.error(err)
      }
        done(null,profile)
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}



