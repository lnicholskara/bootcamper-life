var authController = require("../controllers/authcontroller");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/posts",

      failureRedirect: "/signup"
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/posts",

      failureRedirect: "/signin"
    })
  );

  app.get("/posts", isLoggedIn, authController.posts);
  app.get("/logout", authController.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};
