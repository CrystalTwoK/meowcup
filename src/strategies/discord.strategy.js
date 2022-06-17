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
      callbackURL: "/auth/redirect",
      scope: ["identify", "email", "guilds"],
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        const query = { discordId: profile.id };
        const user = await User.findOne(query);
        // console.log(profile);
        //Controlla se e' gia' presente l'utente all'interno del database ed in caso aggiunge un utente nuovo al database
        if (user) {
          const updatedSchema = {
            discordId: profile.id,
            username: profile.username,
            discriminator: `#${profile.discriminator}`,
            avatar: profile.avatar,
            email: profile.email,
            guilds: profile.guilds,
          };

          const updatedUser = await User.findOneAndUpdate(
            query,
            updatedSchema,
            { new: true }
          );
          await updatedUser.save();
          console.log(log.db + "User updated");

          return done(null, updatedUser);
        }
        const newUser = new User({
          discordId: profile.id,
          username: profile.username,
          discriminator: `#${profile.discriminator}`,
          avatar: profile.avatar,
          email: profile.email,
          guilds: profile.guilds,
        });

        await newUser.save();
        console.log(log.db + "New user saved");

        done(null, newUser);
      } catch (e) {
        console.log(e);
        return done(e, null);
      }
    }
  )
);
