const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { MONGODB_URI, SECRET } = require("./config");
const { isAdmin } = require("./utils/adminChecker");
require("./strategies/discord.strategy");

const app = express();
try {
  //Settings
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(path.join(__dirname + "/public"))); //Static Files

  //Middlewares
  app.use(
    session({
      secret: SECRET,
      name: "meowcup-connection",
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({ mongoUrl: MONGODB_URI }),
      cookie: { maxAge: 60000 * 60 * 24 }, // 1 Day (24 Hours)}
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //Global Variables
  app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.admin = (param) => {
      return isAdmin(param);
    };
    next();
  });

  //Routes
  app.use("/", require("./routes/index.routes"));
  app.use("/auth", require("./routes/auth.routes"));
  app.use("/dashboard", require("./routes/dashboard.routes"));
} catch (e) {
  console.log(log.error + e);
}

module.exports = app;
