const { Router } = require("express");
const router = Router();
const { isNotAuthorized } = require("../utils/auth");
const passport = require("passport");

router.get("/", isNotAuthorized, passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  if (req.user) req.logout(() => res.redirect("/"));
});

module.exports = router;
