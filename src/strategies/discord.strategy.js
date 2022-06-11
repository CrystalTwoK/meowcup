const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = require("../config");
const User = require("../models/user");
const passport = require("passport");
const { Strategy } = require("passport-discord");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: "http://www.meowcup.it/auth/redirect",
      scope: ["identify", "email", "guilds"],
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        //Controlla se e' gia' presente l'utente all'interno del database
        const user = await User.findOne({ discordId: profile.id });
        console.log(profile);

        if (user) return done(null, user); //Return User se e' gia' presente, altrimenti creane uno nuovo > newUser

        const newUser = new User({
          discordId: profile.id,
          username: profile.username + profile.discriminator,
          email: profile.email,
          guilds: profile.guilds,
        });

        await newUser.save();
        console.log("Utente salvato all'interno del database");

        done(null, newUser);
      } catch (e) {
        console.log(e);
        return done(e, null);
      }
    }
  )
);
